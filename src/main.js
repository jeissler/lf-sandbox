import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

const router = createRouter();
const store = createStore();
const apolloProvider = createProvider({
    ssr: process.server
});

async function createApp({
  beforeApp = () => {},
  afterApp = () => {}
} = {}) {

  await beforeApp({
    router,
    store,
    apolloProvider
  });

  const app = new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App)
  });

  const result = {
    app,
    router,
    store,
    apolloProvider
  };

  await afterApp(result);

  return result;
}

export { createApp, store, apolloProvider }