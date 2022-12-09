<p style="text-align: center;">
  <h1 align="center"><a href="javascript:void(0);">vue3-vite-tsx-element-plus-admin</a></h1>
</p>

## 开发环境

- node 14.21.0+

## 简介

当前项目采用 vue3 + vite + element-plus + tsx + decorators + tailwindcss 构建 admin 管理员后台页面

### 欢迎大家加入一起完善这个项目，让它更加完善

## 注意

1. 使用 vscode 开发需要安装格式化插件 ESLint + Prettier

## demo

```ts
// demo.tsx
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "Demo",
})
export default class Demo extends Vue {
  // 父组件传参
  @Prop({ default: false, type: Boolean })
  private sidebarCollapse!: boolean;

  /**
   * render
   */
  public render(): JSX.Element {
    const { sidebarCollapse } = this;
    return (
      <div>
        <div>demo-{sidebarCollapse}</div>
      </div>
    );
  }
}
```

## 启动

`yarn run serve`

## 编译

`yarn run build`

## 预览编译文件

`yarn run preview`

## 使用 tsx 配置 允许启用装饰器(decorators)

1. 安装
   `yarn add @vitejs/plugin-vue-jsx @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties --dev`

2. 在 vite.config.ts 配置

```ts
vueJsx({
        babelPlugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
}),
```

## 使用 tailwindcss(vscode 推荐安装 Tailwind CSS IntelliSense 提示插件)

1. 安装 tailwindcss
   `yarn add tailwindcss@latest postcss@latest autoprefixer@latest --dev`

2. 创建配置文件
   `yarn tailwindcss init`

3. 引入样式

```ts
// main.ts
import "tailwindcss/tailwind.css";
```

4. 修改配置 tailwind.config.js 文件

```js
content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
```

5.  vite.config.ts 增加配置

```ts
css: {
    postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
    },
},
```

## 按需引入 element-plus

1. 安装 element-plus
   `yarn add element-plus`

2. 按需导入配置
   `yarn add unplugin-vue-components unplugin-auto-import --dev`

3. 在 vite.config.ts 中配置

```ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


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
```

4. 引入样式

```ts
// main.ts
import "element-plus/dist/index.css";
```

5. 全局配置

```ts
// 在app.tsx配置
<el-config-provider size={"small"} z-index={3000}>
  <router-view />
</el-config-provider>
```

启动会在`components.d.ts`文件中导入所需要的组件

### 注册 element-plus 所有图标

1. 全局注册

```ts
import * as ElIcons from "@element-plus/icons-vue";

const ElIconsData = ElIcons as unknown as Array<
  () => Promise<typeof import("*.vue")>
>;

// 大写转驼峰 例如 UserFilled -> i-user-filled
for (const iconName in ElIconsData) {
  app.component(
    `i-${
      iconName.substring(0, 1).toLocaleLowerCase() +
      iconName
        .substring(1)
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()
    }`,
    ElIconsData[iconName]
  );
}
```

2. 使用

```ts
<el-button type="primary" icon="i-Search">
  Search
</el-button>
<el-icon size={"20"}>
  <i-edit />
</el-icon>
```

## tsx 插槽使用

```html
<el-sub-menu index="2" v-slots={{ title: () => "Workspace" }}></el-sub-menu>
```

## 自定义图标(vite-plugin-svg-icons)

1. 安装插件

`yarn add vite-plugin-svg-icons -D`

2. 配置 vite.config.ts

```ts
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
```

`注意`：svg 文件都放在 src/assets/icons 文件夹下

3. 配置 tsconfig.json

```ts
{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  }
}
```

4. 封装 SvgIcon 组件
   请看文件 src\components\svg-icon\svg-icon.tsx 和 src\components\svg-icon\index.ts

5. 全局注册 main.ts

```ts
import svgIcon from "@/components/svg-icon";
app.use(svgIcon);
```

6. 使用

`<svg-icon name="user" />`

## 添加背景水印

1. 代码如下
   `src\utils\watermark.ts`

2. 在 home.tsx 中使用

```ts
import Watermark2 from "@/utils/watermark";
import { UserModule } from "@/store/modules/user";

// 设置水印
  private setWatermark(username: string) {
    Watermark2(
      {
        watermark_txt: username,
        watermark_position: "fixed",
        watermark_x: 0, // 水印起始位置x轴坐标
        watermark_y: 0, // 水印起始位置Y轴坐标
        watermark_rows: 15, // 水印行数
        watermark_cols: 10, // 水印列数
        watermark_x_space: 120, // 水印x轴间隔
        watermark_y_space: 80, // 水印y轴间隔
        watermark_color: "#dddddd", // 水印字体颜色
        watermark_alpha: 0.7, // 水印透明度
        watermark_fontsize: "14px", // 水印字体大小
        watermark_font: "微软雅黑", // 水印字体
        watermark_width: 140, // 水印宽度
        watermark_height: 15, // 水印长度
        watermark_angle: 15, // 水印倾斜度数
      },
      "#app"
    );
  }

  private get nickname() {
    return UserModule.username;
  }

  // 注册水印
  public mounted() {
    this.setWatermark(this.nickname);
  }

  // 清除水印
  public unmounted() {
    this.setWatermark("");
  }
```

## 处理刷新和热加载导致 vuex store 失效问题

在 app.tsx 中添加

```ts
import Store from "@/store";

public created(): void {
    // 在页面加载时读取sessionStorage里的状态信息
    const localStore = sessionStorage.getItem("store");
    if (localStore) {
      Store.replaceState(
        Object.assign({}, Store.state, JSON.parse(localStore))
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(Store.state));
    });
  }
```

## element-plus + i18n 国际化配置

1. 参考文档`https://blog.csdn.net/lhz_333/article/details/125295634`

2. 安装 vue-i18n 依赖

`yarn add vue-i18n@next` 必须加@next 装最新包，不然会和 vite 又兼容性问题

3. 代码参考 `src\i18n` 很 `src\components\lang-select` 文件夹下

4. i18n 全局注册

```ts
// src\main.ts
import i18n from "./i18n";
app.use(i18n);
```

5. 页面使用

   `<div>{this.$t("workplace.name")}</div>`

6. Element-Plus 国际化配置

```ts
// src\app.tsx

// 导入 Element Plus 语言包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";

// 语言
private lang: Record<string, any> = {
  zhCn: zhCn,
  en: en,
};

private get language() {
  return AppModule.language;
}

private get locale() {
  return this.lang[this.language];
}

 <el-config-provider size={"default"} z-index={3000} locale={locale}>
    <router-view key={key} />
  </el-config-provider>
```

## 全屏插件 ScreenFull

1. 安装
   `yarn add screenfull`

2. 代码参考 文件夹`src\components\screen-full\index.tsx`

## 文档

[vue3 配置](https://cli.vuejs.org/config/)

[tailwindcss](https://www.tailwindcss.cn/)

[vite](https://cn.vitejs.dev/config/worker-options.html#worker-format)

[element-plus](https://element-plus.gitee.io/zh-CN/)

## 遇到的问题

1. Vite2+VUE3 下引入 path 模块报错：Module "path" has been externalized for brower compatibility and cannot be accesed in client code

原因是 vite 源码中设定了不允许在客户端代码中访问内置模块代码。

解决方法：
使用 `path-browserify` 代替 `path` 模块

`yarn add @types/path-browserify --dev` and `yarn add path-browserify`

不再使用 import path from 'path'，改为 import path from 'path-browserify'

## 贡献

<a href="https://github.com/klover2/vue3-vite-tsx-element-plus-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=klover2/vue3-vite-tsx-element-plus-admin" />
</a>

欢迎提[存在的 Bug 或者意见](https://github.com/klover2/vue3-vite-tsx-element-plus-admin/issues)。
