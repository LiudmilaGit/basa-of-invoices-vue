<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice flex flex-column">
    <form @submit.prevent="submitForm" class="invoice__content">
      <Loading v-show="loading" />
      <h1 v-if="!editInvoice" class="invoice__title">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>

      <!--Bill From-->
      <div class="invoice__bill-from flex flex-column">
        <h4 class="invoice__subtitle">Bill From</h4>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="billerStreetAddress"
            >Street Address</label
          >
          <input
            class="invoice__input-style"
            type="text"
            id="billerStreetAddress"
            required
            v-model="billerStreetAddress"
          />
        </div>
        <div class="invoice__location flex">
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="billerCity">City</label>
            <input
              class="invoice__input-style"
              type="text"
              id="billerCity"
              required
              v-model="billerCity"
            />
          </div>
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="billerZipCode">Zip Code</label>
            <input
              class="invoice__input-style"
              type="text"
              id="billerZipCode"
              required
              v-model="billerZipCode"
            />
          </div>
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="billerCountry">Country</label>
            <input
              class="invoice__input-style"
              type="text"
              id="billerCountry"
              required
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!--Bill To-->
      <div class="invoice__bill-to flex flex-column">
        <h4 class="invoice__subtitle">Bill To</h4>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="clientName">Client's Name</label>
          <input
            class="invoice__input-style"
            type="text"
            id="clientName"
            required
            v-model="clientName"
          />
        </div>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="clientEmail">Client's Email</label>
          <input
            class="invoice__input-style"
            type="text"
            id="clientEmail"
            required
            v-model="clientEmail"
          />
        </div>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="clientStreetAddress"
            >Street Adress</label
          >
          <input
            class="invoice__input-style"
            type="text"
            id="clientStreetAddress"
            required
            v-model="clientStreetAddress"
          />
        </div>
        <div class="invoice__location flex">
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="clientCity">City</label>
            <input
              class="invoice__input-style"
              required
              type="text"
              id="clientCity"
              v-model="clientCity"
            />
          </div>
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="clientZipCode">Zip Code</label>
            <input
              class="invoice__input-style"
              required
              type="text"
              id="clientZipCode"
              v-model="clientZipCode"
            />
          </div>
          <div class="invoice__location-inner invoice__input flex flex-column">
            <label class="invoice__label" for="clientCountry">Country</label>
            <input
              class="invoice__input-style"
              required
              type="text"
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>
      </div>

      <!--Invoice Work Details-->
      <div class="invoice__work flex flex-column">
        <div class="invoice__payment flex">
          <div class="invoice__payment-inner invoice__input flex flex-column">
            <label class="invoice__label" for="invoiceDate">invoice Date</label>
            <input
              class="invoice__input-style"
              required
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="invoice__payment-inner invoice__input flex flex-column">
            <label class="invoice__label" for="paymentDueDate"
              >Payment Date</label
            >
            <input
              class="invoice__input-style"
              required
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="paymentTerms">Payment Terms</label>
          <select
            class="invoice__input-style"
            id="paymentTerms"
            v-model="paymentTerms"
            required
          >
            <option class="invoice__select" value="30">Net 30 Days</option>
            <option class="invoice__select" value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="invoice__input flex flex-column">
          <label class="invoice__label" for="productDescription"
            >Product Description</label
          >
          <input
            class="invoice__input-style"
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>
        <div class="invoice__work">
          <h3 class="invoice__work-title">Item List</h3>
          <table class="invoice__work-list">
            <tr class="invoice__work-table flex">
              <th class="invoice__work-subtitle table-th">Item Name</th>
              <th class="invoice__work-qty table-th">Qty</th>
              <th class="invoice__work-price table-th">Price</th>
              <th class="invoice__work-total table-th">Total</th>
            </tr>
            <tr
              class="invoice__table-items flex"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="invoice__work-subtitle">
                <input
                  class="invoice__input-style"
                  type="text"
                  v-model="item.itemName"
                />
              </td>
              <td class="invoice__work-qty">
                <input
                  class="invoice__input-style"
                  type="text"
                  v-model="item.qty"
                />
              </td>
              <td class="invoice__work-price">
                <input
                  class="invoice__input-style"
                  type="text"
                  v-model="item.price"
                />
              </td>
              <td class="invoice__work-total flex">
                ${{ (item.total = item.qty * item.price) }}
              </td>
              <img
                @click="deleteInvoiceItem(item.id)"
                src="@/assets/icons/icon-delete.svg"
                alt="icon delete"
                class="invoice__work-img"
              />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="invoice__button flex">
            <img
              class="invoice__button-img"
              src="@/assets/icons/icon-plus.svg"
              alt="icon plus"
            />
            Add New Item
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="invoice__save flex">
        <div class="invoice__save-inner left">
          <button @click="closeInvoice" class="button red" type="button">
            Cancel
          </button>
        </div>
        <div class="invoice__save-right flex">
          <button
            v-if="!editInvoice"
            @click="saveDraft"
            class="button dark-purple"
            type="submit"
          >
            Save Draft
          </button>
          <button
            v-if="!editInvoice"
            @click="publishInvoice"
            class="button purple"
            type="submit"
          >
            Create Invoice
          </button>
          <button v-if="editInvoice" class="button purple" type="submit">
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit';
import { mapActions, mapMutations, mapState } from 'vuex';
import { uid } from 'uid';
import Loading from '@/components/Loading.vue';
export default {
  components: { Loading },
  name: 'invoiceModal',
  data() {
    return {
      dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },

  created() {
    // get current date for invoice date field
    if (!this.editInvoice) {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
        'en-us',
        this.dateOptions
      );
    }
    if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;
    }
  },
  methods: {
    ...mapMutations(['toggleInvoice', 'toggleModal', 'toggleEditInvoice']),

    ...mapActions(['updateInvoice', 'getInvoices']),

    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.toggleModal();
      }
    },

    closeInvoice() {
      this.toggleInvoice();
      if (this.editInvoice) {
        this.toggleEditInvoice();
      }
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: '',
        qty: '',
        price: 0,
        total: 0,
      });
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveDraft() {
      this.invoiceDraft = true;
    },

    calInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },

    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!');
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = db.collection('invoices').doc();

      await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDateUnix: this.invoiceDateUnix,
        invoiceDate: this.invoiceDate,
        paymentTerms: this.paymentTerms,
        paymentDueDateUnix: this.paymentDueDateUnix,
        paymentDueDate: this.paymentDueDate,
        productDescription: this.productDescription,
        invoiceTotal: this.invoiceTotal,
        invoiceItemList: this.invoiceItemList,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });

      this.loading = false;

      this.toggleInvoice();

      this.getInvoices();
    },

    async updateInvoices() {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!');
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = db.collection('invoices').doc(this.docId);

      await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      };

      this.updateInvoice(data);
    },

    submitForm() {
      if (this.editInvoice) {
        this.updateInvoices();
        return;
      }
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(['editInvoice', 'currentInvoiceArray']),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString('en-us', this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &__content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &__title {
    margin-bottom: 48px;
    color: #fff;
  }
  &__bill-from,
  &__bill-to {
    margin-bottom: 48px;
  }

  &__subtitle {
    color: #7c5dfa;
    font-size: 12px;
    margin-bottom: 24px;
  }
  &__input {
    margin-bottom: 24px;
  }
  &__label {
    font-size: 14px;
    margin-bottom: 6px;
  }
  &__input-style {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
  &__location {
    gap: 16px;
  }
  &__location-inner {
    flex: 1;
  }
  &__payment {
    gap: 24px;
  }
  &__payment-inner {
    flex: 1;
  }

  &__work-item {
    margin-bottom: 16px;
    font-size: 18px;
    color: #777f98;
  }

  &__work-list {
    width: 100%;
  }
  &__work-table {
    margin-bottom: 16px;
  }
  &__work-list,
  &__work-table {
    gap: 16px;
    font-size: 14px;
  }
  &__work-list {
    margin-top: 15px;
  }
  &__work-title {
    color: #7c5dfa;
  }
  &__work-subtitle {
    flex-basis: 50%;
  }
  &__work-qty {
    flex-basis: 10%;
  }
  &__work-price {
    flex-basis: 20%;
  }
  &__work-total {
    flex-basis: 20%;
    align-self: center;
  }
  &__table-items {
    position: relative;
    margin-bottom: 24px;
    gap: 16px;
    font-size: 12px;
  }
  &__work-img {
    position: absolute;
    top: 15px;
    right: 0;
    width: 12px;
    height: 16px;
    cursor: pointer;
  }
  &__button {
    color: #fff;
    background-color: #252945;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 50px;
    border-radius: 30px;
    cursor: pointer;
  }
  &__button-img {
    margin-right: 4px;
  }
  &__save {
    margin-top: 60px;
  }
  &__save-inner {
    flex: 1;
  }
  &__save-right {
    justify-content: flex-end;
  }
  &__select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
.table-th {
  text-align: left;
}
</style>
