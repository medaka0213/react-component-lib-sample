import React, { ReactNode } from 'react';

export type Color =
  | 'primary'
  | 'error'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning';

type ChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};

export type Formik = {
  values: any;
  errors: any;
  handleChange: (e: ChangeEvent) => void;
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
  formik?: Formik;
  placeholder?: string;
};
