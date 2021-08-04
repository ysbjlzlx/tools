import { boot } from "quasar/wrappers";
import ElementPlus from "element-plus";
import "nprogress/nprogress.css";
import "element-plus/lib/theme-chalk/index.css";
import { ElButton, ElSelect } from "element-plus";

export default boot(({ app, router, store }) => {
  app.use(ElementPlus);
  app.component(ElButton.name, ElButton);
  app.component(ElSelect.name, ElSelect);
});
