<template>
  <div class="joinPage">
      <div class="joinPageHead">
          <router-link to="/">
            <i class="material-icons">arrow_back</i>
          </router-link>
          <h3>Join with a code</h3>
      </div>
      <p>Enter the code provided by the meeting organizer.</p>
      <input type="text"  id="meetcode" v-model="meetcode" placeholder="Meeting Code">
      <div @click="joinMeet" class="enterBtn">Enter</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import { getFirestore, collection, onSnapshot,
        addDoc, doc, getDoc, updateDoc,
        query, where
} from 'firebase/firestore'
export default {
    setup() {
        // global variables to be used later
        const router = useRouter()
        const meetcode = ref(null)
        
        const joinMeet = () => {
            if(meetcode.value) {
                router.push({
                    name: 'JoiningRoom',
                    params: {
                        roomID: meetcode.value,
                    }
                })
            } else {
                alert('input a room ID')
            }
            
        }
        

        return { joinMeet, meetcode }
    }
}
</script>

<style>
.joinPage{
    width: 100vw;
    height: 100vh;
    background: white;
    color: black;
    padding: 10px 15px;
}
.joinPageHead{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
}
#meetcode{
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    height: 50px;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    background: rgba(0, 145, 255, 0.138);
    color: rgba(0, 0, 0, 0.501);
    border: none;
    border-bottom: 3px solid rgb(0, 145, 255);
}
#meetcode:focus{
    outline: none;
}
div.enterBtn{
    padding: 10px 20px;
    border-radius: 5px;
    background: rgb(0, 145, 255);
    color: white;
    width: fit-content;
    margin: 0 auto;
    cursor: pointer;
}
div.enterBtn:hover{
    background: rgba(0, 145, 255, 0.679);
    
}
</style>


/*
let offer
        const meetcode = ref(null)
        // global variables
        let peerConnection = new RTCPeerConnection(configuration);
        
        const configuration = {
            iceServers: [
                {
                urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                ],
                },
            ],
            iceCandidatePoolSize: 10,
        };

        // get hold of the data in our firestore database
        const roomsDB = getFirestore();
        
       


        const joinMeet = async () => {
            if(meetcode.value) {
                const roomRef = doc(roomsDB, 'Rooms', meetcode.value);
                const getRoom = await getDoc(roomRef)
                offer = getRoom.data()
                sendAnswer(offer)
            } else {
                alert('you need to input an ID of a room you wanna join')
            }
        }

    
        const sendAnswer = async (offer) => {
            alert('jsut started send answer functon')
            console.log('send answer', offer)
            
            await peerConnection.setRemoteDescription(offer);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            // update the room with the joiner's answer
            const targetDoc = doc(roomsDB, 'Rooms', meetcode.value)
            updateDoc(targetDoc, {
                answer: {
                    type: answer.type,
                    sdp: answer.sdp
                }
            })
        }


 */