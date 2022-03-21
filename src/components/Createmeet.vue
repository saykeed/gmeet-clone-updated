<template>
  <div class="createmeet">
      <ul class="sidenav">
          <li v-for="link in links" :key="link.text" @click="prepMeet(link.label)">
             <router-link :to="link.route"> <i class="material-icons">{{ link.icon }}</i> {{ link.text }}</router-link>
          </li>
          <li class="close" @click="closeMe"><i class="material-icons">close</i>Close</li>
      </ul>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props, { emit }) {
        const links = ref([
            {text: 'Get a meeting link to share', label: 'createLink', route: '/', icon: 'insert_link'},
            {text: 'Start an instant meeting', label: 'instantMeet', route: '/room', icon: 'videocam'},
            {text: 'Schedule in Google Calendar', label: 'schedule', route: '/', icon: 'perm_contact_calendar'}
        ])

        const closeMe = () => {
            emit('closeCreate')
        }
        const prepMeet = (label) => {
            if( label == 'createLink'){

            } else if( label == 'instantMeet'){
                            
            } else if( label == 'schedule'){

            }
        }
        

        return { links, closeMe, prepMeet }
    }
}
</script>

<style>
    .createmeet{
        background: rgba(0, 0, 0, 0.775);
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99; 
    }
    .createmeet ul{
        background: white;
        margin: 0px auto; 
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
    }
    .createmeet li a, li.close{
        display: block;
        list-style-type: none;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.686);
        font-size: 15px;
        padding: 10px;
        margin: 10px auto;
        -webkit-tap-highlight-color: transparent;
    }

    .createmeet li a:active, li.close:active{
        background: rgba(0, 0, 0, 0.179);
    }

    .createmeet ul li a i, li.close i{
        vertical-align: middle;
        margin: 0 10px;
    }
</style>