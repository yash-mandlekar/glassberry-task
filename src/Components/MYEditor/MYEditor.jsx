import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const MYEditor = ({product_description,setform}) => {

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={product_description}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setform({ ...setform, product_description: data });
        }}
      />
    </>
  );
};

export default MYEditor;
