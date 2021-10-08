export default {
  install(app) {
    app.config.globalProperties.$toastMessage = (text) => {
      window.M.toast({ html: text });
    };
    app.config.globalProperties.$toastError = (text) => {
      window.M.toast({ html: `[Ошибка]: ${text}` });
    };
  },
};
