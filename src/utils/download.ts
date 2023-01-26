export const downloadFile = ({
  content,
  mimetype = 'text/plain',
  filename = 'docnwload.md',
}: {
  content: string;
  filename?: string;
  mimetype?: string;
}) => {
  //markdownをダウンロード
  const blob = new Blob([content], { type: mimetype });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
};
