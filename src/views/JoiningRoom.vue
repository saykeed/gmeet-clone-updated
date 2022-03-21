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
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getFirestore, collection, onSnapshot,
        addDoc, getDoc, doc, where, query,
        updateDoc
} from 'firebase/firestore'

export default {
    props: ['roomID'],
    setup() {
        const localvid = ref(null)
        const options = ref(true)
        const toggleOptions = () => {
            options.value = !options.value
        }
        
        const endCall = () => {
            alert('ending call')
        }

      return { toggleOptions, options, localvid, endCall }
    },
    mounted() {
        // global variables
        let offer
        let localStream
        let remoteStream
        let roomID = this.roomID
        let joinerIceCollection
        let peerConnection = new RTCPeerConnection(configuration);
        
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

        // making reference to the id of the room the user wants to join
        const roomsDB = getFirestore();
        const roomRef = doc(roomsDB, 'Rooms', roomID); 


        const fetchRoom = async () => {
            // function to get the user media devices and stream
            const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
            this.$refs.localvid.srcObject = stream
            localStream = stream
            //add the local streams to the peer connection object
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });
            
            joinerIceCollection = collection(roomRef, 'joinerCandidates')
            // function to listen for ice generated
            const localListener = () => {
                peerConnection.onicecandidate = (e) => {
                    if(!e.candidate) {
                        console.log('generated the last ice candidate')
                        return
                    }
                    console.log('sending the joiner candidates to the room database')
                   addDoc(joinerIceCollection, e.candidate.toJSON())
                }
            }
            await localListener()

            // invoking the function that get the offer from the room id the joiner inputed
            getOffer()
        }

        const getOffer = async () => {
            const getRoom = await getDoc(roomRef)
            offer = getRoom.data()
           sendAnswer(offer)
        }
        
        const sendAnswer = async (remoteOffer) => {
            const offer = remoteOffer.offer
            await peerConnection.setRemoteDescription(offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            
            // update the room with the joiner's answer
            //const targetDoc = doc(roomsDB, 'Rooms', roomID)
            updateDoc(roomRef, {
                answer: {
                    type: answer.type,
                    sdp: answer.sdp
                }
            })
            console.log('answer sent')
        }
        

        
       fetchRoom()
    }
}
</script>

<style>

</style>