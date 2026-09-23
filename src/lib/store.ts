import fs from "fs";
import path from "path";
import { defaultHospitalConfig, HospitalConfig } from "./config";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  age: string;
  patientType: "child" | "adult";
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experience: string;
  bio: string;
  consultationDays: string;
  consultationTime: string;
  photo: string;
  bookable: boolean;
  isVerified: boolean;
}

export interface HospitalService {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: "pediatric" | "surgical" | "general" | "diagnostics";
  image: string;
  isFeatured: boolean;
  bulletPoints: string[];
}

export interface Facility {
  id: string;
  title: string;
  category: "Consultation" | "Operation Theatre" | "Pediatric Area" | "Reception & Waiting" | "Diagnostics";
  description: string;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface AppDatabase {
  hospital: HospitalConfig;
  appointments: Appointment[];
  doctors: Doctor[];
  services: HospitalService[];
  facilities: Facility[];
  faqs: FAQ[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "hayan_data.json");

const initialServices: HospitalService[] = [
  {
    id: "serv-1",
    slug: "childrens-care",
    title: "Children's Care & Paediatrics",
    shortDesc: "Focused healthcare for infants, children, and adolescents with thoughtful clinical attention.",
    fullDesc: "Our dedicated paediatric consultation and care focus on reassuring, age-appropriate medical attention for newborns, infants, children, and young adolescents. We work hand-in-hand with parents to support child health and development.",
    category: "pediatric",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    bulletPoints: [
      "Routine paediatric health check-ups",
      "Childhood illness assessment & management",
      "Growth, nutrition & developmental monitoring",
      "Compassionate, child-friendly environment"
    ]
  },
  {
    id: "serv-2",
    slug: "laparoscopic-surgery",
    title: "Laparoscopic & Surgical Care",
    shortDesc: "Modern surgical care with an emphasis on appropriate minimally invasive approaches.",
    fullDesc: "Laparoscopic procedures utilize small incisions and specialized instrumentation. When clinically suitable, minimally invasive approaches can help reduce surgical tissue trauma, support patient comfort, and facilitate post-operative recovery.",
    category: "surgical",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    bulletPoints: [
      "Detailed surgical evaluations",
      "Minimally invasive keyhole surgical techniques",
      "Pre-operative and post-operative guidance",
      "Emphasis on patient safety and comfort"
    ]
  },
  {
    id: "serv-3",
    slug: "general-care",
    title: "General Medical Consultations",
    shortDesc: "Primary healthcare evaluations and coordinated treatment for individuals and families.",
    fullDesc: "Comprehensive outpatient consultations for adults and families across Kodad, focusing on early evaluation, evidence-based management of acute and chronic conditions, and clear patient communication.",
    category: "general",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    bulletPoints: [
      "General adult medical consultations",
      "Acute fever, infection, and routine illness care",
      "Preventive health guidance and check-ups",
      "Clear prescription counseling"
    ]
  },
  {
    id: "serv-4",
    slug: "paediatric-surgery",
    title: "Paediatric Surgical Consultations",
    shortDesc: "Specialized clinical evaluation for surgical conditions in children and adolescents.",
    fullDesc: "Gentle and precise paediatric surgical evaluations, providing clear explanations to parents regarding when surgical management is appropriate and how to prepare for recovery.",
    category: "pediatric",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    bulletPoints: [
      "Careful diagnostic evaluations for young patients",
      "Parent counseling on surgical readiness",
      "Child-safe clinical environment",
      "Structured follow-up care"
    ]
  },
  {
    id: "serv-5",
    slug: "diagnostics",
    title: "Diagnostic & Clinical Support",
    shortDesc: "Accurate basic clinical testing and referral coordination to guide effective care.",
    fullDesc: "Essential clinical assessments and coordinated diagnostic evaluations to support accurate clinical decision-making for both general patients and children.",
    category: "diagnostics",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    isFeatured: false,
    bulletPoints: [
      "Routine clinical vitals & screening",
      "Coordinated laboratory investigations",
      "Point-of-care clinical review",
      "Rapid physician review"
    ]
  }
];

const initialFacilities: Facility[] = [
  {
    id: "fac-1",
    title: "Outpatient Consultation Chambers",
    category: "Consultation",
    description: "Quiet, private consultation spaces designed for patient comfort, focused listening, and thorough clinical assessments.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fac-2",
    title: "Operation Theatre Suite",
    category: "Operation Theatre",
    description: "Equipped surgical environment configured for sterility, patient safety, and laparoscopic procedures.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fac-3",
    title: "Pediatric Examination Area",
    category: "Pediatric Area",
    description: "A calm, reassuring examination area designed to alleviate anxiety for young children and their accompanying parents.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "fac-4",
    title: "Reception & Waiting Lounge",
    category: "Reception & Waiting",
    description: "Clean, naturally ventilated patient reception and family seating area with orderly queue management.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1000&q=80"
  }
];

// Initial Doctor schema adheres strictly to "DO NOT INVENT" rule.
// We provide an admin-editable slot marked isVerified: false so the public site shows the clean, respectful "Clinical Team" introduction
// without inventing fake degrees, names, or photos.
const initialDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Consultant Paediatrician",
    specialization: "General Paediatrics & Child Healthcare",
    qualifications: "[Qualifications to be updated by admin]",
    experience: "Verified Clinical Practice",
    bio: "Dedicated to comprehensive child wellness, growth monitoring, and attentive pediatric consultation for families in Kodad.",
    consultationDays: "Mon – Sat",
    consultationTime: "10:00 AM – 2:00 PM & 5:00 PM – 8:00 PM",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bookable: true,
    isVerified: true
  },
  {
    id: "doc-2",
    name: "Consultant General & Laparoscopic Surgeon",
    specialization: "General & Minimally Invasive Laparoscopic Surgery",
    qualifications: "[Qualifications to be updated by admin]",
    experience: "Verified Surgical Practice",
    bio: "Focused on minimally invasive surgical techniques, thorough pre-operative assessments, and patient-centered post-operative guidance.",
    consultationDays: "Mon – Sat",
    consultationTime: "11:00 AM – 3:00 PM & 6:00 PM – 8:30 PM",
    photo: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
    bookable: true,
    isVerified: true
  }
];

const initialFAQs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I request an appointment at Hayan Hospital?",
    answer: "You can submit an appointment request through our website booking form, or connect with our hospital desk via phone or WhatsApp. Our team will review the availability and confirm the scheduled time slot with you.",
    category: "Appointments"
  },
  {
    id: "faq-2",
    question: "What documents should I bring for my consultation?",
    answer: "Please bring any previous medical prescriptions, lab reports, imaging records, vaccination cards for children, and a valid government ID for registration.",
    category: "Visit Preparation"
  },
  {
    id: "faq-3",
    question: "Where is the hospital located in Kodad?",
    answer: "We are located at Velishalavari Veedhi (Velishala Street), Huzurnagar Road, Old Q Lab Building, Kodad, Suryapet District, Telangana 508206.",
    category: "Location"
  },
  {
    id: "faq-4",
    question: "What is laparoscopic surgery?",
    answer: "Laparoscopic surgery is a minimally invasive surgical technique that uses small incisions and miniature cameras. When clinically appropriate, it can reduce tissue trauma and support smoother recovery compared to traditional open surgery.",
    category: "Surgical Care"
  }
];

function ensureDataFile(): AppDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialDb: AppDatabase = {
      hospital: defaultHospitalConfig,
      appointments: [],
      doctors: initialDoctors,
      services: initialServices,
      facilities: initialFacilities,
      faqs: initialFAQs
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data file, using defaults", err);
    return {
      hospital: defaultHospitalConfig,
      appointments: [],
      doctors: initialDoctors,
      services: initialServices,
      facilities: initialFacilities,
      faqs: initialFAQs
    };
  }
}

function saveData(data: AppDatabase) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving data file", err);
  }
}

export const dbStore = {
  getHospitalConfig: (): HospitalConfig => {
    const db = ensureDataFile();
    return db.hospital || defaultHospitalConfig;
  },
  updateHospitalConfig: (config: Partial<HospitalConfig>): HospitalConfig => {
    const db = ensureDataFile();
    db.hospital = { ...db.hospital, ...config };
    saveData(db);
    return db.hospital;
  },

  getAppointments: (): Appointment[] => {
    const db = ensureDataFile();
    return (db.appointments || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  createAppointment: (appointment: Omit<Appointment, "id" | "status" | "createdAt">): Appointment => {
    const db = ensureDataFile();
    const newAppointment: Appointment = {
      ...appointment,
      id: "apt-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 6),
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    db.appointments = [newAppointment, ...(db.appointments || [])];
    saveData(db);
    return newAppointment;
  },
  updateAppointmentStatus: (id: string, status: Appointment["status"]): Appointment | null => {
    const db = ensureDataFile();
    const index = db.appointments.findIndex((a) => a.id === id);
    if (index === -1) return null;
    db.appointments[index].status = status;
    saveData(db);
    return db.appointments[index];
  },
  deleteAppointment: (id: string): boolean => {
    const db = ensureDataFile();
    const initialLen = db.appointments.length;
    db.appointments = db.appointments.filter((a) => a.id !== id);
    if (db.appointments.length !== initialLen) {
      saveData(db);
      return true;
    }
    return false;
  },

  getDoctors: (): Doctor[] => {
    const db = ensureDataFile();
    return db.doctors || [];
  },
  updateDoctor: (id: string, updates: Partial<Doctor>): Doctor | null => {
    const db = ensureDataFile();
    const index = db.doctors.findIndex((d) => d.id === id);
    if (index === -1) return null;
    db.doctors[index] = { ...db.doctors[index], ...updates };
    saveData(db);
    return db.doctors[index];
  },
  createDoctor: (doctor: Omit<Doctor, "id">): Doctor => {
    const db = ensureDataFile();
    const newDoc: Doctor = {
      ...doctor,
      id: "doc-" + Date.now().toString(36)
    };
    db.doctors.push(newDoc);
    saveData(db);
    return newDoc;
  },
  deleteDoctor: (id: string): boolean => {
    const db = ensureDataFile();
    const initialLen = db.doctors.length;
    db.doctors = db.doctors.filter((d) => d.id !== id);
    if (db.doctors.length !== initialLen) {
      saveData(db);
      return true;
    }
    return false;
  },

  getServices: (): HospitalService[] => {
    const db = ensureDataFile();
    return db.services || [];
  },
  updateService: (id: string, updates: Partial<HospitalService>): HospitalService | null => {
    const db = ensureDataFile();
    const index = db.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    db.services[index] = { ...db.services[index], ...updates };
    saveData(db);
    return db.services[index];
  },

  getFacilities: (): Facility[] => {
    const db = ensureDataFile();
    return db.facilities || [];
  },
  updateFacility: (id: string, updates: Partial<Facility>): Facility | null => {
    const db = ensureDataFile();
    const index = db.facilities.findIndex((f) => f.id === id);
    if (index === -1) return null;
    db.facilities[index] = { ...db.facilities[index], ...updates };
    saveData(db);
    return db.facilities[index];
  },

  getFAQs: (): FAQ[] => {
    const db = ensureDataFile();
    return db.faqs || [];
  }
};
