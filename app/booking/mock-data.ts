// Mock data for booking flow - will be replaced with database queries

import { DumpsterSizeOption } from "@/types/booking";

export const MOCK_SIZES: DumpsterSizeOption[] = [
  {
    id: "size-15",
    size_yards: 15,
    name: "15 Yard",
    description: "Our most popular size for medium projects",
    price_base: 325,
    price_per_day: 5,
    dimensions: { length: 17, width: 8, height: 4 },
    ideal_for: [
      "Kitchen/bathroom remodels",
      "Garage cleanouts",
      "Roofing projects",
      "Estate cleanouts",
    ],
  },
];
