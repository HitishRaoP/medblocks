import { StaffDetailedMain } from '@/components/staff/staff-detailed-main';
import { useParams } from 'react-router-dom';

const StaffDetailedPage = async () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div>Loading...</div>;

    return <StaffDetailedMain id={id} />;
};

export { StaffDetailedPage };
