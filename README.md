# 🏥 Hayan General & Children's Hospital

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-hayanhospital.com-164B61?style=for-the-badge&logo=vercel&logoColor=white)](https://hayanhospital.com)
[![Vercel Deployment](https://img.shields.io/badge/Vercel_Preview-Online-success?style=for-the-badge&logo=vercel)](https://hayan-hospital.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VenkatAsrith/HayanHospital)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br />

### 🌐 **[🔗 CLICK HERE TO OPEN LIVE DEMO](https://hayanhospital.com)**
*(Alternative deployment preview: [hayan-hospital.vercel.app](https://hayan-hospital.vercel.app))*

<p align="center">
  <strong>A modern, high-performance web platform and clinical management system built for Hayan General & Children's Hospital (Kodad, Telangana).</strong>
  <br />
  Featuring seamless online OPD appointment scheduling, specialized paediatric & laparoscopic surgery modules, dynamic doctor rosters, and an enterprise admin management dashboard.
</p>

[Explore Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [API Reference](#-api-endpoints) • [Admin Portal](#-admin-dashboard--security)

---

</div>

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Patient Experience & Healthcare Services](#patient-experience--healthcare-services)
  - [Appointment Booking Engine](#appointment-booking-engine)
  - [Admin Management Suite](#admin-management-suite)
  - [Accessibility & Mobile Usability](#accessibility--mobile-usability)
  - [Search Engine Optimization (SEO) & Schema](#seo--performance)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Admin Dashboard & Security](#-admin-dashboard--security)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Hayan General & Children's Hospital** is a healthcare facility situated in Kodad, Suryapet District, Telangana. This web application serves as the hospital's primary digital gateway, bridging the gap between healthcare providers and patients.

The platform provides patients with straightforward information on clinical departments, consulting doctors, operating facilities, emergency contacts, and an interactive online appointment booking workflow. Simultaneously, it equips hospital administrators with a protected dashboard to control doctor availability, review and manage patient appointments, and update institutional contact records in real time.

---

## ✨ Key Features

### 🩺 Patient Experience & Healthcare Services
- **Specialized Pediatric Care**: Dedicated modules spotlighting newborn care, routine immunization, child wellness, and developmental monitoring.
- **Laparoscopic & General Surgery**: Information sections on minimally invasive laparoscopic procedures (gallbladder, hernia, appendix, abdominal surgeries).
- **Interactive Doctor Directory**: Detailed profiles showcasing qualifications, clinical experience, consultation days, and OPD timings.
- **Modern Clinical Aesthetics**: Hospital branding designed with calming clinical teal, deep navy, and soft hospital-grade warm neutral palettes.

### 📅 Appointment Booking Engine
- **Step-by-step Booking Modal**: Intuitive form enabling patients to choose between Pediatric or Adult consultation, pick a doctor or department, and select dates and time slots.
- **Smart Form Validation**: Real-time validation for patient telephone numbers, age groups, and preferred consultation times.
- **Resilient Storage**: Appointments persist automatically through resilient data file storage with support for cloud database integration.

### 🛡️ Admin Management Suite (`/admin`)
- **Secure Authentication**: Protected admin dashboard powered by bcrypt password hashing and JSON Web Tokens (JWT).
- **Live Appointment Triage**: Filter appointments by status (`Pending`, `Confirmed`, `Completed`, `Cancelled`), with one-click status transitions.
- **Doctor Roster Controls**: Update doctor bios, qualifications, schedules, and active consultation availability on the fly.
- **Hospital Metadata Control**: Modify emergency telephone numbers, WhatsApp consultation lines, addresses, and OPD hours without deploying code changes.

### 📱 Accessibility & Mobile Usability
- **Sticky Mobile Action Bar**: Fixed quick-action bar for mobile devices providing instant access to emergency dialing, WhatsApp triage, Google Maps directions, and booking.
- **Interactive Location Map**: Embedded Google Maps with geolocation directions to Velishalavari Veedhi, Huzurnagar Road, Kodad.
- **Responsive Layout**: Designed to adapt fluidly from compact mobile screens up to 4K desktop displays.

### 🔍 SEO & Performance
- **Structured Data (JSON-LD)**: Rich schema markup incorporating `Hospital`, `MedicalBusiness`, and `BreadcrumbList` for elevated Google Search rankings.
- **Open Graph & Twitter Cards**: High-resolution social previews for WhatsApp, Facebook, and Twitter sharing.
- **Next.js 16 App Router**: Server-Side Rendering (SSR) and Server Components for instant initial paint and high Core Web Vitals scores.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Hybrid Server/Client Components, React Server Actions & Route Handlers |
| **Core UI** | [React 19](https://react.dev/) | Latest React concurrent features and modern hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Full type safety across frontend components, API contracts, and data models |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS engine with custom design tokens and fluid typography |
| **Icons** | [Lucide React](https://lucide.dev/) | Accessible, consistent medical and UI iconography |
| **Auth & Security** | [JWT](https://github.com/auth0/node-jsonwebtoken) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) | Stateless HTTP-only cookie session authentication and credential hashing |
| **Data Layer** | Resilient JSON / MongoDB Ready | Local JSON persistence out of the box with ready-to-plug MongoDB URI support |

---

## 📂 Project Architecture

```
HayanHospital/
├── .env.example              # Sample environment configuration template
├── .gitignore                # Production git ignore configuration
├── package.json              # Project dependencies and operational scripts
├── tsconfig.json             # TypeScript compiler settings
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration for Tailwind CSS v4
├── data/
│   └── hayan_data.json       # Resilient storage for hospital data, doctors & appointments
├── public/                   # Static assets, branding, and icons
└── src/
    ├── app/
    │   ├── admin/            # Secure Admin portal routes
    │   │   ├── appointments/ # Appointment management panel
    │   │   ├── doctors/      # Doctor profiles management
    │   │   ├── facilities/   # Facilities management
    │   │   ├── hospital/     # Hospital contact & settings
    │   │   ├── login/        # Admin authentication page
    │   │   ├── services/     # Clinical services editor
    │   │   ├── layout.tsx    # Admin shell with navigation sidebar
    │   │   └── page.tsx      # Admin overview dashboard
    │   ├── api/
    │   │   ├── admin/        # Protected admin REST endpoints (login, logout, store updates)
    │   │   └── appointments/ # Public & Admin appointment submission and fetch endpoints
    │   ├── globals.css       # Core design tokens, theme variables & utilities
    │   ├── layout.tsx        # Root HTML layout with OpenGraph & Schema markup
    │   └── page.tsx          # Public hospital landing portal
    ├── components/           # Reusable UI components
    │   ├── AboutSection.tsx        # Institutional background & hospital legacy
    │   ├── AppointmentModal.tsx    # Interactive appointment booking dialog
    │   ├── AppointmentSection.tsx  # Landing page appointment call-to-action
    │   ├── ChildrenCareSection.tsx # Pediatric care feature showcase
    │   ├── ContactSection.tsx      # Address, interactive map & contact info
    │   ├── DoctorsSection.tsx      # Consultant doctor roster
    │   ├── FAQSection.tsx          # Frequently Asked Questions accordion
    │   ├── FacilitiesGallery.tsx   # OT, diagnostics, and patient room showcase
    │   ├── Footer.tsx              # Institutional footer with links & accreditation
    │   ├── Header.tsx              # Navigation bar with emergency banners
    │   ├── Hero.tsx                # Hero section with appointment booking triggers
    │   ├── LaparoscopicSection.tsx # Surgical excellence module
    │   ├── MobileActionBar.tsx     # Sticky mobile quick actions
    │   └── ServicesSection.tsx     # Full clinical services directory
    └── lib/
        ├── auth.ts           # JWT signing, verification and cookie helpers
        ├── config.ts         # Hospital metadata types and fallback configurations
        └── store.ts          # Central data store (read/write/update methods)
```

---

## 🚀 Getting Started

Follow these steps to set up and run Hayan Hospital locally on your machine.

### Prerequisites

- **Node.js**: `v18.18.0` or later (Node.js 20+ recommended)
- **Package Manager**: `npm`, `yarn`, `pnpm`, or `bun`
- **Git**: Installed and configured on your system

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VenkatAsrith/HayanHospital.git
   cd HayanHospital
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

### Environment Setup

Create your local environment file by copying the provided example:

```bash
cp .env.example .env.local
```

Open `.env.local` and customize your admin credentials and security secrets:

```env
# Admin Portal Credentials
ADMIN_EMAIL=admin@hayanhospital.com
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_super_secret_jwt_key_here

# Optional Database (Falls back to local file storage if not specified)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hayan_hospital
```

### Running Locally

Start the local development server:

```bash
npm run dev
```

The application will be accessible at:
- **Public Portal**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Building for Production

Compile and verify the production build:

```bash
npm run build
npm run start
```

---

## 🔐 Environment Variables

| Variable | Required | Default / Description |
| :--- | :---: | :--- |
| `ADMIN_EMAIL` | Optional | Admin portal login email address (default: `admin@hayanhospital.com`) |
| `ADMIN_PASSWORD` | Optional | Admin portal password (default in example: `hayan@2026`) |
| `JWT_SECRET` | Recommended | Cryptographic secret for signing administrative JWT session tokens |
| `MONGODB_URI` | Optional | Connection string for MongoDB (if migrating off file storage) |
| `CLOUDINARY_CLOUD_NAME` | Optional | Cloudinary cloud identifier for external image asset management |
| `CLOUDINARY_API_KEY` | Optional | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Optional | Cloudinary API Secret |

---

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/appointments` | Retrieve appointments list (protected for admin query) |
| `POST` | `/api/appointments` | Submit a new appointment request with patient information |

### Admin Endpoints (Requires JWT Cookie Authentication)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Authenticate administrator and set HTTP-only session cookie |
| `POST` | `/api/admin/logout` | Terminate administrator session and clear cookies |
| `POST` | `/api/admin/doctors` | Add or update doctor profile details and availability |
| `DELETE`| `/api/admin/doctors` | Remove a doctor from the active directory |
| `POST` | `/api/admin/hospital-info` | Update hospital contact numbers, address, and timings |
| `POST` | `/api/admin/services` | Create or update clinical service listings |
| `POST` | `/api/admin/facilities` | Update diagnostic and facility gallery items |

---

## 🛡️ Admin Dashboard & Security

1. **Accessing the Portal**: Navigate to `/admin/login` on your deployment or local instance.
2. **Session Security**:
   - Authentication tokens are delivered through `SameSite: Lax`, `HttpOnly` security cookies.
   - Protection against Cross-Site Scripting (XSS) and unauthorized local storage token access.
3. **Data Protection**:
   - Passwords should be updated from default templates before public deployment.
   - All critical patient contact details are securely managed.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy Hayan Hospital is using the [Vercel Platform](https://vercel.com):

1. Push your repository to GitHub: `https://github.com/VenkatAsrith/HayanHospital`.
2. Import the repository into your Vercel Dashboard.
3. Configure the environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`) in **Vercel Settings > Environment Variables**.
4. Click **Deploy**. Your hospital application will be live instantly with global CDN and automated SSL!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVenkatAsrith%2FHayanHospital)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Hayan General & Children's Hospital**  
📍 Velishalavari Veedhi, Huzurnagar Road (Old Q Lab Building), Kodad, Suryapet District, Telangana 508206  
📞 Emergency & Enquiries: +91 94400 00000 • ✉️ care@hayanhospital.com

*Built with care for Kodad and surrounding communities.*

</div>
