import { createApp } from "vue";
import App from "./app";
import router from "./router";
import store from "./store";
import * as ElIcons from "@element-plus/icons-vue";
// tailwindcss 和 element-plus 放置位置  不然有样式冲突
import "tailwindcss/tailwind.css";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store);
app.use(router);

const ElIconsData = ElIcons as unknown as Array<
  () => Promise<typeof import("*.vue")>
>;
for (const iconName in ElIconsData) {
  app.component(`i-${iconName.toLocaleLowerCase()}`, ElIconsData[iconName]);
}

app.mount("#app");
