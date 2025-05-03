import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const dateToDOB = (date: Date) => {
	return dayjs(date).format('DD-MM-YYYY');
};
