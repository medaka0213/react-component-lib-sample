import React, { VFC, useState } from "react";
import Button from "@mui/material/Button";

export type SubmitButtonProps = {
  color?: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  children?: any
  onClick?: any
  variant: "contained" | "outlined"
  sx?: any
  disabled?: boolean
}

export const SubmitButton: VFC<SubmitButtonProps> = ({
  children,
  onClick,
  variant = "contained",
  sx,
  disabled,
  color="primary"
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const _onClick = async () => {
    setIsSubmitting(true);
    if (onClick) await onClick();
    setIsSubmitting(false);
  };

  return (
    <Button
      disabled={isSubmitting || disabled}
      onClick={_onClick}
      variant={variant}
      sx={{
        width: "100%",
        ...sx,
      }}
      color={color}
    >
      {isSubmitting ? "loading..." : children || "Submit"}
    </Button>
  );
};
