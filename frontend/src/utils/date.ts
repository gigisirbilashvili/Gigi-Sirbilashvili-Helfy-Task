import {
  differenceInDays,
  differenceInMinutes,
  format,
  formatDistanceStrict,
  isValid,
  parseISO,
} from 'date-fns';

export const formatToday = (date = new Date()): string => format(date, 'EEEE d MMMM');

export const formatCreatedAt = (isoDate: string, now = new Date()): string => {
  const date = parseISO(isoDate);

  if (!isValid(date)) {
    return '';
  }

  if (differenceInMinutes(now, date) < 1) {
    return 'just now';
  }

  if (differenceInDays(now, date) < 7) {
    return formatDistanceStrict(date, now, { addSuffix: true });
  }

  return format(date, 'd MMM yyyy');
};
