import { cache } from "react";
import { getPricingConfig } from "@/lib/admin/config";

function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(2);
}

export type LivePricingSnapshot = {
  sizeName: string;
  sizeYards: number;
  basePrice: number;
  perDayPrice: number;
  basePriceLabel: string;
  perDayPriceLabel: string;
};

const DEFAULT_SNAPSHOT: LivePricingSnapshot = {
  sizeName: "15 Yard",
  sizeYards: 15,
  basePrice: 325,
  perDayPrice: 5,
  basePriceLabel: "325",
  perDayPriceLabel: "5",
};

export const getLivePricingSnapshot = cache(
  async (): Promise<LivePricingSnapshot> => {
    const pricing = await getPricingConfig();
    const activeSizes = pricing
      .filter((item) => item.is_active)
      .sort((a, b) => Number(a.size_yards) - Number(b.size_yards));

    const primary =
      activeSizes.find((item) => Number(item.size_yards) === 15) ||
      activeSizes[0];

    if (!primary) {
      return DEFAULT_SNAPSHOT;
    }

    const basePrice = Number(primary.price_base);
    const perDayPrice = Number(primary.price_per_day);

    return {
      sizeName: primary.name,
      sizeYards: Number(primary.size_yards),
      basePrice,
      perDayPrice,
      basePriceLabel: formatPrice(basePrice),
      perDayPriceLabel: formatPrice(perDayPrice),
    };
  },
);
