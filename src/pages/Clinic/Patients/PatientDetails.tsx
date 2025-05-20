import { useParams } from 'react-router-dom';
import { PatientDetailsMain } from '@/components/patient/patient-detailed-main';

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div>Loading...</div>;

    return <PatientDetailsMain id={id} />;
};

export { PatientDetailsPage };
