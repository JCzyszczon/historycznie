import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "./HeadingExtension";
import { BubbleMenu } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import Blockquote from "@tiptap/extension-blockquote";
import ImageResize from "tiptap-extension-resize-image";
import { BsBlockquoteRight } from "react-icons/bs";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaArrowLeft,
  FaImage,
  FaParagraph,
} from "react-icons/fa6";
import { IoReturnUpBack, IoReturnUpForward } from "react-icons/io5";
import Button from "../elements/Button";
import { useRouter } from "next/navigation";

const TipTapEditor = ({ content, onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading,
      Document,
      Image,
      Color,
      Text,
      TextStyle,
      ImageResize,
      Blockquote,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: content || "",
  });

  const handleSave = () => {
    if (editor) {
      onSave(editor.getJSON());
    }
  };

  const router = useRouter();

  return (
    <section className='w-full flex flex-col bg-background2 justify-center items-center min-h-dvh px-2 py-20 relative'>
      {editor && (
        <section className='fixed drop-shadow-xl left-1/2 -translate-x-1/2 z-[100000] top-5 w-auto bg-background flex justify-center items-center gap-8 rounded-2xl px-4 py-2'>
          <section className='flex justify-center items-center gap-2'>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className='bg-background2 px-2 py-1 border border-borderColor rounded-lg'
            >
              <IoReturnUpBack className='text-xl' />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className='bg-background2 px-2 py-1 border border-borderColor rounded-lg'
            >
              <IoReturnUpForward className='text-xl' />
            </button>
          </section>
          <section className='flex justify-center items-center gap-2'>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`${
                editor.isActive("paragraph")
                  ? "bg-primaryColor text-background"
                  : "bg-background2 text-textColor"
              } border border-borderColor rounded-lg text-xl px-2 py-1`}
            >
              <FaParagraph />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H3
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 4 }).run()
              }
              className={
                editor.isActive("heading", { level: 4 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H4
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 5 }).run()
              }
              className={
                editor.isActive("heading", { level: 5 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H5
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setHeading({ level: 6 }).run()
              }
              className={
                editor.isActive("heading", { level: 6 })
                  ? "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-[15px] px-2 py-1 bg-background2 text-textColor"
              }
            >
              H6
            </button>
          </section>
          <section className='flex justify-center items-center gap-2'>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" })
                  ? "border border-borderColor rounded-lg text-xl px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-xl px-2 py-1 bg-background2 text-textColor"
              }
            >
              <FaAlignLeft className='text-xl' />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" })
                  ? "border border-borderColor rounded-lg text-xl px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-xl px-2 py-1 bg-background2 text-textColor"
              }
            >
              <FaAlignCenter className='text-xl' />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" })
                  ? "border border-borderColor rounded-lg text-xl px-2 py-1 bg-primaryColor text-background"
                  : "border border-borderColor rounded-lg text-xl px-2 py-1 bg-background2 text-textColor"
              }
            >
              <FaAlignRight className='text-xl' />
            </button>
          </section>
          <section className='flex justify-center items-center gap-2'>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${
                editor.isActive("blockquote")
                  ? "bg-primaryColor text-background"
                  : "bg-background2 text-textColor"
              } border border-borderColor rounded-lg text-xl px-2 py-1`}
            >
              <BsBlockquoteRight className='text-xl' />
            </button>
            <button
              onClick={() => {
                const url = prompt("Podaj URL zdjęcia:");
                if (url) editor.chain().focus().setImage({ src: url }).run();
              }}
              className='bg-background2 rounded-lg text-xl border border-borderColor px-2 py-1 text-textColor'
            >
              <FaImage />
            </button>
            <Button
              onClick={handleSave}
              variant='primary'
              className='!py-1 !w-min'
            >
              Zapisz
            </Button>
          </section>
        </section>
      )}
      <section className='w-full max-w-5xl min-h-[700px] h-full rounded-2xl overflow-hidden bg-background px-6 py-12'>
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className='bubble-menu'>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
              >
                Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
              >
                Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}
              >
                Strike
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} className='editor-content' />
      </section>
    </section>
  );
};

export default TipTapEditor;
