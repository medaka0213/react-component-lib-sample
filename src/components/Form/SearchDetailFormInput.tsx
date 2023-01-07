import React, { VFC, useState } from 'react';
import { Formik, useFormik, useField } from 'formik';

import * as Yup from 'yup';
import { requiredString } from '../../utils/schema';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Button, ButtonProps, Box, BoxProps, Grid } from '@mui/material';

import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { Formik as FormikProps } from '../types';

import {
  QueryItem,
  SearchMode,
  SearchModeList,
  ParamToSearchMode,
  GetSearchMode,
} from '../../utils/query';

export type SearchItem = {
  label?: string;
  value: any;
  divider?: boolean;
  type: 'number' | 'string' | 'datetime';
  enabled?: boolean;
};

export type SearchDetailFormInputProps = BoxProps & {
  name: string;
  keys: SearchItem[];
  formik: FormikProps;
  onSubmit?: (values: any) => void;
  onDelete?: (values: any) => void;
};

export const SearchDetailFormInput: VFC<SearchDetailFormInputProps> = ({
  keys = [
    {
      label: 'ミッション名',
      value: 'name',
    },
  ],
  name = '',
  sx,
  onSubmit,
  onDelete,
  onChange,
  formik,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const render = (_formik: any) => {
    const mode: SearchMode = GetSearchMode(_formik.values.mode);
    const v1enabled = mode.nValues >= 1;
    const v2enabled = mode.nValues >= 2;
    return (
      <Grid container sx={sx}>
        <Grid
          item
          xs={v1enabled ? 6 : 5}
          md={v1enabled ? 2 : 5}
          sx={{
            pl: 0.25,
          }}
        >
          <FormSelect
            formik={_formik}
            name="key"
            title="Key"
            selectItems={keys}
            disabled={_formik.values.enabled}
          />
        </Grid>
        <Grid
          item
          xs={v1enabled ? 6 : 5}
          md={v1enabled ? 2 : 5}
          sx={{
            pl: 0.25,
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
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange &&
                (await onChange({
                  ..._formik.values,
                  mode: e.target.value,
                }));
            }}
          />
        </Grid>
        {v1enabled && (
          <Grid
            item
            xs={v2enabled ? 12 : 10}
            md={v2enabled ? 3 : 6}
            sx={{
              pl: 0.25,
            }}
          >
            <FormInput
              formik={_formik}
              name="value0"
              title="Value"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange &&
                  (await onChange({
                    ..._formik.values,
                    value0: e.target.value,
                  }));
              }}
            />
          </Grid>
        )}
        {v2enabled && (
          <Grid
            item
            xs={v2enabled ? 10 : 12}
            md={v2enabled ? 3 : 6}
            sx={{
              pl: 0.25,
            }}
          >
            <FormInput
              formik={_formik}
              name="value1"
              title="Value (上限)"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange &&
                  (await onChange({
                    ..._formik.values,
                    value1: e.target.value,
                  }));
              }}
            />
          </Grid>
        )}
        <Grid
          item
          xs={2}
          sx={{
            pl: 0.25,
            pb: 0.25,
          }}
        >
          {_formik.values.enabled ? (
            <Button
              variant="outlined"
              color="error"
              onClick={async () => {
                onDelete && (await onDelete(_formik.values));
              }}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <DeleteOutlineIcon />
              削除
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                _formik.handleSubmit(_formik.values);
              }}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <AddIcon />
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
        initialValues={
          field.value ||
          (keys.length && {
            key: keys[0].value,
            mode: SearchModeList[0].value,
            enabled: false,
          })
        }
        validationSchema={Yup.object().shape({
          key: requiredString('検索キー'),
          mode: requiredString('検索モード'),
          value0: Yup.string().when('mode', {
            is: (mode: string) => GetSearchMode(mode).nValues >= 1,
            then: requiredString('値'),
          }),
          value1: Yup.string().when('mode', {
            is: (mode: string) => GetSearchMode(mode).nValues >= 2,
            then: requiredString('値 (上限)'),
          }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log('values', values);
          setSubmitting(false);
          onSubmit &&
            (await onSubmit({
              ...values,
              type: keys.filter((v: any) => v.value === values.key)[0].type,
              enabled: true,
            }));
          resetForm({
            values: {
              key: keys.filter((v: any) => v.value !== values.key)[0].value,
              type: keys[0].type,
              mode: values.mode,
              enabled: false,
            },
          });
        }}
        render={render}
      />
    </Box>
  );
};
