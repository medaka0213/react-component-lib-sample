import {
  extractYoutubeId,
  extractTwitterId,
  isYoutubeUrl,
  isTwitterUrl,
  extractIdFromUrl,
} from '../string';

describe('URL ID extraction functions', () => {
  describe('extractYoutubeId', () => {
    it('should extract YouTube ID from given URL', () => {
      const url = 'https://www.youtube.com/watch?v=VIDEOID123&feature=youtu.be';
      expect(extractYoutubeId(url)).toBe('VIDEOID123');
    });

    it('should extract YouTube ID from live URL', () => {
      const url = 'https://www.youtube.com/live/VIDEOID123';
      expect(extractYoutubeId(url)).toBe('VIDEOID123');
    });

    it('should extract ID using extractTwitterId for non-youtube URLs', () => {
      const url = 'https://twitter.com/user/status/123456789';
      expect(extractYoutubeId(url)).toBe('123456789');
    });
  });

  describe('extractTwitterId', () => {
    it('should extract Twitter ID from given URL', () => {
      const url = 'https://twitter.com/user/status/123456789';
      expect(extractTwitterId(url)).toBe('123456789');
    });

    it('should return end of fragment for invalid URLs', () => {
      const url = 'https://invalid.com/somepath';
      expect(extractTwitterId(url)).toBe('somepath');
    });
  });

  describe('isYoutubeUrl', () => {
    it('should return true for youtube.com URLs', () => {
      const url = 'https://www.youtube.com/watch?v=VIDEOID123';
      expect(isYoutubeUrl(url)).toBe(true);
    });

    it('should return true for youtu.be URLs', () => {
      const url = 'https://youtu.be/VIDEOID123';
      expect(isYoutubeUrl(url)).toBe(true);
    });

    it('should return false for non-YouTube URLs', () => {
      const url = 'https://twitter.com/user/status/123456789';
      expect(isYoutubeUrl(url)).toBe(false);
    });
  });

  describe('isTwitterUrl', () => {
    it('should return true for twitter.com URLs', () => {
      const url = 'https://twitter.com/user/status/123456789';
      expect(isTwitterUrl(url)).toBe(true);
    });

    it('should return true for x.com URLs', () => {
      const url = 'https://x.com/somepath';
      expect(isTwitterUrl(url)).toBe(true);
    });

    it('should return false for non-Twitter URLs', () => {
      const url = 'https://www.youtube.com/watch?v=VIDEOID123';
      expect(isTwitterUrl(url)).toBe(false);
    });
  });

  describe('extractIdFromUrl', () => {
    it('should extract YouTube ID for YouTube URLs', () => {
      const url = 'https://www.youtube.com/watch?v=VIDEOID123';
      expect(extractIdFromUrl(url)).toBe('VIDEOID123');
    });

    it('should extract Twitter ID for Twitter URLs', () => {
      const url = 'https://twitter.com/user/status/123456789';
      expect(extractIdFromUrl(url)).toBe('123456789');
    });
  });
});
