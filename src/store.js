import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state() {
      return {
          slug: "live-your-life-in-style-with-great-design",
          hasToken: false,
          user: {}
      };
    },
    mutations: {
        CHANGE_SLUG(state) {
            state.slug = "fit-to-last"
        },
        SET_HAS_TOKEN(state) {
            state.hasToken = true;
        },
        SAVE_USER(state, data) {
            state.user = data;
        },
    },
    getters: {
        getSlug: state => {
            return state.slug
        },
    }
  });
}
