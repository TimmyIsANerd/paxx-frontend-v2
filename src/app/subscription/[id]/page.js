"use client";

import { PaymentLayout } from "@/components/Payment/payment-layout";

export default function SubscriptionPaymentPage() {
  return (
    <PaymentLayout
      title="Pro Membership"
      amount="10.00"
      currency="USDC"
      paymentType="Monthly Subscription"
    >
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Next billing date: {new Date().toLocaleDateString()}
        </div>
        <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Subscribe Now
        </button>
        <p className="text-xs text-gray-500 text-center">
          You can cancel your subscription at any time
        </p>
      </div>
    </PaymentLayout>
  );
}
