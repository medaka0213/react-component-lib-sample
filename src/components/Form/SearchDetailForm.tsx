import React, { VFC, useState, useEffect } from 'react';
import { Formik, useFormik } from 'formik';

import { Button, Box, BoxProps, Grid } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import { SearchDetailFormInput } from './SearchDetailFormInput';
import { FormInput } from './FormInput';
import { FormModal } from './FormModal';
import { TimeRange } from '../../models/TimeRange';
import { SearchItem } from '../../utils/query';

import { QueryItem, SearchModeToParam } from '../../utils/query';

export type SearchDetailFromProps = BoxProps & {
  keys?: SearchItem[];
  queries?: QueryItem[];
};

const App: VFC<SearchDetailFromProps> = ({
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
  onSubmit,
  ...props
}) => {
  const render = (formik: any) => {
    useEffect(() => {
      formik.setFieldValue(
        'queries',
        queries.filter((q: any) => q.key !== 'limit')
      );
      const limit = queries.filter((q: any) => q.key === 'limit')[0];
      formik.setFieldValue('limit', limit ? limit.value0 : 100);
    }, [queries]);

    const restKeys = (query: any = null): SearchItem[] =>
      keys
        .filter((k: SearchItem) => {
          return (
            formik.values.queries.filter((q: any) => {
              if (query && q.key === query.key) {
                return false;
              }
              return q.key === k.value;
            }).length === 0
          );
        })
        .map((k: SearchItem) => {
          return {
            ...k,
            enabled: true,
          };
        });

    const AddKeyModal = () => {
      return restKeys().length ? (
        <>
          <FormModal
            sx={{ mb: 2 }}
            title="検索条件を追加する"
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
              formik.handleSubmit();
            }}
            Form={({ onSubmit }: any) => (
              <SearchDetailFormInput
                onSubmit={onSubmit}
                keys={restKeys()}
                name="new_queriy"
                formik={formik}
                sx={{ mb: 1 }}
              />
            )}
          >
            <Button
              sx={{
                ml: 0.25,
                pr: 0.25,
                py: 1.5,
                width: '100%',
                height: '100%',
              }}
              variant="outlined"
              color="primary"
            >
              <AddIcon fontSize="small" />
              検索条件を追加
            </Button>
          </FormModal>
        </>
      ) : (
        <Button
          sx={{
            ml: 0.25,
            pr: 0.25,
            py: 1.5,
            mb: 2,
            width: '100%',
            height: '100%',
          }}
          variant="outlined"
          color="inherit"
          disabled
        >
          追加可能な検索条件はありません
        </Button>
      );
    };
    return (
      <>
        <Grid item xs={3} sm={2}>
          <AddKeyModal />
        </Grid>
        {formik.values.queries.map((q: any, i: number) => {
          return (
            <SearchDetailFormInput
              keys={restKeys(q)}
              name={'queries[' + i + ']'}
              formik={formik}
              sx={{ mb: 2 }}
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
                formik.handleSubmit();
              }}
              onDelete={(v: any) => {
                formik.setFieldValue(
                  'queries',
                  formik.values.queries
                    .slice(0, i)
                    .concat(formik.values.queries.slice(i + 1))
                );
                formik.handleSubmit();
              }}
            />
          );
        })}
        <Grid container spacing={1}>
          <Grid
            item
            xs={9}
            sm={10}
            sx={{
              pb: 0.5,
            }}
          >
            <Button
              onClick={formik.handleSubmit}
              sx={{ ml: 0.25, width: '100%', height: '100%' }}
              variant="contained"
            >
              <SearchIcon fontSize="small" />
              検索
            </Button>
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormInput name="limit" title="検索数の上限" formik={formik} />
          </Grid>
        </Grid>
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
          let queries = values.queries.map((q: QueryItem) => {
            if (q.type === 'datetime') {
              return TimeRange.fromMode(q.value0, q.mode, q.value1).toString(
                q.key
              );
            } else {
              return SearchModeToParam(q);
            }
          });
          queries.push('limit=' + values.limit);
          onSubmit && (await onSubmit(queries));
        }}
      >
        {(formik) => render(formik)}
      </Formik>
    </Box>
  );
};

import theme from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const SearchDetailForm = (props: SearchDetailFromProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App {...props} />
  </ThemeProvider>
);
