export class LoginService {
  constructor($axios) {
    this.$axios = $axios
  }

  userLogin = async (data) => {
    return await this.$axios.post(`/auth/login`, data)
  }
}