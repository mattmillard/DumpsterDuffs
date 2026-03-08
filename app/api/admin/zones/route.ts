import { NextResponse } from "next/server";
import {
  getZonesConfig,
  setZonesConfig,
  type ServiceZone,
} from "@/lib/admin/config";

export async function GET() {
  try {
    const zones = await getZonesConfig();
    return NextResponse.json(zones);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load zones" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ServiceZone>;
    const zones = await getZonesConfig();

    const newZone: ServiceZone = {
      id: crypto.randomUUID(),
      name: body.name || "New Zone",
      zone_type: body.zone_type || "Zipcode",
      delivery_fee: Number(body.delivery_fee || 0),
      is_active: body.is_active ?? true,
    };

    const updated = [newZone, ...zones];
    await setZonesConfig(updated);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create zone" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<ServiceZone>;

    if (!body?.id) {
      return NextResponse.json({ error: "Zone id is required" }, { status: 400 });
    }

    const deliveryFee = Number(body.delivery_fee);
    if (!Number.isFinite(deliveryFee) || deliveryFee < 0) {
      return NextResponse.json(
        { error: "Delivery fee must be a valid non-negative number" },
        { status: 400 },
      );
    }

    const zones = await getZonesConfig();
    const existingIndex = zones.findIndex((zone) => zone.id === body.id);

    if (existingIndex === -1) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 });
    }

    const updated = zones.map((zone) =>
      zone.id === body.id
        ? {
            ...zone,
            name: String(body.name ?? zone.name),
            zone_type: String(body.zone_type ?? zone.zone_type),
            delivery_fee: deliveryFee,
            is_active: Boolean(body.is_active),
          }
        : zone,
    );

    await setZonesConfig(updated);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update zone" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id: string };

    if (!id) {
      return NextResponse.json({ error: "Zone id is required" }, { status: 400 });
    }

    const zones = await getZonesConfig();
    const exists = zones.some((zone) => zone.id === id);
    if (!exists) {
      return NextResponse.json({ error: "Zone not found" }, { status: 404 });
    }

    const updated = zones.filter((zone) => zone.id !== id);

    await setZonesConfig(updated);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete zone" },
      { status: 500 },
    );
  }
}
