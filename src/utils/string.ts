export function extract_youtube_id(url: string): string {
  if (url.includes('youtube.com')) {
    return url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be')) {
    return url.split('/')[3].split('&')[0];
  } else {
    return '';
  }
}
