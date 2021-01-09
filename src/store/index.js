import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hideTabs: false, // 隐藏标签页
    showTabs: false, // 显示标签页
    makeDark: false, // 改变暗夜模式
  },
  getters: {
    // 获得状态
    getHideTabs: (state) => {
      return state.hideTabs;
    },
    getShowTabs: (state) => {
      return state.showTabs;
    },
    getMakeDark: (state) => {
      return state.makeDark;
    }
  },
  mutations: {
    changeHideTabs(state) { 
      // 改变隐藏
      state.hideTabs = !state.hideTabs;
    },
    changeShowTabs(state) { 
      // 显示
      state.showTabs = !state.showTabs;
    },
    // 暗夜模式
    changeMakeDark(state) {
      state.makeDark = !state.makeDark;
    }
  },
  actions: {
  },
  modules: {
  },
});
