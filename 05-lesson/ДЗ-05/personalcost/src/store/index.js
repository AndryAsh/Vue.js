import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentList: [],
    fullDataList: [],
    categoryList: [],
    pageNumber: 1,
    paginationSize: 5,
  },
  getters: {
    getPaymentsList: state => state.paymentList,
    getPaymentsListSize: state => state.paymentList.length,
    getFullPaymentsValue: state => {
      return state.paymentList.reduce((res, el) => res + Number(el.value), 0);
    },
    getDataListSize: state => Object.keys(state.fullDataList).length,
    getPageNumber: state => state.pageNumber,
    getPaginationSize: state => state.paginationSize,
    getPageData: state => state.paymentList.filter(function (item) {
      return item.page == state.pageNumber;
    }),
    getCategoryList: state => state.categoryList,
  },
  mutations: {
    setPaymentListData(state, pNumber) {
      const pageData = Array.from(state.fullDataList[pNumber]);
      if (!state.paymentList.length) {
        for (let item of pageData) {
          item['page'] = pNumber;
          state.paymentList.push(item);
        }
      } else {
        const pageItems = state.paymentList.filter(function (item) {
          return item.page == state.pageNumber;
        });
        if (!pageItems.length) {
          for (let item of pageData) {
            item['page'] = state.pageNumber;
            state.paymentList.push(item);
          }
        } else if (pageItems.length < state.paginationSize) {
          const itemSet = new Set();
          for (let item of pageData) {
            itemSet.add(item);
          }
          state.categoryList = Array.from(itemSet);
        } else if (pageItems.length === state.paginationSize) {
          Vue.set(state.paymentList,)
          state.paymentList = pageItems;
        }
      }
    },
    setFullDataList(state, payload) {
      state.fullDataList = payload;
    },
    setPageNumber(state, payload) {
      state.pageNumber = payload;
    },
    addNewItem(state, payload) {
      let endPage = Object.keys(state.fullDataList).length;
      if (state.fullDataList[endPage].length < state.paginationSize) {
        state.fullDataList[endPage].push(payload);
      } else {
        const arr = [payload];
        Vue.set(state.fullDataList, endPage + 1, arr);
      }
    },
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    addCategory(state, payload) {
      state.categoryList.push(payload);
    }
  },
  actions: {
    fetchData({ commit }) {
      commit('setPaymentListData', this.state.pageNumber)
    },
    fetchFullData({ commit }) {
      return new Promise((resolve) => {
        const obj = {};
        const cat = ["Food", "Navigation", "Sport", "Entertaiment", "Education"];
        for (let i = 1; i <= 10; i++) {
          const arr = [];
          for (let j = 1; j <= this.state.paginationSize; j++) {
            arr.push({
              id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
              }),
              date: "28.02.2022",
              category: cat[Math.floor(Math.random() * (this.state.paginationSize - 1)) + 1],
              value: 169
            });
            obj[i] = arr;
          }
        }
        resolve(obj)
      }).then(result => {
        commit('setFullDataList', result)
      })
    },
    changePageNumber({ commit }, payload) {
      commit('setPageNumber', payload);
      commit('setPaymentListData', this.state.pageNumber);
    },
    addNewItemFullDataList({ commit }, payload) {
      commit('addNewItem', payload);
    },
    fetchCategoryData({ commit }) {
      return new Promise((resolve) => {
        let category = new Set();
        for (let item of Object.values(this.state.fullDataList)) {
          item.forEach(el => category.add(el.category));
        }
        category = [...category];
        resolve(category)
      }).then(result => {
        commit('setCategoryList', result)
      })
    }
  },
  modules: {
  }
})
