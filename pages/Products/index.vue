<template>
  <wrapper>
    <section class="main_container">
      <div class="auth_text">
        {{ text }}
      </div>
      <div class="sub_container">
        <div class="product_card">
          <section class="main_container">
            <div class="sub_container">
              <header class="header">
                <h1>All Our Deals</h1>
              </header>
              <div class="input_wrap">
                <input type="text" placeholder="search for a category" />
                <button>Search</button>
              </div>
              <div class="item_wrap">
                <div
                  class="single_card_item"
                  v-for="item in getAllProducts.getAllProducts"
                  :key="item.id"
                >
                  <div class="item_title">
                    <h4>
                      {{
                        item.title.length > 18
                          ? item.title.substring(0, 18) + "..."
                          : item.title
                      }}
                    </h4>
                  </div>
                  <div class="item_image">
                    <nuxt-link :to="`/Products/${item.id}`" class="card">
                      <img :src="item.image" alt="image" />
                    </nuxt-link>
                  </div>
                  <div class="item_category">
                    <h4><span>Category:</span> {{ item.category }}</h4>
                  </div>
                  <div class="item_rating">
                    <h6>
                      rating:
                      <span>{{ item.rating.rate }}</span>
                    </h6>
                    <!-- <button>view more</button> -->
                  </div>
                  <div class="footer">
                    <span>GhC {{ item.price }}</span>
                    <button @click="addToCart(item)">Add To cart</button>
                  </div>
                </div>
                <div class="select_wrap">
                  <select class="select" @change="getFilteredList($event)">
                    <option value="10">4</option>
                    <option value="20">8</option>
                    <option value="30">12</option>
                    <option value="40">16</option>
                    <option value="50">20</option>
                  </select>
                </div>
              </div>
              <!-- <div v-else>
                <Loading />
              </div> -->
            </div>
          </section>
        </div>
      </div>
    </section>
  </wrapper>
</template>

<script>
import Wrapper from '../../components/newDashboardComponents/Wrapper.vue'
import ProductCard from '../../components/ProductCard.vue'
import Loading from '../../components/Loading.vue'
// import axios from 'axios'
export default {
  middleware: 'auth',

  components: { Wrapper, ProductCard, Loading },

  data() {
    return {
      openSidebar: false,
      text: '',
    }
  },
  computed: {
    auth() {
      return this.$store.getters.ifAuthenticated
    },
    getAllProducts() {
      return this.$store.getters
    },
    getLoginToken() {
      return this.$store.state.loginToken
    },
  },
  methods: {
    displayText() {
      if (this.auth === true) {
        this.$swal({
          toast: true,
          text: 'Welcome Online.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top-end',
        })
      } else {
        this.$swal({
          toast: true,
          text: 'You are offline.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top-end',
        })
      }
    },
    addToCart(item) {
      this.$store.commit('ADD_TO_CART', item)
    },

    getFilteredList(e) {
      // GET SELECTED NUMBER
      const limit = parseInt(
        e.target.options[e.target.options.selectedIndex].innerText
      )
      this.$store.dispatch('fetchAllProduct', {
        limit,
      })
    },
  },
  created() {
    setTimeout(this.displayText(), 2000)
    const body = {
      limit: this.limit,
    }
    this.$store.dispatch('fetchAllProduct', body)
    //  console.log(this.getAllProducts);
  },
  beforeMount() {},
  head() {
    return {
      title: 'Dashboard Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard Page',
        },
      ],
    }
  },
}
</script>

<style scoped>
.auth_text {
  margin: 0rem auto;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  color: rgb(0, 255, 0);
}

.main_container {
  padding: 5rem 0;
  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header h1 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: clamp(30px, 5vw, 60px);
  line-height: 28px;
  color: #000000;
  text-transform: capitalize;
}

.input_wrap {
  max-width: 1170px;
  margin: 1rem auto;
}

.input_wrap input {
  width: 100%;
  max-width: 250px;
}

.input_wrap button {
  width: 100px;
  height: 48px;
  background: #9e2140;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  margin-bottom: 0.8rem;
}

/* ITEM WRAP STYLES */
.item_wrap {
  width: 90vw;
  margin: 3rem auto;
  max-width: 1170px;
  height: 100vh;
  max-height: 300px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  cursor: hand;
  transform: 0.2s ease-in-out;
  margin-bottom: 3rem;
}

.single_card_item {
  margin-bottom: 1rem;
}

.single_card_item:hover {
  transform: translateY(-0.5%);
  box-shadow: 0 4rem 8rem rgba(0, 0, 0, 0.2);
}

/* Item Tile */

.item_title {
  background: rgba(158, 33, 64, 0.5);
  padding: 0.5rem;
}

.item_rating h6 {
  margin-left: 0.5rem;
}

.item_title h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  text-transform: capitalize;
}

/* Item Image */

.item_image {
  padding-bottom: 0.4rem;
}
.item_image img {
  width: 100%;
  height: 12rem;
}

/* Item Category */
.item_category {
  margin-left: 10px;
}

.item_category h4 {
  font-family: 'Montserrat';
  font-style: normal;
  font-size: 15px;
  font-weight: 500;

  line-height: 28px;
  color: #333;
}

.item_category h4 span {
  font-weight: 800;
  color: #000000;
}

/* Item Rating */
.item_rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.item_rating button {
  width: 150px;
  background-color: transparent;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}

/* Item Footer */

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(158, 33, 64, 0.1);
  padding: 0.5rem;
}

.footer button {
  width: 140px;
  height: 40px;
  background: #9e2140;
  border-radius: 5px;
  outline: none;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
}

.select_wrap {
  margin-top: 10rem;
  margin-bottom: 10rem;
}

.select {
  border: 2px solid #d9d9d9;
  width: 100px;
  height: 55px;
  padding: 7px;
  border-radius: 9px;
  background-color: transparent;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  color: #000000;
}
/* END OF ITEM WRAP STYLES */

@media screen and (max-width: 1200px) {
  .input_wrap {
    margin-left: 3rem;
  }
}
</style>
