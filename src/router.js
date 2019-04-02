import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Locations from "./views/Locations.vue";
import Article from "./views/Article.vue";
import TestHome from "./views/TestHome.vue";
import { registerAnon } from "./middleware";

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Home
      },
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/About.vue")
      },
      {
          path: "/locs",
          component: Locations
      },
      {
          path: "/article",
          component: Article
      },
      {
          path: "/test-home",
          component: TestHome
      }
    ]
  });

  router.beforeEach(registerAnon)

  return router;
}
