<template>
  <div class="mirade-dashboard">
    <newDashboardHeader />
    <div class="mirade-dashboard-main">
      <slot></slot>
    </div>
    <button class="mirade-dashboard-help-btn">
      <img src="~assets/icons/help.svg" alt="">
    </button>
  </div>
</template>

<script>
import newDashboardHeader from './Header.vue'
export default {
  name: 'newDashboardWrapper',
  components: {newDashboardHeader}
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/wrapper.scss';
</style>