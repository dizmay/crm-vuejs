import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import messagePlugin from "./utils/message.plugin";
import Loader from "@/components/app/Loader";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyD870BR6lAls0theGgaH1DIx1YE-I_7esw",
  authDomain: "crm-vue-c790a.firebaseapp.com",
  databaseURL:
    "https://crm-vue-c790a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crm-vue-c790a",
  storageBucket: "crm-vue-c790a.appspot.com",
  messagingSenderId: "748819337625",
  appId: "1:748819337625:web:563a07f1c2b9cb91d6c308",
  measurementId: "G-MZTV1PYP1J",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(messagePlugin); // Materialize toast message plugin
    app.component("Loader", Loader);
    app.mount("#app");
  }
});
