import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export const dateToDOB = (date: Date) => {
	return dayjs(date).format('DD-MM-YYYY');
};

export const dateToAge = (date: Date) => {
	return dayjs(date).toNow(true);
};

export function timeTo12Hour(time24: string): string {
	// Correctly parse the 24-hour time format and convert to 12-hour format
	return dayjs(time24, 'HH:mm:ss').format('hh:mm:ss A');
}
