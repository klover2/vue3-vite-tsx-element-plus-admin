import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const setAlias = (alias: [string, string][]) =>
  alias.map((v) => {
    return { find: v[0], replacement: path.resolve(__dirname, v[1]) };
  });

interface ImportMetaEnv {
  VITE_USER_NODE_ENV: string;
}

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const env = loadEnv(mode, root) as unknown as ImportMetaEnv;

  return {
    root,
    resolve: {
      alias: setAlias([["@", "src"]]),
    },
    plugins: [
      vue(),
      vueJsx({
        babelPlugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],
      }),
      Components({
        include: ["./src/**/*.{js,jsx,ts,tsx,vue,html}"],
        resolvers: [
          ElementPlusResolver({
            importStyle: false,
          }),
        ],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    base: env.VITE_USER_NODE_ENV === "development" ? "/" : "./",
    server: {
      port: 8888,
      open: true,
    },
    css: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    build: {
      manifest: true,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks: {
            "element-plus": ["element-plus"],
          },
        },
      },
    },
  };
};
