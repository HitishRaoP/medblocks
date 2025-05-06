# Medblocks - Patient Management System

![Dashboard Screenshot](https://github.com/user-attachments/assets/fc59c489-8ed1-4c9e-a0e4-c0e08aa924dc)

---

## Features

* **Dashboard:** A central overview of clinic operations, key metrics, and appointment stats.
* **Appointment Management:** Schedule, manage, and track appointments with real-time updates.
* **Patient Management:** Store and manage patient details, medical history, and visit records.
* **Treatment Management:** Define treatments with pricing, descriptions, and durations.
* **Staff Management:** Organize staff information, contact details, and shift schedules.

---

## Pages

### Dashboard

Centralized view of clinic operations including patient stats and appointments.

![Dashboard](https://github.com/user-attachments/assets/fc59c489-8ed1-4c9e-a0e4-c0e08aa924dc)

### Appointments

Manage patient appointments with treatment, date, time, and status.

![Appointments 1](https://github.com/user-attachments/assets/d0f2c20d-21a4-4f7a-b480-b6f1c2e53c0a)
![Appointments 2](https://github.com/user-attachments/assets/a2afbd61-5096-4493-9c63-7261e14997c2)

### Patients

View and manage patient information such as vitals.

![Patients 1](https://github.com/user-attachments/assets/43f85fef-38db-4cea-907e-71b2c093fd87)
![Patients 2](https://github.com/user-attachments/assets/2169fcc5-d969-4f43-8146-f1d9d845a022)

### Treatments

Define, update, and organize treatment options available at the clinic.

![Treatments 1](https://github.com/user-attachments/assets/c35273d5-958b-48a5-b2e0-61868a7a270e)
![Treatments 2](https://github.com/user-attachments/assets/c9b67416-8f8f-4bb5-b913-ce730258453e)

### Staff List

Manage staff roles, contact details, and schedules.

![Staff 1](https://github.com/user-attachments/assets/d5c1547a-85dc-4b48-bd8f-fa2c120537f2)
![Staff 2](https://github.com/user-attachments/assets/90d9fe5d-82f9-4b02-b854-fde5330da2f8)

### Patient Information

View complete details for an individual patient, including vitals and upcoming appointments.

![Patient Info](https://github.com/user-attachments/assets/12b2c483-343e-44ae-8057-5c83dc0e44d0)

### Staff Information

Display detailed data for staff members, including future appointments.

![Staff Info](https://github.com/user-attachments/assets/cfeb6493-01c7-4d98-9004-e21cc0df5b7d)

---

## Getting Started

Follow the instructions below to set up Medblocks on your local development environment.

### Prerequisites

Ensure the following are installed on your system:

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Bun](https://bun.sh/) – a fast JavaScript runtime (usually installed with Node.js or separately)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HitishRaoP/medblocks.git
   cd medblocks
   ```

2. **Install Dependencies**

   ```bash
   bun install
   ```

3. **Run Bootstrap**

   Sets up internal packages and dependencies.

   ```bash
   bun run bootstrap
   ```

4. **Start Development Server**

   ```bash
   bun dev
   ```

   If this command fails, refer to `package.json` for the exact script name (e.g. `dev`, `start`, or `serve`).

5. **Access Locally**

   Open your browser and go to:

   ```
   http://localhost:3000
   ```
