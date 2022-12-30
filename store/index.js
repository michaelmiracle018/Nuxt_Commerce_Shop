const baseURL = process.env.API_BASE_URL
import axios from 'axios'

export const state = () => ({
  loginToken: localStorage.getItem('signInToken'),
  productBag: [],
  singleItem: [],
  category: {},
  categoryCart: [],
  cart: [],
  limit: 0,
})

export const getters = {
  ifAuthenticated: (state) => {
    return state.loginToken !== null
  },
  getAllProducts: (state) => state.productBag,
  getProductsById: (state) => state.singleItem,
  getCart: (state) => state.cart,
  getTotalItems: (state) => {
    var total = 0
    state.cart.forEach((item) => {
      total += item.price * item.quantity
    })
    return total.toFixed(2)
  },
  // cartQuantity(state) {
  //   return state.cart.reduce((sum, item) => {
  //     return sum + item.quantity
  //   }, 0)
  // },
}

export const mutations = {
  // ===GET USER AUTH===
  AUTH_USER(state, payload) {
    state.loginToken = payload.token
  },
  // ===GET LIMIT===
  GET_LIMIT(state, payload) {
    state.limit = payload
  },
  // ===GET AUTH===
  CLEAR_AUTH(state) {
    state.loginToken = null
  },
  // === FETCH ALL PRODUCTS===
  FETCH_ALL_PRODUCTS(state, payload) {
    state.productBag = payload
  },
  // ===GET SINGLE PRODUCT===
  FETCH_SINGLE_PRODUCT(state, payload) {
    return (state.singleItem = payload)
  },

  // === GET CATEGORY===
  FETCH_CATEGORY_PRODUCT(state, payload) {
    return (state.category = payload)
  },
  // ===ADD TO CART===
  ADD_TO_CART(state, product) {
    const itemFound = state.cart.find((item) => item.id === product.id)

    if (!itemFound) {
      state.cart.push({ ...product, quantity: 1 })
      this.$swal({
        toast: true,
        text: 'Item Added To Cart.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
      })
    } else {
      itemFound.quantity = 1
      this.$swal({
        toast: true,
        text: 'Item Already In Cart.',
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'middle',
      })
    }
    this.$router.push('/Cart')
  },
  // ===DECREASE CART===
  DECREASE_CART(state, id) {
    console.log(id)
    state.cart.find((item) => {
      if (item.id === id) {
        item.quantity -= 1
      }
      this.$swal({
        toast: true,
        text: 'Cart Updated.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
      })
    })
    state.cart.find((item) => {
      if (item.quantity < 1) {
        state.cart = state.cart.filter((item) => item.id !== id)
        this.$swal({
          toast: true,
          text: 'Item Deleted.',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top-end',
        })
      }
    })
  },
  // === DELETE CART===
  DELETE_CART(state, index) {
    state.cart = state.cart.filter((item) => item.id !== index)

    this.$swal({
      toast: true,
      text: 'Item Removed From Cart.',
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
    })
  },
  // ===INCREASE CART===
  INCREASE_CART(state, id) {
    state.cart.map((item) => {
      if (item.id == id) {
        item.quantity += 1
      }
      this.$swal({
        toast: true,
        text: 'Cart Updated.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
      })
    })
  },
  // ===CLEAR CART===
  CLEAR_CART(state) {
    state.cart = []
  },

  // GET NEW PRODUCT
  POST_PRODUCT(state, payload) {
    console.log(payload)
    state.productBag.push(payload)
  },
  
}

export const actions = {
  // ===LOGIN TO DASHBOARD===
  async login({ commit }, payload) {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, payload)
      localStorage.setItem('signInToken', JSON.stringify(res.data.token))
      commit('AUTH_USER', res)
      await this.$swal({
        title: 'You have successfully login.',
        icon: 'success',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 4000,
        timerProgressBar: true,
        text: 'You will be directed to our dashboard.',
        showConfirmButton: false,
      })
      this.$router.push('/Products')
    } catch (error) {
      await this.$swal({
        title: 'Wrong Username',
        icon: 'error',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 6000,
        timerProgressBar: true,
        text: 'Please Copy and Paste The username Below To Login',
        showConfirmButton: false,
      })
      this.$router.push('/Login')
      console.log(error)
    }
  },
  // ===AUTO LOGIN===
  autoLogin({ commit }) {
    const token = localStorage.getItem('signInToken')
    if (!token) {
      return
    }
    commit('AUTH_USER', {
      token: token,
    })
  },
  // ===LOGOUT===
  logout({ commit }) {
    commit('CLEAR_AUTH')
    localStorage.removeItem('signInToken')
    // router.replace('/')
  },

  // ===GET ALL PRODUCTS===
  async fetchAllProduct({ commit }, body) {
    try {
      const { data } = await axios.get(
        `${baseURL}/products?limit=${body.limit}`
      )
      localStorage.setItem('productBag', JSON.stringify(data))

      commit('FETCH_ALL_PRODUCTS', data)
      commit('GET_LIMIT', body.limit)
      return data
    } catch (error) {
      console.log(error)
    }
  },

  // ===GET A SPECIFIC PRODUCT===
  async fetchSingleProduct({ commit }, body) {
    try {
      const { data } = await axios.get(`${baseURL}/products/${body.id}`)
      commit('FETCH_SINGLE_PRODUCT', data)

      // commit('FETCH_SINGLE_PRODUCT', body.id)
      return data
    } catch (error) {
      console.log(error)
    }
  },

  // ===GET PRODUCT CATEGORY===
  async fetchProductCategory({ commit }, body) {
    try {
      const { data } = await axios.get(`${baseURL}/products/categories`)
      commit('FETCH_CATEGORY_PRODUCT', data)

      return data
    } catch (error) {
      console.log(error)
    }
  },

  // POST PRODUCT
  async postProduct({ commit }, payload) {
    try {
      const data = await axios.post(`${baseURL}/products`, payload)
      console.log(data)
      commit('POST_PRODUCT', data)
      await this.$swal({
        title: 'You have successfully posted your product online.',
        icon: 'success',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 4000,
        timerProgressBar: true,
        text: 'You will be directed to the products page.',
        showConfirmButton: false,
      })
      this.$router.push('/Products')

      return data
    } catch (error) {
      await this.$swal({
        title: 'Error posting your product online.',
        icon: 'error',
        allowEscapeKey: false,
        allowOutsideClick: false,
        timer: 4000,
        timerProgressBar: true,
        text: 'Please try again.',
        showConfirmButton: false,
      })
      console.log(error)
    }
  },
}
