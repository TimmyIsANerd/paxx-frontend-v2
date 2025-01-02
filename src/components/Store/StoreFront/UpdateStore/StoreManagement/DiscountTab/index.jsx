import { toast } from "react-toastify";

export default function DiscountTab() {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-gray-200 mb-2">No discounts</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Drive sales and increase order size with targeted discounts.
      </p>
      <button
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        onClick={() => toast.success("Feature in Development")}
      >
        + New Discount Code
      </button>
    </div>
  );
}
