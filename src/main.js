import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC29K-2cd_apd9G2sAQw6Q34DJYEtVhwK0",
  authDomain: "joinantest.firebaseapp.com",
  projectId: "joinantest",
  storageBucket: "joinantest.appspot.com",
  messagingSenderId: "727341133911",
  appId: "1:727341133911:web:b36ae167f1605ecbc17312",
  measurementId: "G-3H6TK3PP70",
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
