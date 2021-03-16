import path from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  alias: {
    "/@": __dirname,
    "/@src": path.resolve(__dirname, "./src"),
    "@element-plus": path.resolve(__dirname, "./node_modules/element-plus"),
  },
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/locales/**"),
      compositionOnly: false,
    }),
  ],
  optimizeDeps: {
    include: ["jsoneditor", "clipboard-polyfill/text"],
  },
};
