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
  // FireFoxでダウンロード後にURLが残るのを防ぐ
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 250);
};

export async function downloadFileFromUrl({
  filename,
  fileurl,
}: {
  filename: string;
  fileurl: string;
}) {
  const response = await fetch(fileurl);
  const blob = await response.blob();
  const newBlob = new Blob([blob]);
  const url = window.URL.createObjectURL(newBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  // FireFoxでダウンロード後にURLが残るのを防ぐ
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 250);
}
