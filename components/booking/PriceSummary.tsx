"use client";

import { BookingFormData, DumpsterSizeOption } from "@/types/booking";
import { formatDate, formatCurrency } from "@/lib/utils/formatting";

interface PriceSummaryProps {
  size?: DumpsterSizeOption;
  rentalDays?: number;
  deliveryFee?: number;
  subtotal?: number;
  tax?: number;
  total?: number;
  compact?: boolean;
}

export function PriceSummary({
  size,
  rentalDays,
  deliveryFee = 0,
  subtotal = 0,
  tax = 0,
  total = 0,
  compact = false,
}: PriceSummaryProps) {
  const computedTotal =
    Math.round((subtotal + deliveryFee + tax + Number.EPSILON) * 100) / 100;
  const displayTotal = computedTotal;

  if (compact) {
    return (
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <p className="text-xs font-semibold text-[#999999] uppercase mb-2">
          Estimated Total
        </p>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(displayTotal)}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6 space-y-4">
      <div className="border-b border-[#404040] pb-4">
        <h3 className="text-lg font-bold text-white mb-3">Price Breakdown</h3>

        {/* Size info */}
        {size && rentalDays && (
          <div className="mb-4">
            <p className="text-sm text-[#999999] mb-1">
              {size.name} × {rentalDays} days
            </p>
            <p className="flex justify-between text-white">
              <span>Rental Fee:</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </p>
          </div>
        )}

        {/* Line items */}
        {subtotal > 0 && (
          <>
            <div className="flex justify-between text-white text-sm mb-2">
              <span className="text-[#999999]">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-white text-sm mb-2">
              <span className="text-[#999999]">Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>

            {tax > 0 && (
              <div className="flex justify-between text-white text-sm mb-2">
                <span className="text-[#999999]">Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4">
        <span className="font-semibold text-white">Total Due</span>
        <span className="text-3xl font-bold text-primary">
          {formatCurrency(displayTotal)}
        </span>
      </div>

      <p className="text-xs text-[#999999] pt-2 border-t border-[#404040]">
        Prices are locked at booking. No hidden fees or surprises!
      </p>
    </div>
  );
}

interface BookingDetailsPanelProps {
  booking: Partial<BookingFormData>;
  size?: DumpsterSizeOption;
  onEdit?: (step: string) => void;
}

export function BookingDetailsPanel({
  booking,
  size,
  onEdit,
}: BookingDetailsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Size */}
      {size && (
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-4 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase mb-1">
              Dumpster Size
            </p>
            <p className="text-lg font-bold text-white">{size.name}</p>
          </div>
          {onEdit && (
            <button
              onClick={() => onEdit("size")}
              className="text-primary hover:text-primary-light text-sm font-semibold transition-colors"
            >
              Change
            </button>
          )}
        </div>
      )}

      {/* Dates */}
      {booking.delivery_date && (
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-4 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase mb-1">
              Rental Period
            </p>
            <p className="text-white mb-1">
              Delivery:{" "}
              <span className="font-semibold">
                {formatDate(booking.delivery_date)}
              </span>
            </p>
            {booking.pickup_date && (
              <p className="text-white">
                Pickup:{" "}
                <span className="font-semibold">
                  {formatDate(booking.pickup_date)}
                </span>
              </p>
            )}
            {booking.rental_duration_days && (
              <p className="text-xs text-[#999999] mt-2">
                Duration: {booking.rental_duration_days} days
              </p>
            )}
          </div>
          {onEdit && (
            <button
              onClick={() => onEdit("dates")}
              className="text-primary hover:text-primary-light text-sm font-semibold transition-colors"
            >
              Change
            </button>
          )}
        </div>
      )}

      {/* Address */}
      {booking.delivery_address_line_1 && (
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-4 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase mb-1">
              Delivery Address
            </p>
            <p className="text-white">
              {booking.delivery_address_line_1}
              {booking.delivery_address_line_2 && (
                <span> {booking.delivery_address_line_2}</span>
              )}
            </p>
            <p className="text-sm text-[#999999] mt-1">
              {booking.delivery_city}, {booking.delivery_state}{" "}
              {booking.delivery_zip}
            </p>
          </div>
          {onEdit && (
            <button
              onClick={() => onEdit("address")}
              className="text-primary hover:text-primary-light text-sm font-semibold transition-colors"
            >
              Change
            </button>
          )}
        </div>
      )}

      {/* Customer */}
      {booking.customer_full_name && (
        <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-4 flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase mb-1">
              Contact Information
            </p>
            <p className="text-white">{booking.customer_full_name}</p>
            <p className="text-sm text-[#999999]">{booking.customer_email}</p>
            <p className="text-sm text-[#999999]">{booking.customer_phone}</p>
          </div>
          {onEdit && (
            <button
              onClick={() => onEdit("details")}
              className="text-primary hover:text-primary-light text-sm font-semibold transition-colors"
            >
              Change
            </button>
          )}
        </div>
      )}
    </div>
  );
}
