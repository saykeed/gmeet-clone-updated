<template>
  <div class="room">
      <div v-if="options" class="roomhead">
          <router-link to="/">
            <i class="material-icons">arrow_back</i>
          </router-link>
          <p>amp-ydwz-jky <i class="material-icons">keyboard_arrow_right</i></p>
          <i class="material-icons">refresh</i>
          <i class="material-icons">volume_up</i>
      </div>
      <video ref="localvid" id="localvid" muted autoplay></video>
      <video ref="remotevid" id="remotevid" @click="toggleOptions" autoplay></video>
      <div v-if="options" class="roomfoot">
          <i class="material-icons" @click="endCall">call_end</i>
          <i class="material-icons">videocam</i>
          <i class="material-icons">mic</i>
          <i class="fa fa-ellipsis-v"></i>
      </div>
      <p ref="errmsg"></p>
      <Modalid @modalClose="closeModalId" v-if="modalStatus" :roomID="roomID" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getFirestore, collection, onSnapshot,
        addDoc, getDoc, where, query, doc,
        updateDoc
} from 'firebase/firestore'
import Modalid from '../components/Modalid.vue'
export default {
    components: { Modalid },
    data() {
        return {
            roomID: ''
        }
    },
    setup() {
        const modalStatus = ref(false)
        const localvid = ref(null)
        const options = ref(true)
        const toggleOptions = () => {
            options.value = !options.value
        }
        
        const endCall = () => {
            alert('ending call')
        }

        const closeModalId = () => {
            modalStatus.value = !modalStatus.value
        }

        return { toggleOptions, closeModalId, modalStatus, options, localvid, endCall }
    },
    mounted() {
        // global variables
        let localStream
        let remoteStream
        let peerConnection
        let roomID
        let data
        let callerIceCollection
        
        const configuration = {
            iceServers: [
                {
                    urls: [
                        'stun:stun1.l.google.com:19302',
                        'stun:stun2.l.google.com:19302',
                        'stun:stun3.l.google.com:19302'
                    ],
                },
            ],
            iceCandidatePoolSize: 10,
        };
        
       
        
        // connecting to the rooms document in firebase store
        const roomsDB = getFirestore();
        const roomRef = collection(roomsDB, 'Rooms');

        // create room function
        const createRoom = async () => {
            
            const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
            this.$refs.localvid.srcObject = stream
            localStream = stream
            peerConnection = new RTCPeerConnection(configuration);
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
            // created an empty room just to generate an id
            const newRoom =  await addDoc(roomRef, {})
            roomID = newRoom.id
            const targetDoc = doc(roomsDB, 'Rooms', roomID)
            callerIceCollection = collection(targetDoc, 'callerCandidates')
            // start creating ofer to be sent to the room database
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            const localListener = () => {
                peerConnection.onicecandidate = (e) => {
                    if(!e.candidate) {
                        console.log('generated the last ice candidate')
                        return
                    }
                    console.log('sending candidates to the caller room')
                    addDoc(callerIceCollection, e.candidate.toJSON())
                }
            }
            await localListener()
            
            // create an offer and add to a doc in firebase store
            // thus creating a room for this specific meet
           await updateDoc(targetDoc, {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp 
                }
            })

            // setting the modal roomID variable for the modal appears
            this.roomID = roomID
            this.modalStatus = true
            console.log(roomID)
            

            // listen for updates in the room created by the caller
            const q = query(roomRef, where("__name__", "==", roomID))
            onSnapshot(q, async (snapshot) => {
                snapshot.forEach(item => {
                    data = item.data()
                })
                
                if (!peerConnection.currentRemoteDescription && data.answer) {
                    //console.log('Set remote description: ', data.answer);
                    const answer = new RTCSessionDescription(data.answer)
                    console.log('answer received')
                    await peerConnection.setRemoteDescription(answer);
                }
                
            })

            // listening for remote ice candidates in the database

            onSnapshot(collection(targetDoc, 'joinerCandidates'), async (snapshot) => {
                console.log('snapshot',snapshot.doc)
                console.log('snapshot.data',snapshot.doc.data())
            })

            
            
        }

        
        


        
        createRoom()
    }
}
</script>

<style>
.room{
    background: #121212;
    height: 100vh;
    width: 100vw;
    color: white;
    position: relative;
}

.room video{
    object-fit: cover;
}

.roomhead{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 90%;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
}
.roomhead a{
    color: white;
}
.roomhead i{
    vertical-align: middle;
    cursor: pointer;
}
.roomhead p{
    width: 50%;
    cursor: pointer
}

video#localvid{
    position: absolute;
    top: 50px;
    left: 30px;
    width: 30%;
    height: 150px;
    border-radius: 15px;
    z-index: 9999;
    border: 1px solid white;
}

video#remotevid{
    position: absolute;
    width: 100%;
    height: 100%;
}



.roomfoot{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 90%;
    margin: 0 auto;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.roomfoot i{
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.227);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.roomfoot i:first-child{
    background: red;
}
</style>


/*



const configuration = {
            iceServers: [
            {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
            },
            {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject"
            },
            {
            urls: "turn:openrelay.metered.ca:443",
            username: "openrelayproject",
            credential: "openrelayproject"
            },
            {
            urls: "turn:openrelay.metered.ca:443?transport=tcp",
            username: "openrelayproject",
            credential: "openrelayproject"
            }
        ],
        iceCandidatePoolSize: 10,
       }
 */

 /*  




 */