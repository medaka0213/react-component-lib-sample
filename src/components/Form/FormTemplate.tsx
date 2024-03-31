import React, { VFC } from 'react';

import { FormProps, Color } from '../types';
import { FormInput, FormInputProps } from './FormInput';
import { FormGrid } from './FormGrid';

export type FormTemplateProps = FormProps & {
  childrenSx?: any;
  childrenList: FormInputProps[][];
  buttonLabel?: string;
  buttonPosition?: 'top' | 'bottom';
  buttonEnabled?: boolean;
  xs?: number;
  errorMessage?: string;
};

const App: VFC<FormTemplateProps> = ({
  childrenList = [[]],
  formik,
  errorMessage,
  ...props
}) => {
  return (
    <FormGrid
      {...props}
      formik={formik}
      errorMessage={errorMessage}
      childrenList={childrenList.map((children, i) =>
        children.map((child, j) => {
          // formik は FormInputProps側の値を上書きする
          return <FormInput {...child} formik={formik} key={`${i}_${j}`} />;
        })
      )}
    />
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const FormTemplate = (props: FormTemplateProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);

export default App;
