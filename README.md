<p style="text-align: center;">
  <h1 align="center"><a href="javascript:void(0);">vue3-vite-tsx-element-plus-admin</a></h1>
</p>

## 开发环境

- node 14.21.0+

## 简介

当前项目采用 vue3 + vite + element-plus + tsx + decorators + tailwindcss 构建 admin 管理员后台页面

### 欢迎大家加入一起完善这个项目，让它更加完善

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
for (const iconName in ElIconsData) {
  app.component(`i-${iconName}`, ElIconsData[iconName]); // 注意自己别名 i-
}
```

2. 使用

```ts
<el-button type="primary" icon="i-Search">
  Search
</el-button>
<el-icon size={"20"}>
  <i-Edit />
</el-icon>
```

## tsx 插槽使用

```html
<el-sub-menu index="2" v-slots={{ title: () => "Workspace" }}></el-sub-menu>
```

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
