export const plugins = [
  "advlist anchor autolink autoresize autosave charmap code codesample\
      directionality emoticons fullscreen help hr image imagetools insertdatetime\
      link lists media nonbreaking noneditable pagebreak paste preview print save\
      searchreplace tabfocus table template textpattern visualblocks visualchars wordcount",
];

// Here is the list of toolbar control components
// Details see: https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
export const toolbar = [
  { name: "history", items: ["undo", "redo"] },

  {
    name: "formatting",
    items: ["bold", "italic", "underline", "strikethrough"],
  },
  { name: "styles", items: ["fontselect", "fontsizeselect", "formatselect"] },
  {
    name: "alignment",
    items: ["alignleft", "aligncenter", "alignright", "alignjustify"],
  },
  { name: "color", items: ["forecolor", "backcolor"] },
  { name: "insert", items: ["insertdatetime", "table"] },
  { name: "list", items: ["numlist", "bullist"] },
  { name: "search", items: ["searchreplace"] },
  { name: "indentation", items: ["outdent", "indent"] },
  { name: "split", items: ["hr", "pagebreak", "blockquote"] },
  { name: "icon", items: ["emoticons", "charmap"] },
  { name: "view", items: ["preview", "save", "print"] },
  {
    name: "file",
    items: ["image", "media", "link"],
  },
  { name: "code", items: ["code", "codesample", "anchor"] },
  { name: "fullscreen", items: ["fullscreen"] },
];
