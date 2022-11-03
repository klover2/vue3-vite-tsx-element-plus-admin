import { createApp } from "vue";
import App from "./app";
import router from "./router";
import store from "./store";
// tailwindcss 和 element-plus 放置位置  不然有样式冲突
import "tailwindcss/tailwind.css";
import "element-plus/dist/index.css";

createApp(App).use(store).use(router).mount("#app");
