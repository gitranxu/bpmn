import Vue from "vue";
import Router from "vue-router";
import App from "./app";
import "static/reset.css";
import "static/common.css";

Vue.use(Router);

import router from "./router";

new Vue({
    el: "#app",
    router,
    render: h => h(App),
});