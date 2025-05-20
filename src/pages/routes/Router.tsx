import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppointmentPage } from '../Clinic/Appointments/Index';
import { PatientsPage } from '../Clinic/Patients/Index';
import { PatientDetailsPage } from '../Clinic/Patients/PatientDetails';
import { StaffListPage } from '../Clinic/StaffList/Index';
import { StaffDetailedPage } from '../Clinic/StaffList/StaffDetails';
import { Homepage } from '../Clinic/Index';
import { RootLayout } from '@/components/layouts/root-layout';
import { TreatmentsPage } from '../Clinic/Treatments/Index';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/appointments" element={<AppointmentPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/patients/:id" element={<PatientDetailsPage />} />
                    <Route path="/staff-list" element={<StaffListPage />} />
                    <Route path="/staff-list/:id" element={<StaffDetailedPage />} />
                    <Route path="/treatments" element={<TreatmentsPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
