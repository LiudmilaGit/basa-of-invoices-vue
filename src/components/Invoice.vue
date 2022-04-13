<template>
  <router-link
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId }}"
    class="invoice flex"
  >
    <div class="invoice__left flex">
      <span class="invoice__span tracking-number"
        >#{{ invoice.invoiceId }}</span
      >
      <span class="invoice__span due-date">{{ invoice.paymentDueDate }}</span>
      <span class="invoice__span person">{{ invoice.clientName }}</span>
    </div>
    <div class="invoice__right flex">
      <span class="invoice__span price">${{ invoice.invoiceTotal }}</span>
      <div
        class="invoice__buttons status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid" class="invoice__span">Paid</span>
        <span v-if="invoice.invoiceDraft" class="invoice__span">Draft</span>
        <span v-if="invoice.invoicePending" class="invoice__span">Pending</span>
      </div>
      <div class="invoice__icon">
        <img src="@/assets/icons/icon-arrow-right.svg" alt="icon arrow right" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'invoice',
  props: ['invoice'],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 16px;
  margin-bottom: 16px;
  color: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  background-color: #1e2139;
  align-items: center;
  &__left {
    align-items: center;
    flex-basis: 60%;
    gap: 16px;
  }
  &__span {
    font-size: 14px;
    flex: 1;
  }

  &__right {
    align-items: center;
    flex-basis: 40%;
    gap: 16px;
  }

}
.tracking-number {
  text-transform: uppercase;
}
.price {
  font-size: 16px !important;
  font-weight: 600;
}

</style>
