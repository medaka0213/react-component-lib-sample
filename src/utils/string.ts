export function extractYoutubeId(url: string): string {
  if (url.includes('youtube.com')) {
    return url.split('v=')[1].split('&')[0];
  } else {
    return extractTwitterId(url);
  }
}

export function extractTwitterId(url: string): string {
  const parts = url.split('/');
  if (parts.length > 1) {
    const id = (parts[parts.length - 1] || '').split('?');
    if (id.length > 0) {
      return id[0];
    }
  }
  return '';
}

export function isYoutubeUrl(url: string): boolean {
  if (url.indexOf('youtube.com') > -1) {
    return true;
  } else if (url.indexOf('youtu.be') > -1) {
    return true;
  }
  return false;
}

export function isTwitterUrl(url: string): boolean {
  if (url.indexOf('twitter.com') > -1) {
    return true;
  } else if (url.indexOf('x.com') > -1) {
    return true;
  }
  return false;
}

export function extractIdFromUrl(url: string): string {
  if (isYoutubeUrl(url)) {
    return extractYoutubeId(url);
  }
  return extractTwitterId(url);
}
