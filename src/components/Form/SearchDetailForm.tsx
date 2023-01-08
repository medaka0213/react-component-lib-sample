import React, { VFC, useState } from 'react';
import { Formik, useFormik } from 'formik';

import {
  Typography,
  Button,
  ButtonProps,
  Box,
  BoxProps,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SubmitButton } from './SubmitButton';
import { SearchDetailFormInput, SearchItem } from './SearchDetailFormInput';
import { FormInput } from './FormInput';
import { TimeRange } from '../../models/TimeRange';

import { Formik as FormikProps } from '../types';

import {
  QueryItem,
  SearchMode,
  SearchModeList,
  ParamToSearchMode,
  SearchModeToParam,
  GetSearchMode,
} from '../../utils/query';

export type SearchDetailFromProps = BoxProps & {
  keys?: SearchItem[];
  queries?: QueryItem[];
};

export const SearchDetailForm: VFC<SearchDetailFromProps> = ({
  keys = [
    {
      label: '日時',
      value: 'datetime',
      enabled: false,
      type: 'datetime',
    },
    {
      label: 'ミッション名',
      value: 'name',
      enabled: false,
      type: 'string',
    },
    {
      label: 'ロケット',
      value: 'rocket',
      enabled: false,
      type: 'string',
    },
  ],
  queries = [
    {
      key: 'limit',
      value0: 100,
    },
  ],
  sx,
  ...props
}) => {
  const render = (formik: any) => {
    const restKeys = (query: any = null): SearchItem[] =>
      keys.filter((k: SearchItem) => {
        return (
          formik.values.queries.filter((q: any) => {
            if (query && q.key === query.key) {
              return false;
            }
            return q.key === k.value;
          }).length === 0
        );
      });
    return (
      <>
        <Typography
          variant="body2"
          sx={{ mb: 1, ml: 1, color: 'primary.main' }}
        >
          検索条件
        </Typography>
        {formik.values.queries.map((q: any, i: number) => {
          return (
            <SearchDetailFormInput
              keys={restKeys(q)}
              name={'queries[' + i + ']'}
              formik={formik}
              sx={{ mb: 1 }}
              onChange={(v: any) => {
                //キーがかぶっている場合は上書き
                for (let i = 0; i < formik.values.queries.length; i++) {
                  if (formik.values.queries[i].key === v.key) {
                    formik.setFieldValue('queries[' + i + ']', v);
                  }
                }
              }}
              onDatetimeChange={(v: any) => {
                //キーがかぶっている場合は上書き
                for (let i = 0; i < formik.values.queries.length; i++) {
                  if (formik.values.queries[i].key === v.key) {
                    formik.setFieldValue('queries[' + i + ']', v);
                  }
                }
                //時間が変化した場合はSubmit
                if (v.type === 'datetime') {
                  formik.handleSubmit();
                }
              }}
              onDelete={(v: any) => {
                formik.setFieldValue(
                  'queries',
                  formik.values.queries
                    .slice(0, i)
                    .concat(formik.values.queries.slice(i + 1))
                );
              }}
            />
          );
        })}
        <Box sx={{ my: 1, ml: 0.25 }}>
          <FormInput name="limit" title="検索数の上限" formik={formik} />
        </Box>
        {restKeys().length ? (
          <>
            <Box sx={{ my: 3, borderBottom: '1px solid #ccc' }} />
            <Typography
              variant="body2"
              sx={{ mb: 1, ml: 1, color: 'primary.main' }}
            >
              検索条件を追加する ( [追加] をクリックしてください)
            </Typography>
            <SearchDetailFormInput
              keys={restKeys()}
              name="new_queriy"
              onSubmit={(v: any) => {
                //キーがかぶっている場合は上書き
                for (let i = 0; i < formik.values.queries.length; i++) {
                  if (formik.values.queries[i].key === v.key) {
                    formik.setFieldValue('queries[' + i + ']', v);
                    return;
                  }
                }
                formik.setFieldValue(
                  'queries[' + formik.values.queries.length + ']',
                  v
                );
              }}
              formik={formik}
              sx={{ mb: 1 }}
            />
          </>
        ) : (
          <Typography variant="body2" sx={{ mb: 1, ml: 1, color: '#ccc' }}>
            追加できる検索条件はありません
          </Typography>
        )}
        <Button
          onClick={formik.handleSubmit}
          sx={{ mb: 1, ml: 0.25, width: '100%' }}
          variant="contained"
        >
          <SearchIcon />
          検索
        </Button>
      </>
    );
  };

  let limit = 100;
  let searchQuery = queries.filter((q) => q.key !== 'limit');
  if (searchQuery.length !== queries.length) {
    const limitQuery = queries.filter((q) => q.key === 'limit');
    if (limitQuery.length) {
      limit = limitQuery[0].value0;
    }
  }
  return (
    <Box {...props}>
      <Formik
        initialValues={{
          queries: searchQuery,
          limit,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          console.log('values.queries', values.queries);
          let queries = values.queries.map((q: QueryItem) => {
            if (q.type === 'datetime') {
              return TimeRange.fromMode(q.value0, q.mode, q.value1).toString(
                q.key
              );
            } else {
              return SearchModeToParam(q);
            }
          });
          console.log('queries', queries.join('&'));
        }}
      >
        {(formik) => render(formik)}
      </Formik>
    </Box>
  );
};
