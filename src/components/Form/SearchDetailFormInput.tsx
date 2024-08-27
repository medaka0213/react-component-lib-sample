import React, { VFC, ChangeEvent, useEffect } from 'react';
import { Formik, useField } from 'formik';
import moment from 'moment-timezone';
import * as Yup from 'yup';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import HistoryIcon from '@mui/icons-material/History';

import { Button, Box, BoxProps, Grid } from '@mui/material';

import { SearchItem } from '../../utils/query';

import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { Formik as FormikProps } from '../types';
import { SearchModeListDatetime, TimeRange } from '../../models/TimeRange';

import { SearchMode, SearchModeList, GetSearchMode } from '../../utils/query';

export type SearchDetailFormInputProps = BoxProps & {
  name: string;
  keys: SearchItem[];
  formik: FormikProps;
  onSubmit?: (values: any) => void;
  onDelete?: (values: any) => void;
  onDatetimeChange?: (values: any) => void;
};

export const SearchDetailFormInput: VFC<SearchDetailFormInputProps> = ({
  keys = [
    {
      label: 'ミッション名',
      value: 'name',
      enabled: false,
      type: 'string',
    },
  ],
  name = '',
  sx,
  onSubmit,
  onDelete,
  onChange,
  onDatetimeChange,
  formik,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const render = (_formik: any) => {
    const mode: SearchMode = GetSearchMode(_formik.values.mode);
    const v1enabled = mode.nValues >= 1;
    const v2enabled = mode.nValues >= 2;
    const key = keys.filter((v) => v.value === _formik.values.key);
    let type = 'string';
    if (key.length > 0) {
      type = key[0].type;
    }
    const ModeList =
      type === 'datetime' ? SearchModeListDatetime : SearchModeList;
    if (type === 'datetime') {
      if (
        ModeList.filter((v) => v.value === _formik.values.mode).length === 0
      ) {
        _formik.setFieldValue('mode', 'WEEK_TEIKI');
        _formik.setFieldValue(
          'value0',
          moment().utc().format('YYYY-MM-DDTHH:mm')
        );
      }
    }

    useEffect(() => {
      if (_formik.values.enabled) {
        _formik.setValues(field.value);
      }
    }, [field.value]);

    return (
      <form onSubmit={_formik.handleSubmit}>
        <Grid container sx={sx}>
          <Grid
            item
            xs={v1enabled ? 6 : 5}
            sm={v1enabled ? 2 : 5}
            sx={{
              pl: 0.25,
            }}
          >
            <FormSelect
              formik={_formik}
              name="key"
              title="Key"
              options={keys}
              disabled={_formik.values.enabled}
            />
          </Grid>
          <Grid
            item
            xs={v1enabled ? 6 : 5}
            sm={v1enabled ? 2 : 5}
            sx={{
              pl: 0.25,
            }}
          >
            <FormSelect
              formik={_formik}
              name="mode"
              title="検索モード"
              options={ModeList.map((v) => ({
                label: v.label || v.value,
                value: v.value,
              }))}
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                let pld = {
                  ..._formik.values,
                  mode: e.target.value,
                };
                if (type === 'datetime') {
                  pld = {
                    ...TimeRange.fromMode(
                      String(pld.value0),
                      pld.mode
                    ).toQueryItem(_formik.values.key),
                    type: 'datetime',
                    ...pld,
                  };
                }
                onChange && (await onChange(pld));
              }}
            />
          </Grid>
          {v1enabled && (
            <Grid
              item
              xs={v2enabled || !_formik.values.enabled ? 12 : 9}
              sm={
                _formik.values.enabled ? (v2enabled ? 3 : 6) : v2enabled ? 4 : 8
              }
              sx={{
                pl: 0.25,
              }}
            >
              <FormInput
                type={type}
                formik={_formik}
                name="value0"
                title="Value"
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  onChange &&
                    (await onChange({
                      ..._formik.values,
                      value0: e.target.value,
                      type,
                    }));
                }}
              />
            </Grid>
          )}
          {v2enabled && (
            <Grid
              item
              xs={v2enabled ? 9 : 12}
              sm={
                _formik.values.enabled ? (v2enabled ? 3 : 6) : v2enabled ? 4 : 8
              }
              sx={{
                pl: 0.25,
              }}
            >
              <FormInput
                type={type}
                formik={_formik}
                name="value1"
                title="Value (上限)"
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  onChange &&
                    (await onChange({
                      ..._formik.values,
                      value1: e.target.value,
                      type,
                    }));
                }}
              />
            </Grid>
          )}
          {_formik.values.enabled && (
            <Grid
              item
              xs={3}
              sm={2}
              sx={{
                pl: 0.25,
                pb: 0.25,
              }}
            >
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
                <DeleteOutlineIcon fontSize="small" />
                削除
              </Button>
            </Grid>
          )}
          {type === 'datetime' && (
            <>
              <Grid
                item
                xs={3}
                sm={2}
                sx={{
                  pl: 0.25,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: '100%',
                  }}
                  onClick={async () => {
                    let pld = TimeRange.fromMode(
                      _formik.values.value0,
                      _formik.values.mode
                    ).prev();
                    _formik.setFieldValue('type', type);
                    _formik.setFieldValue('value0', pld.start);
                    _formik.setFieldValue('mode', pld.mode);
                    onDatetimeChange &&
                      (await onDatetimeChange({
                        ..._formik.values,
                        value0: pld.start,
                        mode: pld.mode,
                        type: 'datetime',
                      }));
                  }}
                >
                  <NavigateBeforeIcon fontSize="small" />前
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sm={8}
                sx={{
                  pl: 0.25,
                }}
              >
                <Button
                  variant="outlined"
                  color="info"
                  sx={{
                    width: '100%',
                  }}
                  onClick={async () => {
                    let pld = TimeRange.fromMode(
                      _formik.values.value0,
                      _formik.values.mode
                    ).now();
                    _formik.setFieldValue('type', type);
                    _formik.setFieldValue('value0', pld.start);
                    _formik.setFieldValue('mode', pld.mode);
                    onDatetimeChange &&
                      (await onDatetimeChange({
                        ..._formik.values,
                        value0: pld.start,
                        mode: pld.mode,
                        type: 'datetime',
                      }));
                  }}
                >
                  <HistoryIcon fontSize="small" />
                  現在時刻で検索
                </Button>
              </Grid>
              <Grid
                item
                xs={3}
                sm={2}
                sx={{
                  pl: 0.25,
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                  onClick={async () => {
                    let pld = TimeRange.fromMode(
                      _formik.values.value0,
                      _formik.values.mode
                    ).next();
                    _formik.setFieldValue('type', type);
                    _formik.setFieldValue('value0', pld.start);
                    _formik.setFieldValue('mode', pld.mode);
                    onDatetimeChange &&
                      (await onDatetimeChange({
                        ..._formik.values,
                        value0: pld.start,
                        mode: pld.mode,
                        type: 'datetime',
                      }));
                  }}
                >
                  次
                  <NavigateNextIcon fontSize="small" />
                </Button>
              </Grid>
            </>
          )}
          {!_formik.values.enabled && (
            <Grid
              item
              xs={12}
              sx={{
                pl: 0.25,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  _formik.setFieldValue('type', type);
                  _formik.handleSubmit(_formik.values);
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  py: 1.5,
                }}
              >
                <AddIcon fontSize="small" />
                検索条件を追加
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
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
            type: 'string',
          })
        }
        validationSchema={Yup.object().shape({
          key: Yup.string().required('検索キーを入力してください'),
          mode: Yup.string().required('検索モードを入力してください'),
          value0: Yup.string().when('mode', {
            is: (mode: string) => GetSearchMode(mode).nValues >= 1,
            then: Yup.string().required('値を入力してください'),
          }),
          value1: Yup.string().when('mode', {
            is: (mode: string) => GetSearchMode(mode).nValues >= 2,
            then: Yup.string().required('値 (上限) を入力してください'),
          }),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          onSubmit &&
            (await onSubmit({
              ...values,
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
