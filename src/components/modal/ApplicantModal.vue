<template>
    <div>
      <div class="modal-backdrop" v-if="showModal" @click="closeModal"></div>
      <div class="modal-container">
        <div class="modal-content">
          <!-- Modal content goes here -->
          <h2>ddddddddddd</h2>
          <p>ggggggggggg</p>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'

let showModal = ref(false);

const closeModal = () => {
    showModal = true;
}

</script>
  
<style scoped>
.modal-backdrop {
    /* Styles for the modal backdrop overlay */
    /* Example styles: */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
    /* Styles for the modal container */
    /* Example styles: */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    z-index: 5000;
}
  
.modal-content {
    /* Styles for the modal content */
    /* Example styles: */
    text-align: center;
}
</style>
  