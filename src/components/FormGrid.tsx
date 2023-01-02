import React, { VFC } from "react";
import { Grid, Box, BoxProps } from "@mui/material";
import { SubmitButton } from "./SubmitButton";

import { FormProps, Color } from "./types";

export type FormGridProps = FormProps & {
  color: Color;
  childrenSx: any
  childrenList: any[][]
  buttonLabel: string
  buttonPosition: "top" | "bottom"
}

export const FormGrid:VFC<FormGridProps> = ({
  color="primary",
  sx,
  childrenList = [[]],
  childrenSx,
  children,
  buttonLabel = "Submit",
  disabled = false,
  buttonPosition = "bottom",
  formik: { handleSubmit, errors = {}, values={}, ...formik } = {},
}) => {
  const Button = () => (
    <SubmitButton
      color={color}
      disabled={disabled || !errors}
      onClick={async ()=>handleSubmit && await handleSubmit(values)}
      variant="contained"
    >
      {buttonLabel}
    </SubmitButton>
  );

  let _childrenList = childrenList;
  if (buttonPosition === "bottom") {
    _childrenList = _childrenList.concat([[<Button />]]);
  } else {
    _childrenList = [[<Button />]].concat(_childrenList);
  }

  return (
    <Box
      sx={{
        width: "100%",
        my: 2,
        ...sx,
      }}
    >
      <Grid container>
        {buttonPosition === "top" &&
          Object.keys(errors).map((k) => (
            <Box
              sx={{
                width: "100%",
                color: "error.main",
              }}
            >
              入力検証エラー: {errors[k]}
            </Box>
          ))}
        {_childrenList.map((childrenRow, i) => (
          <>
            {childrenRow.map((child, j) => (
              <Grid key={j} xs={12} sm={Number(12 / childrenRow.length)}>
                <Box
                  sx={{
                    pr: 1,
                    mb: 1,
                    ...childrenSx,
                  }}
                >
                  {child}
                </Box>
              </Grid>
            ))}
          </>
        ))}
        <Box sx={{ width: "100%" }}>{children}</Box>
        {buttonPosition === "bottom" &&
          Object.keys(errors).map((k) => (
            <Box
              sx={{
                width: "100%",
                color: "error.main",
              }}
            >
              入力検証エラー: {errors[k]}
            </Box>
          ))}
      </Grid>
    </Box>
  );
};
