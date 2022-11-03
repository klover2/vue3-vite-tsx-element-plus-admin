import { UserConfigExport, ConfigEnv, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
    ],
    base: env.VITE_USER_NODE_ENV === "development" ? "/" : "./",
    server: {
      port: 8888,
    },
    css: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }, // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js", // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js", // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: "[ext]/[name].[hash].[ext]", // 拆分js到模块文件夹
        },
      },
    },
  };
};
