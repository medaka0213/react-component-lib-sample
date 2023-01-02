import React, { VFC, useState } from 'react';
import { Formik, useFormik } from 'formik';

import { Button, ButtonProps, Box, BoxProps } from '@mui/material';

import { FormGrid } from './FormGrid';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

import {
  SearchMode,
  SearchModeList,
  ParamToSeachMode,
} from '../../utils/query';

export type KeyItem = {
  label?: string;
  value: any;
  divider?: boolean;
  type: 'number' | 'string' | 'datetime';
};

export type SeachDetailFromProps = BoxProps & {
  keys?: KeyItem[];
};

export const SeachDetailFrom: VFC<SeachDetailFromProps> = ({
  keys = [],
  ...props
}) => {
  const render = (_formik: any) => (
    <FormGrid
      formik={_formik}
      childrenList={[
        [
          <FormSelect
            formik={_formik}
            name="key"
            title="Key"
            selectItems={keys}
          />,
          <FormSelect
            formik={_formik}
            name="mode"
            title="検索モード"
            selectItems={SearchModeList.map((v) => ({
              label: v.label + ' (' + v.value + ')',
              value: v.value,
            }))}
          />,
          <FormInput formik={_formik} name="value0" title="Value" />,
          <FormInput formik={_formik} name="value1" title="Value (上限)" />,
        ],
      ]}
    />
  );
  return (
    <Box {...props}>
      <Formik
        initialValues={{
          key: '',
          value0: '',
          value1: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {(formik) => render(formik)}
      </Formik>
      ;
    </Box>
  );
};
