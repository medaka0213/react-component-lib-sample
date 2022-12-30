import React, { VFC, useState } from "react";
import { connect, FormikProps } from "formik";

import { FilledInput, BoxProps } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CopyToClipBoard from "react-copy-to-clipboard";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from "@mui/icons-material/Assignment";

export type FormInputProps = BoxProps & {
  color?: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  name: string;
  title?: string
  type?: "text" | "textarea" | "datetime" | "datetime-local" | "number"
  onChange?: any;
  disabled?: boolean;
  rows?: string | number
  placeholder?: string
  copyBytton?: boolean
  formik: any
}

export const FormInput:VFC<FormInputProps> = ({
  color = "primary",
  name = "",
  type = "text",
  title,
  rows = "10",
  placeholder = "",
  onChange,
  disabled = false,
  copyBytton = false,
  children,
  formik: { values={}, errors={}, handleChange, handleBlur },
}) => {
  const [openTip, setOpenTip] = useState(false);
  const handleClickButton = () => {
    setOpenTip(true);
  };

  return (
    <FormControl color={color} variant={"filled"} fullWidth focused>
      <InputLabel htmlFor={name}>{title || name}</InputLabel>
      <FilledInput
        color={color}
        id={name}
        disabled={disabled}
        type={type}
        name={name}
        onChange={async (e) => {
          if (handleChange) await handleChange(e);
          if (onChange) await onChange(e);
          setOpenTip(false);
        }}
        onBlur={handleBlur}
        value={values[name] || ""}
        defaultValue={values[name] || ""}
        rows={rows}
        placeholder={placeholder}
        style={{
          verticalAlign: "middle",
          position: "relative",
        }}
        multiline={type === "textarea"}
        maxRows={type === "textarea" ? rows : 1}
        endAdornment={
          copyBytton && (
            <InputAdornment position="end">
              <CopyToClipBoard text={values[name] || ""}>
                <IconButton
                  disabled={values[name] === ""}
                  onClick={handleClickButton}
                >
                  <AssignmentIcon color={openTip ? "disabled" : color} />
                </IconButton>
              </CopyToClipBoard>
            </InputAdornment>
          )
        }
      />
      <FormHelperText error>{errors[name]}</FormHelperText>
      {children}
    </FormControl>
  );
};
