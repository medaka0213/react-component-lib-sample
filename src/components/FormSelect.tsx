import React, { ReactNode, VFC } from "react";

import { Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@mui/material";

import { FormProps } from "./types";

export type SelectItem = {
  label?: string
  value: any
  divider?: boolean
}

export type FormSelectProps =  FormProps & {
  variant: "outlined" | "filled" | "standard"
  selectItems: SelectItem[]
}

export const FormSelect: VFC<FormSelectProps> = ({
  color = "primary",
  variant = "filled",
  name,
  title = "",
  selectItems = [],
  formik: { values={}, errors={}, handleChange },
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
        onChange={async (e:any, child: ReactNode)=> await handleChange(e)}
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
