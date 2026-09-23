export interface HospitalConfig {
  name: string;
  tagline: string;
  shortName: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  email: string;
  emergencyNumber: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  openingHours: string;
  consultationDays: string;
}

export const defaultHospitalConfig: HospitalConfig = {
  name: "Hayan General & Children's Hospital",
  tagline: "Modern medical care with a human face",
  shortName: "HAYAN",
  street: "Velishalavari Veedhi / Velishala Street",
  landmark: "Old Q Lab Building, Huzurnagar Road",
  addressLine1: "H.No. 12-105/4/A, Velishalavari Veedhi",
  addressLine2: "Huzurnagar Road, Old Q Lab Building",
  city: "Kodad",
  district: "Suryapet District",
  state: "Telangana",
  pincode: "508206",
  country: "India",
  fullAddress: "Velishalavari Veedhi, Huzurnagar Road (Old Q Lab Building), Kodad, Suryapet District, Telangana 508206, India",
  phone: "+91 94400 00000", // Central editable placeholder - configurable via Admin
  whatsapp: "+91 94400 00000",
  email: "care@hayanhospital.com",
  emergencyNumber: "+91 94400 00000",
  mapsUrl: "https://maps.google.com/?q=Hayan+General+and+Children+Hospital+Kodad+Telangana",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3816.326261541819!2d79.9658!3d16.9984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35bfa37398e079%3A0xc3457a44f7724a27!2sKodad%2C%20Telangana%20508206!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  openingHours: "Mon – Sat: 9:00 AM – 8:00 PM | Emergency & Inquiries Available",
  consultationDays: "Monday to Saturday",
};
