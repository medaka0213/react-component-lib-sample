import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FormInput } from './FormInput';

import { MarkdownPages } from '../../models/MarkdownPages';

export type MarpFormInputProps = {
  sx?: any;
  onSubmit: (values: any) => void;
  pageIndex?: number;
  markdown?: string;
};

export const MarpFormInput = ({
  sx,
  onSubmit,
  pageIndex = 0,
  markdown = '',
}: MarpFormInputProps) => {
  const [markdownPages, setInitialValues] = useState(
    MarkdownPages.fromText(markdown)
  );
  const [inputValue, setInputValue] = useState(
    markdownPages.pages[pageIndex] || ''
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      onPageChanged(inputValue);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const sendData = (index = pageIndex) => {
    const maxPages = markdownPages.pages.length;
    index = index < 0 ? 0 : index;
    index = index > maxPages - 1 ? maxPages : index;

    onSubmit({
      markdown: markdownPages.genText(),
      pageIndex: index,
    });
  };

  const onPageAdded = async (index: number) => {
    markdownPages.addPage(index, '');
    setInitialValues(markdownPages);
    sendData(index + 1);
  };
  const onPageDeleted = async (index: number) => {
    markdownPages.deletePage(index, '');
    setInitialValues(markdownPages);
    sendData();
  };
  const onPageChanged = async (text: string, index = pageIndex) => {
    markdownPages.changePage(index, text);
    setInitialValues(markdownPages);
    sendData();
  };

  const _onSubmit = async (values: any) => {
    markdownPages.fromPagesObj(values);
    setInitialValues(markdownPages);
    sendData();
  };

  const renderForm = (formik: any) => {
    return (
      <form key={pageIndex} className="bg-white p-3 m-3">
        <FormInput
          type="textarea"
          title={`Page #${pageIndex}`}
          name={`md_page_${pageIndex}`}
          sx={{
            display: 'flex',
          }}
          formik={formik}
          onChange={async (e) => {
            setInputValue(e.target.value);
          }}
          rows={30}
        />
        <div className="text-center">
          <Button className="mr-5" onClick={async () => onPageAdded(pageIndex)}>
            [+] スライドを追加する
          </Button>
          <Button color="error" onClick={async () => onPageDeleted(pageIndex)}>
            [-] スライドを削除する
          </Button>
        </div>
      </form>
    );
  };
  return (
    <Box sx={sx}>
      <Formik
        enableReinitialize={true}
        initialValues={markdownPages.toPagesObj()}
        //validationSchema={validationSchema}
        onSubmit={_onSubmit}
        render={renderForm}
      />
    </Box>
  );
};

export default MarpFormInput;
