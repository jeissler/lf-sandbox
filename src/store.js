import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state() {
      return {
          slug: "live-your-life-in-style-with-great-design"
      };
    },
    mutations: {
        CHANGE_SLUG(state) {
            state.slug = "fit-to-last"
        }
    },
    getters: {
        getSlug: state => {
            return state.slug
        },
    }
  });
}
