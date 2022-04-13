<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="invoice-view__link flex" :to="{ name: 'Home' }">
      <img
        class="invoice-view__img"
        src="@/assets/icons/icon-arrow-left.svg"
        alt="icon arrow left"
      />
      Go Back
    </router-link>
    <!-- Header -->
    <div class="invoice-view__header flex">
      <div class="invoice-view__left flex">
        <span class="invoice-view__text">Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="invoice-view__right flex">
        <button
          @click="toggleInvoiceEdit"
          class="invoice-view__button button dark-purple"
        >
          Edit
        </button>
        <button
          @click="removeInvoice(currentInvoice.docId)"
          class="invoice-view__button button red"
        >
          Delete
        </button>
        <button
          @click="updateStatusPaid(currentInvoice.docId)"
          v-if="currentInvoice.invoicePending"
          class="invoice-view__button button green"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusPending(currentInvoice.docId)"
          class="invoice-view__button button orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>
    <!-- Invoice Details -->

    <div class="invoice-details flex flex-column">
      <div class="invoice-details__top flex">
        <div class="invoice-details__left flex flex-column">
          <p class="invoice-details__id">
            <span class="invoice-details__sign">#</span>
            {{ currentInvoice.invoiceId }}
          </p>
          <p class="invoice-details__description">
            {{ currentInvoice.productDescription }}
          </p>
        </div>
        <div class="invoice-details__right flex flex-column">
          <p class="invoice-details__text">
            {{ currentInvoice.billerStreetAddress }}
          </p>
          <p class="invoice-details__text">
            {{ currentInvoice.billerCity }}
          </p>
          <p class="invoice-details__text">
            {{ currentInvoice.billerZipCode }}
          </p>
          <p class="invoice-details__text">
            {{ currentInvoice.billerCountry }}
          </p>
        </div>
      </div>
      <div class="invoice-details__middle flex">
        <div class="invoice-details__payment flex flex-column">
          <h4 class="invoice-details__title">Invoice Date</h4>
          <p class="invoice-details__text invoice-details__text--style">
            {{ currentInvoice.invoiceDate }}
          </p>
          <h4 class="invoice-details__title">Payment Date</h4>
          <p class="invoice-details__text">
            {{ currentInvoice.paymentDueDate }}
          </p>
        </div>
        <div class="invoice-details__bill flex flex-column">
          <h4 class="invoice-details__title">Bill To</h4>
          <p class="invoice-details__text">
            {{ currentInvoice.clientName }}
          </p>
          <p class="invoice-details__bill-text style">
            {{ currentInvoice.clientStreetAddress }}
          </p>
          <p class="invoice-details__bill-text">
            {{ currentInvoice.clientCity }}
          </p>
          <p class="invoice-details__bill-text">
            {{ currentInvoice.clientZipCode }}
          </p>
          <p class="invoice-details__bill-text">
            {{ currentInvoice.clientCountry }}
          </p>
        </div>
        <div class="invoice-details__send flex flex-column">
          <h4 class="invoice-details__title">Sent To</h4>
          <p class="invoice-details__text">
            {{ currentInvoice.clientEmail }}
          </p>
        </div>
      </div>
      <div class="invoice-details__bottom flex flex-column">
        <div class="invoice-details__billing">
          <div class="invoice-details__heading flex">
            <p
              class="invoice-details__heading-text invoice-details__text--heading"
            >
              Item Name
            </p>
            <p class="invoice-details__heading-text">QTY</p>
            <p class="invoice-details__heading-text">Price</p>
            <p class="invoice-details__heading-text">Total</p>
          </div>
          <div
            class="invoice-details__items flex"
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
          >
            <p class="invoice-details__items-title">{{ item.itemName }}</p>
            <p class="invoice-details__items-text">{{ item.qty }}</p>
            <p class="invoice-details__items-text">{{ item.price }}</p>
            <p class="invoice-details__items-text">${{ item.total }}</p>
          </div>
        </div>
        <div class="invoice-details__total flex">
          <p class="invoice-details__total-title">Amount Due</p>
          <p class="invoice-details__total-counter">
            ${{ currentInvoice.invoiceTotal }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: 'invoiceView',
  data() {
    return {
      currentInvoice: null,
    };
  },

  created() {
    this.getCurrentInvoice();
  },

  methods: {
    ...mapMutations([
      'setCurrentInvoice',
      'toggleEditInvoice',
      'toggleInvoice',
    ]),

    ...mapActions([
      'deleteInvoice',
      'updateStatusToPending',
      'updateStatusToPaid',
      'updateStatusToDraft',
    ]),

    getCurrentInvoice() {
      this.setCurrentInvoice(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleInvoiceEdit() {
      this.toggleEditInvoice();
      this.toggleInvoice();
    },
    async removeInvoice(docId) {
      await this.deleteInvoice(docId);
      this.$router.push({ name: 'Home' });
    },
    updateStatusPaid(docId) {
      this.updateStatusToPaid(docId);
    },
    updateStatusPending(docId) {
      this.updateStatusToPending(docId);
    },
    updateStatusDraft(docId) {
      this.updateStatusToDraft(docId);
    },
  },
  computed: {
    ...mapState(['currentInvoiceArray', 'editInvoice']),
  },

  // Change invoice async!
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  &__link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 14px;
  }
  &__img {
    margin-right: 16px;
    width: 7px;
    height: 10px;
  }

  &__header {
    background-color: #1e2139;
    border-radius: 20px;
    align-items: center;
    padding: 24px 32px;
    font-size: 12px;
  }

  &__left {
    align-items: center;
    font-size: 14px;
  }

  &__right {
    flex: 1;
    justify-content: flex-end;
  }
  &__text {
    color: #dfe3fa;
    margin-right: 16px;
  }

  &__button {
    color: #fff;
    font-size: 14px;
  }
}

.invoice-details {
  background-color: #1e2139;
  border-radius: 20px;
  padding: 48px;
  margin-top: 24px;
  &__top {
    color: #fff;
  }

  &__left {
    flex: 1;
  }

  &__id {
    font-size: 24px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 164x;
  }
  &__sign {
    color: #888eb0;
  }

  &__right {
    flex: 1;
    font-size: 14px;
    align-items: flex-end;
  }

  &__text {
    font-size: 16px;
  }
  &__text--style {
    margin-bottom: 32px;
  }

  &__middle {
    margin-top: 50px;
    color: #dfe3fa;
    gap: 16px;
  }

  &__payment {
    flex: 1;
  }

  &__title {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 12px;
  }

  &__bill {
    flex: 1;
  }
  &__bill-text {
    font-size: 12px;
  }

  &__send {
    flex: 2;
  }

  &__bottom {
    margin-top: 50px;
  }

  &__billing {
    padding: 32px;
    border-radius: 20px 20px 0 0;
    background-color: #252945;
  }

  &__heading {
    color: #dfe3fa;
    font-size: 12px;
    margin-bottom: 32px;
  }
  &__text--heading {
    flex: 3;
    text-align: left;
  }
  &__heading-text {
    flex: 1;
    text-align: right;
  }

  &__items {
    margin-bottom: 32px;
    font-size: 13px;
    color: #fff;
  }
  &__items-title {
    flex: 3;
    text-align: left;
  }
  &__items-text {
    flex: 1;
    text-align: right;
  }

  &__total {
    color: #fff;
    padding: 32px;
    background-color: rgba(12, 14, 22, 0.7);
    align-items: center;
    border-radius: 0 0 20px 20px;
  }
  &__total-title {
    flex: 1;
    font-size: 12px;
  }
  &__total-counter {
    font-size: 28px;
    text-align: right;
  }
}
.style {
  margin-top: auto;
}
</style>
