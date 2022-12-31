import React, { VFC, useState, useRef } from "react";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import Box, {BoxProps} from "@mui/material/Box";
import { SubmitButton } from "./SubmitButton";
import { BaseModel } from "../models/baseModel";
import { Event } from "../models/event";

export type FileInputProps = BoxProps & {
  color: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  title?:string;
  name: string;
  onChange: any;
  disabled: boolean;
  formik: any
}

export const FileInput:VFC<FileInputProps> = ({
  color = "primary",
  title,
  name = "",
  onChange,
  disabled = false,
  children,
  formik: { values, handleChange, handleBlur },
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<string>("");

  const clickFileUploadButton = () => {
    if(inputRef.current){
      inputRef.current.click()
    }
  };

  console.log(new BaseModel({
    pk: "base_XXXX",
    sk: "base_item",
  }).itemDetailPath())


  console.log(new Event({
    pk: "base_XXXX",
    sk: "base_item",
    attr: "aaa"
  }))


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
        {file ? `選択中: ${file}` : title || "ファイルを選択"}
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
