<template>
  <div class="home container">
    <!-- Header -->
    <div class="home__header flex">
      <div class="home__left flex flex-column">
        <h1>Invoices</h1>
        <span class="home__subtitle"
          >There are {{ invoiceData.length }} total invoices</span
        >
      </div>
      <div class="home__right flex">
        <div @click="togglerFilterMenu" class="home__filter flex">
          <span class="home__filter-title"
            >Filter by status
            <span v-if="filterInvoice" class="home__filter-title"
              >: {{ filterInvoice }}</span
            >
          </span>
          <img
            class="home__filter-img"
            src="@/assets/icons/icon-arrow-down.svg"
            alt="icon arrow down"
          />
          <ul v-show="filterMenu" class="home__filter-menu">
            <li @click="filteredInvoice" class="home__filter-item">Draft</li>
            <li @click="filteredInvoice" class="home__filter-item">Pending</li>
            <li @click="filteredInvoice" class="home__filter-item">Paid</li>
            <li @click="filteredInvoice" class="home__filter-item">
              Clear Filter
            </li>
          </ul>
        </div>
        <div @click="newInvoice" class="home__button flex">
          <div class="home__button-inner flex">
            <img
              class="home__button-img"
              src="@/assets/icons/icon-plus.svg"
              alt="icon-plus"
            />
          </div>
          <span>New Invoices</span>
        </div>
      </div>
    </div>
    <!-- Invoices -->
    <div v-if="invoiceData.length > 0" class="home__invoice">
      <Invoice
        v-for="(invoice, index) in filteredData"
        :key="index"
        :invoice="invoice"
      />
    </div>
    <div v-else class="home__empty flex flex-column">
      <img
        class="home__empty-img"
        src="../assets/icons/illustration-empty.svg"
        alt="icons illustration empty"
      />
      <h3 class="home__empty-title">There is nothing here</h3>
      <p class="home__empty-text">
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/Invoice.vue';
import { mapMutations, mapState } from 'vuex';
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: { Invoice },
  data() {
    return {
      filterMenu: null,
      filterInvoice: null,
    };
  },
  methods: {
    ...mapMutations(['toggleInvoice']),

    togglerFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
    newInvoice() {
      this.toggleInvoice();
    },
    filteredInvoice(e) {
      if (e.target.innerText === 'Clear Filter') {
        this.filterInvoice = null;
        return;
      }
      this.filterInvoice = e.target.innerText;
    },
  },
  computed: {
    ...mapState(['invoiceData']),

    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.filterInvoice === 'Draft') {
          return invoice.invoiceDraft === true;
        }
        if (this.filterInvoice === 'Pending') {
          return invoice.invoicePending === true;
        }
        if (this.filterInvoice === 'Paid') {
          return invoice.invoicePaid === true;
        }
        return invoice;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;
  &__header {
    margin-bottom: 65px;
  }
  &__left {
    flex: 1;
  }
  &__right {
    justify-content: flex-end;
    align-items: center;
    @media (min-width: 980px) {
      flex: 1;
    }
  }
  &__subtitle {
    font-size: 12px;
  }
  &__filter,
  &__button {
    align-items: center;
  }
  &__filter {
    margin-right: 40px;
    cursor: pointer;
  }
  &__filter-title,
  &__filter-img {
    pointer-events: none;
  }
  &__filter-img {
    margin-left: 12px;
    width: 9px;
    height: 5px;
  }
  &__filter-menu {
    width: 120px;
    position: absolute;
    top: 25px;
    list-style: none;
    background-color: #1e2139;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  &__filter-item {
    cursor: pointer;
    font-size: 12px;
    padding: 10px 20px;

    &:hover {
      color: #1e2139;
      background-color: #fff;
    }
  }
  &__button {
    padding: 8px 10px;
    background-color: #7c5dfa;
    border-radius: 40px;
    cursor: pointer;
  }
  &__button-inner {
    margin-right: 8px;
    border-radius: 50%;
    padding: 8px;
    align-items: center;
    background-color: #fff;
  }
  &__button-img {
    width: 10px;
    height: 10px;
  }

  &__empty {
    margin-top: 160px;
    align-items: center;
  }
  &__empty-img {
    width: 214px;
    height: 200px;
  }

  &__empty-title {
    font-size: 20px;
    margin-top: 40px;
  }

  &__empty-text {
    text-align: center;
    max-width: 224px;
    font-size: 12px;
    font-weight: 300;
    margin-top: 16px;
  }
}
</style>
