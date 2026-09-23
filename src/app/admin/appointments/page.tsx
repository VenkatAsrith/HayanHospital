"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Filter,
  Phone,
  Clock,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
} from "lucide-react";
import { Appointment } from "@/lib/store";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      if (!res.ok) throw new Error("Failed to load appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error loading appointments");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Appointment["status"]) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      alert("Error updating appointment status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment record?")) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      if (selectedAppointment?.id === id) setSelectedAppointment(null);
    } catch (err) {
      alert("Error deleting appointment");
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#164B61]">
            Patient Inquiries
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mt-1">
            Appointment Requests
          </h1>
          <p className="text-xs sm:text-sm text-[#626262] mt-1">
            Review and update consultation scheduling statuses.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          className="self-start sm:self-auto text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-lg border border-[#E5E7E7] bg-white text-[#164B61] hover:bg-[#F7F8F6]"
        >
          Refresh List
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#E5E7E7] shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by patient name, phone, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#E5E7E7] rounded-lg focus:outline-none focus:border-[#164B61]"
          />
          <Search className="w-4 h-4 text-[#8A8F93] absolute left-3 top-2.5" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-[#626262]" />
          <span className="text-xs font-semibold text-[#626262] uppercase tracking-wider">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-[#E5E7E7] rounded-lg px-3 py-2 bg-white text-[#111111] focus:outline-none focus:border-[#164B61]"
          >
            <option value="All">All ({appointments.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-[#E5E7E7] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#8A8F93]">
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="py-16 text-center">
            <CalendarCheck className="w-10 h-10 text-[#C1C9CD] mx-auto mb-3" />
            <p className="text-sm text-[#555555]">No appointment requests found.</p>
            <p className="text-xs text-[#8A8F93] mt-1">
              {searchTerm || statusFilter !== "All"
                ? "Try clearing the search or filter settings."
                : "New requests will appear as patients book."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8F6] text-[#626262] uppercase tracking-wider border-b border-[#E5E7E7]">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Patient</th>
                  <th className="px-6 py-3.5 font-semibold">Contact</th>
                  <th className="px-6 py-3.5 font-semibold">Department</th>
                  <th className="px-6 py-3.5 font-semibold">Date / Slot</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                  <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F2F2]">
                {filteredAppointments.map((apt) => (
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
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          handleStatusChange(apt.id, e.target.value as Appointment["status"])
                        }
                        className={`text-[11px] font-semibold uppercase tracking-wider rounded-md px-2.5 py-1 border focus:outline-none ${
                          apt.status === "Pending"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : apt.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : apt.status === "Completed"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedAppointment(apt)}
                          className="p-1.5 text-[#164B61] hover:bg-[#EAF5F9] rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl border border-[#E5E7E7] shadow-xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h3 className="text-base font-semibold text-[#111111]">
                  Appointment Request Details
                </h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-1 text-[#626262] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#8A8F93] uppercase font-semibold">Patient Name:</span>
                  <p className="text-sm font-semibold text-[#111111] mt-0.5">
                    {selectedAppointment.name} ({selectedAppointment.patientType === "child" ? "Child" : "Adult"}, Age: {selectedAppointment.age})
                  </p>
                </div>

                <div>
                  <span className="text-[#8A8F93] uppercase font-semibold">Phone:</span>
                  <p className="text-sm font-semibold text-[#164B61] mt-0.5">
                    <a href={`tel:${selectedAppointment.phone}`}>{selectedAppointment.phone}</a>
                  </p>
                </div>

                <div>
                  <span className="text-[#8A8F93] uppercase font-semibold">Service:</span>
                  <p className="text-sm text-[#111111] mt-0.5">{selectedAppointment.service}</p>
                </div>

                <div>
                  <span className="text-[#8A8F93] uppercase font-semibold">Scheduled Date &amp; Slot:</span>
                  <p className="text-sm text-[#111111] mt-0.5">
                    {selectedAppointment.preferredDate} — {selectedAppointment.preferredTime}
                  </p>
                </div>

                {selectedAppointment.message && (
                  <div>
                    <span className="text-[#8A8F93] uppercase font-semibold">Patient Message / Symptoms:</span>
                    <p className="text-sm text-[#444444] bg-[#F7F8F6] p-3 rounded-lg border border-[#E5E7E7] mt-1 leading-relaxed">
                      {selectedAppointment.message}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[#8A8F93] uppercase font-semibold">Submitted On:</span>
                  <p className="text-xs text-[#626262] mt-0.5">
                    {new Date(selectedAppointment.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0F2F2] flex items-center justify-between">
                <a
                  href={`tel:${selectedAppointment.phone}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#164B61] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Patient</span>
                </a>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 border border-[#E5E7E7] rounded-lg text-xs font-semibold text-[#444444] hover:bg-[#F7F8F6]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
