import React, { Children, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import Button, { ButtonProps } from '@mui/material/Button';

import { MarpPreview } from './MarpPreview';

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  return (
    <div ref={ref}>
      <MarpPreview markdown={props.markdown} />
    </div>
  );
});
ComponentToPrint.displayName = 'ComponentToPrint';

export type MarpConvertProps = ButtonProps & {
  documentTitle?: string;
  markdown: string;
};

export const MarpConvert = ({
  markdown,
  documentTitle = 'MarpConvert', //動かへん
  children = 'Convert to PDF',
  variant = 'contained',
  sx = {},
  ...props
}: MarpConvertProps) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle,
    content: () => componentRef.current,
  });
  return (
    <>
      <Button
        variant={variant}
        onClick={handlePrint}
        sx={{
          width: '100%',
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
      <div style={{ display: 'none' }}>
        <ComponentToPrint ref={componentRef} markdown={markdown} />
      </div>
    </>
  );
};

export default MarpConvert;
