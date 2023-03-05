import React, { ReactNode, ChangeEvent } from 'react';

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
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (v: any) => Promise<any>;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
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
