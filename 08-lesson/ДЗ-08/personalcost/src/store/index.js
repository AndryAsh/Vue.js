import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
} */

export default new Vuex.Store({
  state: {
    paymentList: [],
    categoryList: [],
  },
  getters: {
    getPaymentsList: state => state.paymentList,
    getCategoryList: state => state.categoryList,
    getPaymentsListSize: state => state.paymentList.length,
    getFullPaymentsValue: state => {
      return state.paymentList.reduce((res, el) => res + Number(el.value), 0);
    },
  },
  mutations: {
    setPaymentListData(state, payload) {
      state.paymentList = payload;
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    addCategory(state, payload) {
      state.categoryList.push(payload);
    },
    addDataPaymentsList(state, payload) {
      state.paymentList.push(payload)
    },
    changeDataPaymentList(state, payload) {
      const changeCost = {
        id: payload.id,
        category: payload.category,
        date: payload.date,
        value: payload.value
      };
      Vue.set(state.paymentList, payload.index, changeCost);
    },
    delDataPaymentList(state, payload) {
      state.paymentList.splice(payload.index, 1);
    },
  },
  actions: {
    fetchCategoryData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Food", "Navigation", "Sport", "Entertaiment", "Education", "Transport"])
        }, 1000)
      }).then(result => {
        commit('setCategoryList', result)
      })
    },
    fetchData({ commit }) {
      const cat = ["Food", "Navigation", "Sport", "Entertaiment", "Education", "Transport"];
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = []
          for (let i = 1; i <= 50; i++) {
            items.push({
              date: "23.12.2020",
              category: cat[Math.floor(Math.random() * (cat.length - 1)) + 1],
              value: 179,
              id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              }),
            })
          }
          resolve(items)
        }, 2000)
      }).then(result => {
        commit('setPaymentListData', result)
      })
    },
  },
  modules: {
  }
})
