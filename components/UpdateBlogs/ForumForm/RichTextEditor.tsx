// components/RichTextEditor.tsx
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  classname: string;
  placeholders: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  classname,
  placeholders,
}) => {
  return (
    <QuillNoSSRWrapper
      className={classname}
      placeholder={placeholders}
      value={value}
      onChange={onChange}
    />
  );
};

export default RichTextEditor;
