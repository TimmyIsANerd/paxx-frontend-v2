import BalanceOverview from "@/components/Dashboard/BalanceOverview";
import TransactionHistory from "@/components/Dashboard/TransactionHistory";

export default function PayoutPage() {
  return (
    <div className="p-6 w-full my-3 max-h-screen overflow-y-auto">
      <BalanceOverview />
      {/* <TransactionHistory /> */}
    </div>
  );
}
