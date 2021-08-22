import ga from "../scripts/analytics.js";

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, sessionId);
  });
};
