import { format_timedelta, deformate_timedelta } from '../time';

describe('format_timedelta', () => {
  test('should format 0 seconds as 00:00:00', () => {
    expect(format_timedelta(0)).toBe('00:00:00');
  });

  test('should format 59 seconds as 00:00:59', () => {
    expect(format_timedelta(59)).toBe('00:00:59');
  });

  test('should format 60 seconds as 00:01:00', () => {
    expect(format_timedelta(60)).toBe('00:01:00');
  });

  test('should format 3600 seconds as 01:00:00', () => {
    expect(format_timedelta(3600)).toBe('01:00:00');
  });

  test('should format 3661 seconds as 01:01:01', () => {
    expect(format_timedelta(3661)).toBe('01:01:01');
  });
});

describe('deformate_timedelta', () => {
  test('should deformate 00:00:00 to 0 seconds', () => {
    expect(deformate_timedelta('00:00:00')).toBe(0);
  });

  test('should deformate 00:00:59 to 59 seconds', () => {
    expect(deformate_timedelta('00:00:59')).toBe(59);
  });

  test('should deformate 00:01:00 to 60 seconds', () => {
    expect(deformate_timedelta('00:01:00')).toBe(60);
  });

  test('should deformate 01:00:00 to 3600 seconds', () => {
    expect(deformate_timedelta('01:00:00')).toBe(3600);
  });

  test('should deformate 01:01:01 to 3661 seconds', () => {
    expect(deformate_timedelta('01:01:01')).toBe(3661);
  });
});
