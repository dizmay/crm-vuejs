import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import messagePlugin from "./utils/message.plugin";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(messagePlugin); // Materialize toast message plugin

app.mount("#app");
