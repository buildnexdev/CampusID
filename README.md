# KYE HR — Student Management System

Monorepo with a **React** frontend and **Node.js/Express** API for student ID barcode scanning and comprehensive activity record management.

## Project Structure

```
newweb/
├── web/          # React + Vite + TypeScript frontend
├── api/          # Node.js + Express + TypeScript backend
└── README.md
```

## Features

### Barcode Scanner
- Scan student ID card barcodes via webcam
- Manual barcode entry fallback
- Instantly displays student details: roll no, department, year, contact info

### Student Activity Records
- Attendance percentage
- Sports achievements
- Educational achievements
- Semester-wise marklist (SGPA, grades)
- Absentee record
- Academic activities
- Disciplinary records
- Co-curricular activities

## Quick Start

### Prerequisites
- Node.js 18+
- npm

### 1. API Setup

```bash
cd api
cp .env.example .env
npm install
npm run dev
```

API runs at `http://localhost:3001`

### 2. Web Setup

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

Web app runs at `http://localhost:5173`

## Demo Data

Two sample students are included for testing:

| Barcode ID        | Name          | Roll No  |
|-------------------|---------------|----------|
| KYE-STU-2024-001  | Arjun Mehta   | CS21001  |
| KYE-STU-2024-002  | Priya Sharma  | ME21045  |

Use the **Barcode Scanner** page and enter one of these IDs manually, or generate a barcode image with the same value to scan.

## API Endpoints

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | `/api/health`                     | Health check                   |
| GET    | `/api/students`                   | List all students (basic info) |
| GET    | `/api/students/:id`               | Full student profile           |
| GET    | `/api/students/barcode/:barcodeId`| Lookup by ID card barcode      |
| GET    | `/api/students/:id/activities`    | Activity records only          |

## Git Setup

```bash
git init
git add .
git commit -m "Initial KYE HR project base"
git remote add origin <your-repo-url>
git push -u origin main
```

## Next Steps

- Connect to a database (MongoDB / PostgreSQL)
- Add authentication for admin/staff roles
- Integrate real student ID barcode generation
- Add CRUD APIs for managing records
- Deploy API and web separately

## License

MIT
