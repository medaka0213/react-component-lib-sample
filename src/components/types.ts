import React, { ReactNode } from 'react';

export type Color =
  | 'primary'
  | 'error'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning';

export type Formik = {
  values: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (v: any) => Promise<any>;
};

export type CommonProps = {
  sx?: any;
  children?: ReactNode;
};

export type FormProps = CommonProps & {
  color?: Color;
  title?: string;
  name?: string;
  onChange?: any;
  disabled?: boolean;
  formik: Formik;
  placeholder?: string;
};
