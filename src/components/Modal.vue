<template>
  <div class="modal flex">
    <div class="modal__content">
      <p class="modal__text">
        Are you sure you want to exit? Your changes will not be saved?
      </p>
      <div class="modal__actions flex">
        <button 
        @click="closeModal"
        class="button modal__button purple">Return</button>
        <button
        @click="closeInvoice"
        class="button modal__button red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'modal',
  methods: {
    ...mapMutations(['toggleModal', 'toggleInvoice', 'toggleEditInvoice']),

    closeModal() {
      this.toggleModal();
    },

    closeInvoice() {
      this.toggleModal();
      this.toggleInvoice();
      if (this.editInvoice) {
      this.toggleEditInvoice();
      }
    },
  },
  computed: {
    ...mapState(['editInvoice']),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  &__content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
  }

  &__text {
    text-align: center;
  }

  &__actions {
    margin-top: 24px;
  }

  &__button {
    flex: 1;
  }
}
</style>
