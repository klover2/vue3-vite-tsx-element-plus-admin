import jss, { createGenerateId, Jss, StyleSheet } from "jss";
import preset from "jss-preset-default";

jss.setup({ ...preset(), createGenerateId });

const styleCache: Map<string, StyleSheet> = new Map();

export const useJSS: Jss["createStyleSheet"] = (styles) => {
  const key = JSON.stringify(styles);
  const cached = styleCache.get(key);
  if (cached) return cached;

  const sheet = jss.createStyleSheet(styles).attach();

  styleCache.set(key, sheet);

  return sheet;
};

/** Usage */
/**
  import { useJSS } from "@/plugins/jss";
  const style = {
    customClass: {
      color: "red"
    }
  };
  const { classes } = useJSS(style);
  <div class={classes.customClass}>Red</div>
*/
