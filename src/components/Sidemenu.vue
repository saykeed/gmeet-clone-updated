<template>
  <div class="menu" ref="sideMenu">
      <img src="../assets/meetlogo.png" alt="">
      <ul class="sidenav">
          <li v-for="link in links" :key="link.text">
             <router-link to="/"> <i class="material-icons">{{ link.icon }}</i> {{ link.text }}</router-link>
          </li>
      </ul>
      
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props, { emit }) {
        const touchStart = ref(null)
        const touchEnd = ref(null)
        const links = ref([
            {text: 'Settings', route: '/', icon: 'settings'},
            {text: 'Send feedback', route: '/gallery', icon: 'info'},
            {text: 'Help', route: '/contact', icon: 'help'}
        ])

        const touchstart = (event) => {
            touchStart.value = event.touches[0].clientX;
            touchEnd.value = 0;
        }
        const touchmove = (event) => {
            touchEnd.value = event.touches[0].clientX;
        }
        const touchend = () => {
            if(touchStart.value > touchEnd.value) {
                emit('closeSidebar')
            }
        }



      return { links, touchstart, touchend, touchmove }
    },
    mounted() { 
        let sideBar = this.$refs.sideMenu;
        sideBar.addEventListener('touchstart', (event) => {this.touchstart(event)})
        sideBar.addEventListener('touchmove', (event) => {this.touchmove(event)})
        sideBar.addEventListener('touchend', () => {this.touchend()})
  }
}
</script>

<style>
.menu{
    background: white;
    height: 100vh;
    width: 250px;
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
}
.menu img{
    width: 60%;
    margin: 10px 20px;
    object-fit: cover;
    object-position: center;
}
.menu ul{
    border-top: 1px solid rgba(0, 0, 0, 0.296);
    margin: 0px auto; 
}
.menu li a{
    display: block;
    list-style-type: none;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.686);
    font-size: 15px;
    padding: 10px;
    margin: 5px auto;
}

.menu ul li a i{
    vertical-align: middle;
    margin: 0 10px;
}



</style>