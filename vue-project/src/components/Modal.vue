<template>
    <div class="modal overflow-y-scroll transition duration-700" v-if="showModal">
      <div class="modal-overlay " @click="closeModal"></div>
      <div ref="modalContainer" class="modal-content overflow-y-scroll " @click.stop>
        <slot ></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    data() {
      return {
        showModal: false,
      };
    },
     props: {
      modalId: Number || String,
    },
    

    methods: {
    openModal() {
      this.showModal = true;
      document.addEventListener("click", this.closeOnOutsideClick);
    },
  closeModal() {
    
    this.showModal = false;
    document.removeEventListener("click", this.closeOnOutsideClick);
  },
  closeOnOutsideClick(event) {
    if (this.showModal) {
      const modalElement = this.$refs.modalContainer;
      if (modalElement && modalElement.contains(event.target)) {
        this.closeModal();
      }
    }
  },
},
  };
  </script>
  
  <style scoped>
 
  .modal {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
    height: 100%;
    z-index: 900;
  }
  
 
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
  }
  
 
  .modal-content {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    max-height: 90%;
  }

  </style>
  