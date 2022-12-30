import React, { VFC, useState, useRef } from "react";
import { connect, FormikProps } from "formik";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box from "@mui/material/Box";
import { SubmitButton } from "./SubmitButton";

export type FileInputProps = {
  color: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  title?:string;
  name: string;
  onChange: any;
  disabled: boolean;
  children: any;
  formik: any;
}

export const FileInputApp:VFC<FileInputProps> = ({
  color = "primary",
  title,
  name = "",
  onChange,
  disabled = false,
  children,
  formik: { values, errors, touched, handleChange, handleBlur },
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string>("");

  const clickFileUploadButton = () => {
    if(inputRef.current){
      inputRef.current.click()
    }
  };

  return (
    <Box>
      <SubmitButton
        color={color}
        disabled={isLoading}
        onClick={clickFileUploadButton}
        variant="outlined"
        sx={{
          textTransform: "none",
        }}
      >
        <UploadFileIcon />
        {file ? `選択中: ${file}` : "ファイルを選択"}
      </SubmitButton>
      <input
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          setIsLoading(true);
          if (handleChange) await handleChange(e);
          if (onChange) await onChange(e);
          setFile(e.target.value);
          setIsLoading(false);
        }}
        id={name}
        disabled={disabled}
        name={name}
        onBlur={handleBlur}
        value={values[name]}
        hidden
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="file"
      />
      {children}
    </Box>
  );
};

export const FileInput = connect(FileInputApp);
