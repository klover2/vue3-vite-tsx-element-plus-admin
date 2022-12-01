export interface IDefaultSettings {
  watermark_txt?: string; // 文本
  watermark_x?: number; // 水印起始位置x轴坐标
  watermark_y?: number; // 水印起始位置Y轴坐标
  watermark_rows?: number; // 水印行数
  watermark_cols?: number; // 水印列数
  watermark_x_space?: number; // 水印x轴间隔
  watermark_y_space?: number; // 水印y轴间隔
  watermark_color?: string; // 水印字体颜色
  watermark_alpha?: number; // 水印透明度
  watermark_fontsize?: string; // 水印字体大小
  watermark_font?: string; // 水印字体
  watermark_width?: number; // 水印宽度
  watermark_height?: number; // 水印长度
  watermark_angle?: number; // 水印倾斜度数
  watermark_position?: string; // 水印的position
  watermark_z_index?: number; // 水印的z_index
}
/**
 * [nodeWatermark 在某元素上添加水印]
 * @param  {[type]} settings           [水印配置]
 * @param  {String} operator_node_name [被添加水印的元素，默认 #body]
 * @return {[type]}                    [description]
 */
export default (
  settings: IDefaultSettings,
  operator_node_name = "#body"
): any => {
  const operator_node = document.querySelector(operator_node_name);
  if (!operator_node) {
    return false;
  }

  // 默认设置
  const defaultSettings = {
    watermark_txt: "text",
    watermark_x: 20, // 水印起始位置x轴坐标
    watermark_y: 20, // 水印起始位置Y轴坐标
    watermark_rows: 20, // 水印行数
    watermark_cols: 20, // 水印列数
    watermark_x_space: 100, // 水印x轴间隔
    watermark_y_space: 50, // 水印y轴间隔
    watermark_color: "red", // 水印字体颜色
    watermark_alpha: 0.7, // 水印透明度
    watermark_fontsize: "15px", // 水印字体大小
    watermark_font: "微软雅黑", // 水印字体
    watermark_width: 210, // 水印宽度
    watermark_height: 80, // 水印长度
    watermark_angle: 15, // 水印倾斜度数
    watermark_position: "absolute", // 水印的position
    watermark_z_index: 9999, // 水印的z_index
  };
  if (typeof settings === "object") {
    Object.assign(defaultSettings, settings);
  }
  const oTemp = document.createDocumentFragment();

  // 获取页面最大宽度
  const page_width = Math.max(
    operator_node.scrollWidth,
    operator_node.clientWidth
  );
  // var cutWidth = page_width*0.0150;
  // var page_width=page_width-cutWidth;
  // 获取页面最大高度
  const page_height = Math.max(
    operator_node.scrollHeight,
    operator_node.clientHeight
  );
  // var page_height = document.body.scrollHeight+document.body.scrollTop;
  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (
    +defaultSettings.watermark_cols === 0 ||
    parseInt(
      String(
        defaultSettings.watermark_x +
          defaultSettings.watermark_width * defaultSettings.watermark_cols +
          defaultSettings.watermark_x_space *
            (defaultSettings.watermark_cols - 1)
      )
    ) > page_width
  ) {
    defaultSettings.watermark_cols = parseInt(
      String(
        (page_width -
          defaultSettings.watermark_x +
          defaultSettings.watermark_x_space) /
          (defaultSettings.watermark_width + defaultSettings.watermark_x_space)
      )
    );
    defaultSettings.watermark_x_space = parseInt(
      String(
        (page_width -
          defaultSettings.watermark_x -
          defaultSettings.watermark_width * defaultSettings.watermark_cols) /
          (defaultSettings.watermark_cols - 1)
      )
    );
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (
    +defaultSettings.watermark_rows === 0 ||
    parseInt(
      String(
        defaultSettings.watermark_y +
          defaultSettings.watermark_height * defaultSettings.watermark_rows +
          defaultSettings.watermark_y_space *
            (defaultSettings.watermark_rows - 1)
      )
    ) > page_height
  ) {
    defaultSettings.watermark_rows = parseInt(
      String(
        (defaultSettings.watermark_y_space +
          page_height -
          defaultSettings.watermark_y) /
          (defaultSettings.watermark_height + defaultSettings.watermark_y_space)
      )
    );
    defaultSettings.watermark_y_space = parseInt(
      String(
        (page_height -
          defaultSettings.watermark_y -
          defaultSettings.watermark_height * defaultSettings.watermark_rows) /
          (defaultSettings.watermark_rows - 1)
      )
    );
  }
  let x;
  let y;
  for (let i = 0; i < defaultSettings.watermark_rows; i++) {
    y =
      defaultSettings.watermark_y +
      (defaultSettings.watermark_y_space + defaultSettings.watermark_height) *
        i;
    for (let j = 0; j < defaultSettings.watermark_cols; j++) {
      x =
        defaultSettings.watermark_x +
        (defaultSettings.watermark_width + defaultSettings.watermark_x_space) *
          j;

      const mask_div: any = document.createElement("div");
      mask_div.id = "mask_div" + i + j;
      mask_div.className = "mask_div";
      mask_div.appendChild(
        document.createTextNode(defaultSettings.watermark_txt)
      );
      // 设置水印div倾斜显示
      mask_div.style.webkitTransform =
        "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.MozTransform =
        "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.msTransform =
        "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.OTransform =
        "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.transform =
        "rotate(-" + defaultSettings.watermark_angle + "deg)";
      mask_div.style.visibility = "";
      mask_div.style.position = defaultSettings.watermark_position;
      mask_div.style.left = x + "px";
      mask_div.style.top = y + "px";
      mask_div.style.overflow = "hidden";
      mask_div.style.zIndex = defaultSettings.watermark_position;
      mask_div.style.pointerEvents = "none"; // pointer-events:none  让水印不遮挡页面的点击事件
      // mask_div.style.border="solid #eee 1px";
      mask_div.style.opacity = defaultSettings.watermark_alpha;
      mask_div.style.fontSize = defaultSettings.watermark_fontsize;
      mask_div.style.fontFamily = defaultSettings.watermark_font;
      mask_div.style.color = defaultSettings.watermark_color;
      mask_div.style.textAlign = "center";
      mask_div.style.width = defaultSettings.watermark_width + "px";
      mask_div.style.height = defaultSettings.watermark_height + "px";
      mask_div.style.lineHeight = defaultSettings.watermark_height + "px";
      mask_div.style.display = "block";
      oTemp.appendChild(mask_div);
    }
  }
  // 删除旧的水印
  const old_oTemp = document.querySelectorAll(".mask_div");
  if (old_oTemp && old_oTemp.length > 0) {
    old_oTemp.forEach((node) =>
      node.parentNode ? node.parentNode.removeChild(node) : null
    );
  }
  operator_node.appendChild(oTemp);
  /* eslint-disable */
};
