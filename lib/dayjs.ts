import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime)

export const dateToDOB = (date: Date) => {
	return dayjs(date).format('DD-MM-YYYY');
};


export const dateToAge = (date: Date) => {
	return dayjs(date).toNow(true);
};