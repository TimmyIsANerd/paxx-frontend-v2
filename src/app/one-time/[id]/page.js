"use client";

import { PaymentLayout } from "@/components/Payment/payment-layout";

export default function OneTimePaymentPage() {
  return (
    <PaymentLayout
      title="Full Stack Development Course"
      amount="3.00"
      currency="SOL"
      paymentType="One-Time Payment"
    >
      <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
        Pay Now
      </button>
    </PaymentLayout>
  );
}
