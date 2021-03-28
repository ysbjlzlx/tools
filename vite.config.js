import path from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: [
      { find: "/@", replacement: __dirname },
      { find: "/@src", replacement: path.resolve(__dirname, "./src") },
      {
        find: "@element-plus",
        replacement: path.resolve(__dirname, "./node_modules/element-plus"),
      },
    ],
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
