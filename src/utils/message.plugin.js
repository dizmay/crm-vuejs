import M from "materialize-css/dist/js/materialize.min";

export default {
  install(app) {
    app.config.globalProperties.$toastMessage = (text) => {
      M.toast({ html: text });
    };
    app.config.globalProperties.$toastError = (text) => {
      M.toast({ html: `[Ошибка]: ${text}` });
    };
  },
};
