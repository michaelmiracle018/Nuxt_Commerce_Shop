<template>
  <div class="home">
    <BlogPost :info="welcomeScreen" />
    <BlogPost
      v-for="(info, index) in sampleBlogPost"
      :key="index"
      :info="info"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>You Can Post Your Products Online</h3>
        <!-- <h5>Just click on one these card</h5> -->
        <div class="blog-cards">
          <BlogCard
            v-for="(info, index) in sampleBlogCards"
            :key="index"
            :info="info"
          />
        </div>
      </div>
    </div>
    <div class="update">
      <Hero />
    </div>
  </div>
</template>

<script>
import BlogPost from '../../components/BlogPost.vue'
import BlogCard from '../../components/BlogCard.vue'
import Arrow from '../../assets/icons/arrow-right-light.svg'
import { sampleBlogCards } from '../../assets/helper'
import Hero from '../../components/landingPage/Hero.vue'
export default {
  name: 'Home',
  components: {
    BlogPost,
    BlogCard,
    Arrow,
    Hero,
  },
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        post: 'Get deals on Shopping in women and men wears at Wings dealers.',
        welcomeScreen: true,
        photo: 'boutique-shop',
      },
      sampleBlogPost: [
        {
          title: 'Men and Women Available ',
          checkout: 'Checkout more clothings',
          photo: 'wears',
        },
        {
          title: 'Electronics gadget Available',
          checkout: 'Checkout more',
          photo: 'electronics',
        },
      ],
      sampleBlogCards: sampleBlogCards,
    }
  },
 
  
  
  head() {
    return {
      title: 'Home Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home Page',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.update {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media screen and (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-decoration: uppercase;
      @media screen and (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
