export const state = () => ({
  folders: [],
  folder: {},
  // use this entity id for now
})

export const getters = {
  folders: (state) => state.folders,
  folder: (state) => state.folder,
}

export const mutations = {}

export const actions = {
   async userLogin({ commit }, payload) {
     // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await this.$loginService.userLogin(payload)
      console.log(data);
      return data
    } catch (error) {
      throw error
    }
  },

}
