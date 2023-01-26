import React, { useState, useEffect, ReactNode } from 'react';
import { Marp } from '@marp-team/marp-core';

export type SlideRenderProps = {
  html: string;
  css: string;
  index: number;
  comments: string[][];
};

export type CustomRenderProps = {
  slides: {
    slide: JSX.Element;
    comments: string[];
    index: number;
  }[];
};

export type MarpProps = {
  markdown: string;
  customRender?: (props: CustomRenderProps) => JSX.Element;
};

export const MarpPreview = ({ markdown, customRender }: MarpProps) => {
  const [html, setHtml] = useState<string[]>([]);
  const [css, setCss] = useState('');
  const [comments, setComments] = useState<string[][]>([]);

  useEffect(() => {
    const marp = new Marp({ html: true });
    const { html, css, comments } = marp.render(markdown, {
      htmlAsArray: true,
    });
    setHtml(html);
    setCss(css);
    setComments(comments);
  }, [markdown]);

  const SlidePage = ({ html, css }: { html: string; css: string }) => {
    return (
      <>
        <style>{css}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} className="marpit" />
      </>
    );
  };

  const DefaultRender = ({ html, css }: SlideRenderProps) => (
    <>
      <SlidePage html={html} css={css} />
    </>
  );

  return customRender ? (
    customRender({
      slides: html.map((html, i) => ({
        index: i,
        comments: comments[i],
        slide: <SlidePage html={html} css={css} key={i} />,
      })),
    })
  ) : (
    <>
      {html.map((html, i) => (
        <DefaultRender
          html={html}
          css={css}
          index={i}
          key={i}
          comments={comments}
        />
      ))}
    </>
  );
};
