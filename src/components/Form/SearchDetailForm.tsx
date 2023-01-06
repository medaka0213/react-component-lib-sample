import React, { VFC, useState } from 'react';
import { Formik, useFormik } from 'formik';

import { Button, ButtonProps, Box, BoxProps, Grid } from '@mui/material';

import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { FormGrid } from './FormGrid';
import { SearchDetailFormInput } from './SearchDetailFormInput';

import { Formik as FormikProps } from '../types';

import {
  SearchMode,
  SearchModeList,
  ParamToSeachMode,
  GetSearchMode,
} from '../../utils/query';

export type SearchItems = {
  label?: string;
  value: any;
  divider?: boolean;
  type: 'number' | 'string' | 'datetime';
  enabled?: boolean;
};

export type KeyItem = {
  key: string;
  value0: string | number;
  value1: string | number;
  enabled: false;
};

export type SearchDetailFromProps = BoxProps & {
  keys?: SearchItems[];
  queries?: KeyItem[];
};

export const SearchDetailForm: VFC<SearchDetailFromProps> = ({
  keys = [
    {
      label: 'ミッション名',
      value: 'name',
      enabled: false,
    },
    {
      label: 'ロケット',
      value: 'rocket',
      enabled: false,
    },
  ],
  queries = [],
  sx,
  ...props
}) => {
  const render = (formik: any) => {
    // q.key === k.value が true になるものを除外する
    const restKeys: any[] = keys.filter((k: any) => {
      return (
        formik.values.queries.filter((q: any) => {
          return q.key === k.value;
        }).length === 0
      );
    });
    return (
      <>
        {formik.values.queries.map((q: any, i: number) => {
          return (
            <SearchDetailFormInput
              keys={[q, ...restKeys]}
              name={'queries[' + i + ']'}
              formik={formik}
              sx={{ mb: 1 }}
            />
          );
        })}
        <Box sx={{ mb: 1, borderBottom: '1px solid #ccc' }} />
        <SearchDetailFormInput
          keys={restKeys}
          name="new_queriy"
          onSubmit={(v: any) => {
            console.log('v', v);
            console.log('formik', formik);
            formik.setFieldValue(
              'queries[' + formik.values.queries.length + ']',
              v
            );
          }}
          formik={formik}
          sx={{ mb: 1 }}
        />
      </>
    );
  };

  return (
    <Box {...props}>
      <Formik
        initialValues={{
          queries,
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
