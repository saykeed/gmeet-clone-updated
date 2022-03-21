<template>
  <div class="home">
    <Sidemenu v-if="sidebar" @closeSidebar="controlSidebar"/>
    <div>
      <Nav class="navbar" @toggleSidebar="controlSidebar"/>
      <div class="meetBtn">
        <router-link class="new" to="/room">New meeting</router-link>
        <router-link class="join" to="/join">Join with a code</router-link>
        
      </div>
    </div>
    
    <div class="intros" ref="welcomeSlide">
         <div  v-show="currentIndex == index" v-for="(intro, index) in intros" :key="intro.header" class="welcomeNotes">
            <img :src="intro.img" alt="">
            <h3>{{ intro.header }}</h3>
            <p>{{ intro.para }}</p>
         </div>
        
    </div>
    <div class="slideIndicator">
      <div :class="{active: currentIndex == index}" v-for="(intro, index) in intros" :key="intro.index"></div>
    </div>
    <Createmeet v-if="createMeet" @closeCreate="toggleCreatemeet"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import Nav from '../components/Nav.vue'
import Sidemenu from '../components/Sidemenu.vue'
import Createmeet from '../components/Createmeet.vue'
import { getFirestore, collection, onSnapshot,
        addDoc, getDoc, where, query,
        updateDoc
} from 'firebase/firestore'
import { useRouter } from 'vue-router'
export default {
  components: { Nav, Sidemenu, Createmeet},
  setup() {
    const router = useRouter()
    const createMeet = ref(false)
    const sidebar = ref(false)
    const currentIndex = ref(0)
    const intros = ref([
      {header: 'Get a link you can share', img: 'https://www.gstatic.com/meet/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg', para: 'Tap New meeting to get a link you can send to people you want to meet with'},
      {header: 'Your meeting is safe', img: 'https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg', para: 'No one can join a meeting unless invited or admitted by the host'},
      {header: 'See everyone together', img: 'https://www.gstatic.com/meet/user_edu_brady_bunch_light_81fa864771e5c1dd6c75abe020c61345.svg', para: 'To see more people at the same time, Go to change layout in the more options Menu'}
    ])
   
   // global variables for the creating the meet room
      let peerConnection;
      let roomID;
      
     

    const controlSidebar = () => {
      sidebar.value = !sidebar.value
    }

    const toggleCreatemeet = () => {
      createMeet.value = !createMeet.value
    }

  
   







    return {sidebar, createMeet, toggleCreatemeet, controlSidebar, intros, currentIndex }
  }
}
</script>

<style>
  .home{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div.meetBtn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px auto;
    padding: 0 10px;
  }

  div.meetBtn a.new, div.meetBtn a.join{
    width: 48%;
    text-align: center;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;
  }

  .new{
    background: rgb(0, 145, 255);
    color: white;
  }
  div.new:active{
    background: rgb(0, 118, 208);
  }

  .meetBtn a.join{
    border: 1px solid rgba(0, 0, 0, 0.261);
    color: rgb(0, 145, 255);
    text-decoration: none;
  }
  .meetBtn .join:active{
    background: rgba(0, 0, 0, 0.159);;
  }
  
  .intros{
    text-align: center;
    position: relative;
  }

  .intros div{
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }

  .intros img{
    width: 250px;
    height: 250px;
    border-radius: 250px;
    object-fit: cover;
    object-position: center;
    margin: 20px auto;
  }
  
  .slideIndicator{
    width: fit-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .slideIndicator div{
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color:rgba(0, 145, 255, 0.316);
    margin: 10px 5px;
  }
  .slideIndicator .active{
    background-color: rgb(0, 145, 255);
  }

  
</style>


/*


  <div class="new" @click="createRoom">New meeting</div>



// create room function
    const createRoom = async () => {
        peerConnection = new RTCPeerConnection(configuration);
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        // create an offer and add to a doc in firebase store
        // thus creating a room for this specific meet
        const newRoom =  await addDoc(roomRef, {
            offer: {
                type: offer.type,
                sdp: offer.sdp 
            }
        })
        roomID = newRoom.id
        router.push({
          name: 'Room',
          params: {
            roomID: roomID,
            peerConnection: peerConnection
          }
        })
    }

 */