import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAThZa2cEopljF6qbWkmnPwTCUhNvzhnlw",
  authDomain: "g-meet-clone-51d28.firebaseapp.com",
  projectId: "g-meet-clone-51d28",
  storageBucket: "g-meet-clone-51d28.appspot.com",
  messagingSenderId: "656770514645",
  appId: "1:656770514645:web:309723776dec06f0a66c5c"
};

// Initialize Firebase
initializeApp(firebaseConfig);




createApp(App).use(router).mount('#app')
