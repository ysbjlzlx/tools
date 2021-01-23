import vue from "@vitejs/plugin-vue";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  alias: {
    "/@": __dirname,
  },
  plugins: [vue()],
  optimizeDeps: {
    include: ["jsoneditor"],
  },
};
