"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminTable, AdminButton } from "@/components/admin/AdminTable";

type BookingRow = {
  id: string;
  customer_name: string;
  customer_phone: string;
  size_yards: number;
  delivery_date: string;
  return_date: string;
  total_price: number;
  status: string;
};

const STATUS_OPTIONS = [
  "pending",
  "scheduled",
  "in_progress",
  "completed",
  "cancelled",
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/bookings", {
        cache: "no-store",
      });
      const data = (await response.json()) as BookingRow[];
      setBookings(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (booking: BookingRow) => {
    const nextStatus = prompt(
      `Status (${STATUS_OPTIONS.join(", ")})`,
      booking.status,
    );
    if (!nextStatus || !STATUS_OPTIONS.includes(nextStatus)) {
      return;
    }

    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, status: nextStatus }),
    });

    await loadBookings();
  };

  const deleteBooking = async (booking: BookingRow) => {
    const confirmed = window.confirm(
      `Delete booking for ${booking.customer_name} on ${booking.delivery_date}? This cannot be undone.`,
    );
    if (!confirmed) return;

    await fetch(`/api/admin/bookings?id=${booking.id}`, {
      method: "DELETE",
    });

    await loadBookings();
  };

  const filtered = useMemo(() => {
    return bookings.filter((booking) => {
      const haystack =
        `${booking.id} ${booking.customer_name} ${booking.customer_phone}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const rows = filtered.map((booking) => ({
    ...booking,
    booking_number: booking.id.slice(0, 8),
    customer: booking.customer_name,
    size: `${booking.size_yards} Yard`,
    delivery: booking.delivery_date,
    total: `$${Number(booking.total_price).toFixed(2)}`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Bookings</h1>
          <p className="text-[#999999] mt-2">Live customer bookings</p>
        </div>
        <AdminButton variant="secondary" onClick={loadBookings}>
          Refresh
        </AdminButton>
      </div>

      <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-4 flex flex-col md:flex-row gap-4">
        <input
          type="search"
          placeholder="Search by booking id, customer, or phone..."
          className="input-field flex-1"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="input-field w-full md:w-48"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <AdminTable
        loading={loading}
        headers={[
          { key: "booking_number", label: "Booking #" },
          { key: "customer", label: "Customer" },
          { key: "size", label: "Size" },
          { key: "delivery", label: "Delivery Date" },
          { key: "total", label: "Total" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
        actions={(row) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateStatus(row as BookingRow)}
              className="text-primary hover:text-primary-light text-sm font-medium"
            >
              Edit Status
            </button>
            <button
              onClick={() => deleteBooking(row as BookingRow)}
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        )}
      />
    </div>
  );
}
