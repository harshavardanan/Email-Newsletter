import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import Quill from "quill";
// import ImageResize from "quill-image-resize-module";

// Register the image resize module with Quill
//Quill.register("modules/imageResize", ImageResize);

const Editor = ({ value, content }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["color", "script", "video"],
    ],
    // imageResize: {
    //   displaySize: true,
    // },
  };

  return <ReactQuill modules={modules} value={value} onChange={content} />;
};

export default Editor;
