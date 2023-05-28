import React, { VFC } from 'react';
import { SubmitButton, SubmitButtonProps } from "./Form/SubmitButton";
import { downloadFileFromUrl } from "../utils/download";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

type ImageDownloadButtonProps = SubmitButtonProps & {
  src: string;
  filename: string;
};

export const ImageDownloadButton: VFC<ImageDownloadButtonProps> = ({
  src, filename, children, ...props
}) => {
  return <SubmitButton
      {...props}
      onClick={async () => await downloadFileFromUrl({
        fileurl: src, filename
      })}
    >
      <SaveAltIcon
        sx={{
          mr: 1,
        }}
      />
      {children}
    </SubmitButton>
};
