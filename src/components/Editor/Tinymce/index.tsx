import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import TinymceEditor from "@tinymce/tinymce-vue";
import { plugins, toolbar } from "./config";

// 文档 https://www.jianshu.com/p/59a9c3802443

@Options({
  name: "Tinymce",
})
export default class extends Vue {
  initOptions = {
    // base_url: '/tinymce',
    language: "zh_CN",
    // language_url: '/tinymce/langs/zh_CN.js',
    // skin_url: '/tinymce/skins/ui/animal',
    skin: "animal",
    content_css: "animal",
    body_class: "panel-body",
    height: "350", // 注：引入autoresize插件时，此属性失效
    min_height: "350",
    // menubar: menubar,
    plugins: plugins,
    toolbar: toolbar,
    toolbar_sticky: true,
    toolbar_mode: "wrap", // 'sliding'
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }, image: {max-width: 100%;}",
    branding: false, // tiny技术支持信息是否显示
    // resize: false,
    link_title: false,
    default_link_target: "_blank",
    convert_urls: false,
    end_container_on_empty_block: true,
    imagetools_cors_hosts: ["106.54.168.208:1016"],
    init_instance_callback: (editor: any) => {
      // // tinymce 实例初始化时的回调
      // if (props.moduleValue) {
      //   editor.setContent(props.modelValue);
      // }
      // hasInit.value = true;
      // editor.on("NodeChange Change KeyUp SetContent", () => {
      //   hasChange.value = true;
      //   emit("update:modelValue", editor.getContent());
      // });
    },
    image_title: true,
    // #参考 https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
    //   file_picker_callback: filePickerCallback, // 选择文件后的处理
    // images_upload_url: apiUrl + '/admin/single/upload',
    // #参考 https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    //   images_upload_handler: uploadHandler, // 自定义文件上传函数
    setup: (editor: any) => {
      // tinymce 实例渲染之前的回调
      // editor.on("FullscreenStateChanged", (e: any) => {
      //   fullscreen.value = e.state;
      // });
    },
  };
  /**
   * render
   */
  public render(): JSX.Element {
    const { initOptions } = this;
    const contentValue = "";

    return (
      <>
        <TinymceEditor
          id="tinymceId"
          initialValue="<p>Initial editor content</p>"
          v-model={contentValue}
          init={initOptions}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
        />
      </>
    );
  }
}
