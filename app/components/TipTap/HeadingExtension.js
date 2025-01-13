import BaseHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

const Heading = BaseHeading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level || 1;
    const classes = {
      1: "text-2xl font-nunito font-extrabold tracking-wide text-textColor",
      2: "text-xl font-nunito font-extrabold tracking-wide text-textColor",
      3: "text-lg font-nunito font-extrabold tracking-wide text-textColor",
      4: "text-base font-nunito font-extrabold tracking-wide text-textColor",
      5: "text-sm font-nunito font-extrabold tracking-wide text-textColor",
      6: "text-xs font-nunito font-extrabold tracking-wide text-textColor",
    };

    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, {
        class: classes[level] || "",
      }),
      0,
    ];
  },
});

export default Heading;
