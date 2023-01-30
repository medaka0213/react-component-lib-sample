import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { MarpPreview } from './MarpPreview';
import { MarpFormInput } from './MarpFormInput';
import { MarpConvert } from './MarpConvert';

import { downloadFile } from '../../utils/download';

type SlidePageProps = {
  slide: any;
  comments?: string[];
  i: number;
  sx?: any;
  onClick?: (i: number) => void;
};

const SlidePage = ({ slide, comments = [], i, sx }: SlidePageProps) => {
  return (
    <Box
      key={i}
      sx={{
        border: '1px solid #ccc',
        ...sx,
      }}
    >
      <div className="border p-1">{slide}</div>
      {comments.map((comment, ci) => (
        <p key={ci}>{comment}</p>
      ))}
    </Box>
  );
};

export type MarpFormProps = {
  sx?: any;
  markdown?: string;
  title?: string;
};

export const MarpForm = ({
  sx,
  markdown: _markdown = '',
  title: _title = '',
  ...props
}: MarpFormProps) => {
  const [markdown, setMarkdown] = useState(_markdown);
  const [title, setTitle] = useState(_title);
  const [index, setIndex] = useState(0);
  const [maxPages, setMaxPages] = useState(1);

  const customRendererSingle = ({ slides }: { slides: any[] }) => {
    return (
      <>
        {slides.map(({ slide, comments }, i) => {
          if (i === index) {
            return <SlidePage slide={slide} comments={comments} i={i} />;
          }
        })}
      </>
    );
  };

  const customRendererList = ({ slides }: { slides: any[] }) => {
    setMaxPages(slides.length);
    return (
      <>
        <h5>
          Pages #{index} of {slides.length - 1}
        </h5>
        <Grid container spacing={2}>
          {slides.map(({ slide, comments }, i) => {
            if (i === index) {
              return (
                <Grid
                  xs={2}
                  key={i}
                  sx={{
                    border: '3px solid #ccc',
                  }}
                >
                  <SlidePage slide={slide} comments={comments} i={i} />
                </Grid>
              );
            } else {
              return (
                <Grid xs={2} key={i} onClick={() => setIndex(i)}>
                  <SlidePage slide={slide} i={i} />
                </Grid>
              );
            }
          })}
        </Grid>
      </>
    );
  };

  return (
    <Grid
      style={{
        maxWidth: '100%',
      }}
      container
    >
      <Grid xs={12} md={6}>
        <MarpPreview markdown={markdown} customRender={customRendererSingle} />
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              width: '100%',
            }}
            onClick={() =>
              downloadFile({ content: markdown, filename: title + '.md' })
            }
          >
            Donwload Markdown
          </Button>
          <MarpConvert markdown={markdown}>convert to PDF</MarpConvert>
        </Stack>
      </Grid>
      <Grid xs={12} md={6}>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              setIndex(index - 1);
            }}
            disabled={index - 1 < 0}
            sx={{
              mr: 'auto',
            }}
          >
            PREV
          </Button>
          <Button
            onClick={() => {
              setIndex(index + 1);
            }}
            disabled={index + 1 >= maxPages}
          >
            NEXT
          </Button>
        </Stack>
        <MarpFormInput
          onSubmit={(e) => {
            setMarkdown(e.markdown);
            setIndex(e.pageIndex);
            setTitle(e.title);
          }}
          markdown={markdown}
          pageIndex={index}
        />
      </Grid>
      <MarpPreview markdown={markdown} customRender={customRendererList} />
      <p
        style={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {markdown}
      </p>
    </Grid>
  );
};

export default MarpForm;
