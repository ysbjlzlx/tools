export default ({ router }) => {
  router.afterEach((to, from) => {
    gtag("set", "page_path", to.path);
    gtag("event", "page_view");
  });
};
