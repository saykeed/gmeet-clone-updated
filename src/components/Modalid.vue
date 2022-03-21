<template>
  <div class="modalId">
      <div class="modal">
          <i class="material-icons" @click="closeModalId">close</i>
          <p>Meeting Room created:</p>
          <p class="id">{{ roomID }}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: [ 'roomID'],
    setup(props, { emit }) {
        const closeModalId = () => {
            emit('modalClose')
        }

        return { closeModalId }
    }
}
</script>

<style>
    .modalId{
        background: rgba(0, 0, 0, 0.727); 
        color: black;
        width: 100vw;
        height: 100vh;
        z-index: 999999;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .modalId .modal{
        background: white;
        width: 85%;
        padding: 20px;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .modalId .modal i{
        margin: 5px auto;
        padding: 10px;
        cursor: pointer;
    }
    .modalId .modal i:active{
        background: rgba(0, 0, 0, 0.268);
        border-radius: 50%;
    }
    .modalId .modal p{
        margin: 15px auto;
    }
    p.id{
        color: red; 
    }
    
</style>