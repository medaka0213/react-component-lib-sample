import React, { VFC, useState } from 'react';
import { Formik, useFormik } from 'formik';

import { Button, ButtonProps, Box, BoxProps, Grid } from '@mui/material';

import { FormGrid } from './FormGrid';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

import {
  SearchMode,
  SearchModeList,
  ParamToSeachMode,
  GetSearchMode,
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
  keys = [
    {
      label: 'ミッション名',
      value: 'name',
    },
  ],
  ...props
}) => {
  const render = (_formik: any) => {
    const mode: SearchMode = GetSearchMode(_formik.values.mode);
    console.log('mode', mode);
    return (
      <Grid container>
        <Grid
          item
          xs={6}
          md={2}
          sx={{
            pl: 1,
            mb: 1,
          }}
        >
          <FormSelect
            formik={_formik}
            name="key"
            title="Key"
            selectItems={keys}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={2}
          sx={{
            pl: 1,
            mb: 1,
          }}
        >
          <FormSelect
            formik={_formik}
            name="mode"
            title="検索モード"
            selectItems={SearchModeList.map((v) => ({
              label: v.label,
              value: v.value,
            }))}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            pl: 1,
            mb: 1,
          }}
        >
          {mode.nValues >= 1 ? (
            <FormInput formik={_formik} name="value0" title="Value" />
          ) : (
            <div />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            pl: 1,
            mb: 1,
          }}
        >
          {mode.nValues >= 2 ? (
            <FormInput formik={_formik} name="value1" title="Value (上限)" />
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
    );
  };

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
        onChange={async (values: any) => {
          console.log('values', values);
        }}
      >
        {(formik) => render(formik)}
      </Formik>
    </Box>
  );
};
