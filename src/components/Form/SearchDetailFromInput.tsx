import React, { VFC, useState } from 'react';
import { Formik, useFormik } from 'formik';

import { Button, ButtonProps, Box, BoxProps, Grid } from '@mui/material';

import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';

import { Formik as FormikProps } from '../types';

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
  enabled?: boolean;
};

export type SearchDetailFromInputProps = BoxProps & {
  keys?: KeyItem[];
  formik: FormikProps;
};

export const SearchDetailFromInput: VFC<SearchDetailFromInputProps> = ({
  keys = [
    {
      label: 'ミッション名',
      value: 'name',
      enabled: false,
    },
  ],
  sx,
  ...props
}) => {
  const render = (_formik: any) => {
    const mode: SearchMode = GetSearchMode(_formik.values.mode);
    console.log('mode', mode);
    const v1enabled = mode.nValues >= 1;
    const v2enabled = mode.nValues >= 2;
    return (
      <Grid container sx={sx}>
        <Grid
          item
          xs={v1enabled ? 6 : 5}
          md={v1enabled ? 2 : 5}
          sx={{
            pl: 1,
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
          xs={v1enabled ? 6 : 5}
          md={v1enabled ? 2 : 5}
          sx={{
            pl: 1,
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
        {v1enabled && (
          <Grid
            item
            xs={v2enabled ? 12 : 10}
            md={v2enabled ? 3 : 6}
            sx={{
              pl: 1,
            }}
          >
            <FormInput formik={_formik} name="value0" title="Value" />
          </Grid>
        )}
        {v2enabled && (
          <Grid
            item
            xs={v2enabled ? 10 : 12}
            md={v2enabled ? 3 : 6}
            sx={{
              pl: 1,
            }}
          >
            <FormInput formik={_formik} name="value1" title="Value (上限)" />
          </Grid>
        )}
        <Grid
          item
          xs={2}
          sx={{
            pl: 1,
            pb: 0.25,
          }}
        >
          {_formik.values.enabled ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                _formik.setFieldValue('enabled', false);
              }}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              削除
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                if (_formik.values.key && _formik.values.mode) {
                  _formik.setFieldValue('enabled', true);
                  _formik.handleSubmit(_formik.values);
                }
              }}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              追加
            </Button>
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
          enabled: false,
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
