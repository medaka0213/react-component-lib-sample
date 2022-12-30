import React, { VFC } from "react";
import { connect, FormikProps } from "formik";

import { Select, InputLabel, MenuItem, FormControl, FormHelperText, BoxProps } from "@mui/material";

export type SelectItem = {
  label?: string
  value: any
  divider?: boolean
}

export type FormSelectProps = BoxProps & {
  color: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  name: string;
  title: string;
  variant: "outlined" | "filled" | "standard"
  onChange: any;
  disabled: boolean;
  formik: any;
  selectItems: SelectItem[]
}

export const FormSelect: VFC<FormSelectProps> = ({
  color = "primary",
  variant = "filled",
  name,
  title = "",
  selectItems = [],
  formik: { values={}, errors={}, handleChange, handleBlur },
}) => {
  console.log(selectItems);
  return (
    <FormControl fullWidth variant={variant} color={color}>
      <InputLabel id={name + "-label"}>{title}</InputLabel>
      <Select
        labelId={name + "-label"}
        id={name}
        value={values[name]}
        label={title || name}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
      >
        {selectItems.map((item, index) => (
          <MenuItem key={index} value={item.value} divider={item.divider}>
            {item.label || item.value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{errors[name]}</FormHelperText>
    </FormControl>
  );
};
