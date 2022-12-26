<template>
  <div class="main_container">
    <!-- <Login /> -->
    <div class="nav_content">
      <Nav />
    </div>
    <Carousel />
    <div class="hero">
      <Hero />
    </div>
    <Footer />
  </div>
</template>

<script>
// import Login from './Login.vue'
import Nav from '../components/landingPage/Nav.vue'
import Carousel from '../components/landingPage/Carousel.vue'
import Footer from '../components/Footer.vue'
import Hero from '../components/landingPage/Hero.vue'
export default {
  components: { Nav, Footer, Hero, Carousel },
}
</script>

<style scoped>
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media screen and (max-width: 799px) {
  .hero {
    margin-top: -1rem;
  }
}
</style>
