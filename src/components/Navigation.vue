<template>
  <div>
    <header class="header flex">
      <div class="header__branding flex">
        <img
          class="header__logo"
          src="@/assets/icons/file-invoice-dollar-solid.png"
          alt="Logo"
        />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navigation',
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 100;
  flex-direction: row;
  background-color: #1e2139;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  &__branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    @media (min-width: 900px) {
      width: 100%;
    }
  }
  &__logo {
    width: auto;
    height: 30px;
  }
}
</style>
