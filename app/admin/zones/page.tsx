"use client";

import { useEffect, useState } from "react";
import { AdminTable, AdminButton } from "@/components/admin/AdminTable";

type Zone = {
  id: string;
  name: string;
  zone_type: string;
  delivery_fee: number;
  is_active: boolean;
};

export default function AdminZonesPage() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadZones = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/zones", { cache: "no-store" });
      const data = (await response.json()) as Zone[];
      setZones(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  const runZonesMutation = async (
    request: Promise<Response>,
    fallbackError: string,
  ) => {
    setSaving(true);
    setError("");
    try {
      const response = await request;
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || fallbackError);
      }

      setZones(Array.isArray(result) ? (result as Zone[]) : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : fallbackError);
    } finally {
      setSaving(false);
    }
  };

  const createZone = async () => {
    const name = prompt("Zone name", "New Zone");
    if (!name) return;

    const zoneType = prompt("Type (Zipcode or Radius)", "Zipcode") || "Zipcode";
    const fee = prompt("Delivery fee", "49.99");
    if (!fee) return;

    await runZonesMutation(
      fetch("/api/admin/zones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          zone_type: zoneType,
          delivery_fee: Number(fee),
          is_active: true,
        }),
      }),
      "Failed to create zone",
    );
  };

  const editZone = async (zone: Zone) => {
    const name = prompt("Zone name", zone.name);
    if (!name) return;

    const fee = prompt("Delivery fee", String(zone.delivery_fee));
    if (!fee) return;

    await runZonesMutation(
      fetch("/api/admin/zones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...zone,
          name,
          delivery_fee: Number(fee),
        }),
      }),
      "Failed to update zone",
    );
  };

  const toggleZone = async (zone: Zone) => {
    await runZonesMutation(
      fetch("/api/admin/zones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...zone, is_active: !zone.is_active }),
      }),
      "Failed to update zone",
    );
  };

  const deleteZone = async (zone: Zone) => {
    const confirmed = confirm(`Delete ${zone.name}?`);
    if (!confirmed) return;

    await runZonesMutation(
      fetch("/api/admin/zones", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: zone.id }),
      }),
      "Failed to delete zone",
    );
  };

  const rows = zones.map((zone) => ({
    ...zone,
    type: zone.zone_type,
    fee: `$${Number(zone.delivery_fee).toFixed(2)}`,
    status: zone.is_active ? "active" : "inactive",
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Service Zones</h1>
          <p className="text-[#999999] mt-2">Live delivery zones and fees</p>
        </div>
        <AdminButton variant="primary" onClick={createZone}>
          {saving ? "Saving..." : "+ New Zone"}
        </AdminButton>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <AdminTable
        loading={loading}
        headers={[
          { key: "name", label: "Zone Name" },
          { key: "type", label: "Type" },
          { key: "fee", label: "Delivery Fee" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
        actions={(row) => (
          <div className="flex gap-3">
            <button
              onClick={() => editZone(row as Zone)}
              className="text-primary hover:text-primary-light text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => toggleZone(row as Zone)}
              className="text-[#999999] hover:text-white text-sm font-medium"
            >
              {row.is_active ? "Disable" : "Enable"}
            </button>
            <button
              onClick={() => deleteZone(row as Zone)}
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
