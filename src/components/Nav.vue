<template>
  <div class="nav">
      <div class="signin"></div>
      <h3>Meet</h3>
      <i class="material-icons" @click="callsidebar">menu</i>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, { emit }) {
    const callsidebar = () => {
     emit('toggleSidebar')
    }

    return { callsidebar }
  }
}
</script>

<style>
.nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
}

.signin{
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-image: url(../assets/avatar.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}



/*for the responsieve screen of lg and above*/
@media screen and (min-width:960px){
  
    
}

</style>




/*


<i class="material-icons" @click="callsidebar">{{ toggler }}</i>


/*for the responsieve screen of lg and above*/
@media screen and (min-width:960px){
  
    
}


  */