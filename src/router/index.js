import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Join from '../views/Join.vue'
import JoiningRoom from '../views/JoiningRoom.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/room',
    name: 'Room',
    component: Room,
    props: true
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
    props: true
  },
  {
    path: '/joiningroom',
    name: 'JoiningRoom',
    component: JoiningRoom,
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0
    }
  }
})

router.beforeEach(() => {
  
})

export default router
