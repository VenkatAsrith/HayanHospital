import { dbStore, Appointment } from "@/lib/store";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Building2,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const appointments = dbStore.getAppointments();
  const doctors = dbStore.getDoctors();
  const services = dbStore.getServices();
  const facilities = dbStore.getFacilities();
  const hospital = dbStore.getHospitalConfig();

  const pendingAppointments = appointments.filter((a) => a.status === "Pending");
  const confirmedAppointments = appointments.filter((a) => a.status === "Confirmed");
  const recentAppointments = appointments.slice(0, 5);

  const stats = [
    {
      label: "Pending Inquiries",
      count: pendingAppointments.length,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
      description: "Require desk phone confirmation",
    },
    {
      label: "Confirmed Visits",
      count: confirmedAppointments.length,
      icon: CheckCircle,
      color: "text-emerald-600 bg-emerald-50",
      description: "Scheduled with doctors",
    },
    {
      label: "Active Doctors",
      count: doctors.length,
      icon: Users,
      color: "text-[#164B61] bg-[#EAF5F9]",
      description: "Consultants listed on website",
    },
    {
      label: "Clinical Services",
      count: services.length,
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50",
      description: "Departments & categories",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
            Hospital Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
            Clinical Administration Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#626262] mt-1">
            Real-time appointment requests, verified contact numbers, and public clinic configurations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/appointments"
            className="inline-flex items-center space-x-2 bg-[#164B61] hover:bg-[#0f3444] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white p-6 rounded-xl border border-[#E5E7E7] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8F93]">
                  {item.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#111111]">
                  {item.count}
                </p>
                <p className="text-xs text-[#626262] mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Verified Contact Status Card */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E7E7] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0F2F2] gap-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-[#164B61]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#111111]">
              Verified Public Contact Details
            </h2>
          </div>
          <Link
            href="/admin/hospital"
            className="text-xs font-semibold text-[#164B61] hover:underline flex items-center space-x-1"
          >
            <span>Edit Information</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs">
          <div>
            <span className="text-[#8A8F93] uppercase font-semibold">Hospital Name:</span>
            <p className="text-sm font-medium text-[#111111] mt-0.5">{hospital.name}</p>
          </div>
          <div>
            <span className="text-[#8A8F93] uppercase font-semibold">Active Phone:</span>
            <p className="text-sm font-medium text-[#111111] mt-0.5">{hospital.phone || "Not set"}</p>
          </div>
          <div>
            <span className="text-[#8A8F93] uppercase font-semibold">Location:</span>
            <p className="text-sm font-medium text-[#111111] mt-0.5">{hospital.street}, {hospital.city}</p>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-xl border border-[#E5E7E7] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#F0F2F2] flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#111111]">
              Recent Appointment Requests
            </h2>
            <p className="text-xs text-[#626262] mt-0.5">
              Patients who requested consultations via the website
            </p>
          </div>
          <Link
            href="/admin/appointments"
            className="text-xs font-semibold text-[#164B61] hover:underline"
          >
            View All ({appointments.length}) &rarr;
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="py-12 text-center">
            <CalendarCheck className="w-10 h-10 text-[#C1C9CD] mx-auto mb-3" />
            <p className="text-sm text-[#555555]">No appointment requests received yet.</p>
            <p className="text-xs text-[#8A8F93] mt-1">Requests submitted through the website form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8F6] text-[#626262] uppercase tracking-wider border-b border-[#E5E7E7]">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Patient</th>
                  <th className="px-6 py-3.5 font-semibold">Phone</th>
                  <th className="px-6 py-3.5 font-semibold">Department</th>
                  <th className="px-6 py-3.5 font-semibold">Date &amp; Slot</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F2]">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#FDFDFD]">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sm text-[#111111]">{apt.name}</div>
                      <div className="text-[11px] text-[#7B8790]">
                        {apt.patientType === "child" ? "Child" : "Adult"} • Age: {apt.age}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${apt.phone}`}
                        className="font-medium text-[#164B61] hover:underline flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{apt.phone}</span>
                      </a>
                    </td>
                    <td className="px-6 py-4 text-[#444444] font-medium">
                      {apt.service}
                    </td>
                    <td className="px-6 py-4 text-[#555555]">
                      <div>{apt.preferredDate}</div>
                      <div className="text-[11px] text-[#7B8790]">{apt.preferredTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          apt.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : apt.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : apt.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href="/admin/appointments"
                        className="text-xs font-semibold text-[#164B61] hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
