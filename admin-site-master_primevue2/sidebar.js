const { createApp, ref } = Vue;

const AppSideBar = {
  setup() {
    const visibleLeft = ref(false);

    return { visibleLeft };
  },
  components: {
    "p-sidebar": primevue.sidebar,
    "p-button": primevue.button,
  },
};

createApp(AppSideBar).use(primevue.config.default).mount("#sidebar");
