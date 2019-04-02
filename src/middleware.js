// new store/apolloProvider
//import { store, apolloProvider } from "./main";

import { onLogin } from "./vue-apollo";
import REGISTER from "./graphql/registerAnon.gql";

// ips: Leawood KS, Paradise Valley AZ
const mockIps = ["23.228.141.85", "132.148.192.43"];

// global - all routes must pass anon reg
export const registerAnon = (to, from, next) => {
    //const store = require("./main").store;
    const apolloClient = require("./main").apolloProvider.defaultClient;

    apolloClient.mutate({ mutation: REGISTER, variables: { ip: mockIps[1] } }).then(() => {
        // vue-apollo provided - sets bearer token for apollo client auth
        //onLogin(apolloClient, res.data.registerAnonymous.jwt);

        // sets token flag for anon register
        //store.commit("SET_HAS_TOKEN", true);

        // saves user location objs into vuex store
        //store.commit("SAVE_USER", res.data.registerAnonymous.user);

        // continue routing AFTER populating store

        next();
        
    }).catch(err => {
        console.error(`Error on anonymous registration: ${err.message}`);
    })
};

export const test = (to, from, next) => {
    const store = require("./main").store;
    const apolloClient = require("./main").apolloProvider.defaultClient;

    onLogin(apolloClient, "this-is-a-random-token");
    //await apolloClient.resetStore()

    store.commit("SAVE_USER", {foo: "bar"})
    store.commit("SET_HAS_TOKEN");
    next();
};
