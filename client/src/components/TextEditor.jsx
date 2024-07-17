import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { ENDPOINT } from "../App";

const TextEditor = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("Type something...");
  const [alert, setAlert] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        upload: (file) => uploadImage(file),
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`${ENDPOINT}/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { src: response.data.imageUrl };
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  };

  const addLink = () => {
    const url = prompt("Enter the link URL:", "");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${ENDPOINT}/send-newsletter`, {
        subject: subject,
        body: content,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
        setAlert({
          type: "success",
          message: "Newsletter sent successfully!",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setAlert({
          type: "error",
          message: "Error sending newsletter. Please try again.",
        });
      });
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head>
            <title>Preview</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <h1>${subject}</h1>
            <div>${content}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this website.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      {alert && (
        <div
          className={`alert ${
            alert.type === "success"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-red-100 border-red-500 text-red-700"
          } border-l-4 p-4 mb-4`}
          role="alert"
        >
          <p className="font-bold">
            {alert.type === "success" ? "Success" : "Error"}
          </p>
          <p>{alert.message}</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Subject
        </label>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-2 border-b-0 rounded-t w-full focus:outline-none"
          required
        />
      </div>
      <div className="toolbar mb-4 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Strike
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Ordered List
        </button>
        <button
          onClick={addLink}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Add Link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Remove Link
        </button>
        <button
          onClick={handlePreview}
          type="button"
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          Preview
        </button>
      </div>
      <div className="p-4 bg-gray-100 rounded-md h-80">
        <EditorContent editor={editor} />
      </div>
      <button
        type="submit"
        className="p-2 mt-4 border rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Send Newsletter
      </button>
    </form>
  );
};

export default TextEditor;
