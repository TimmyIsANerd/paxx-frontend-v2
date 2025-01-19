"use client";

import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { storeBaseUrl } from "@/config";
import { updateStore } from "@/services/store";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function AfterPurchaseTab({ store, reloadStore }) {
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(true);
  const [formData, setFormData] = useState({
    redirectAfterPurchase: `${storeBaseUrl}/${store.storeLink}/thank-you`,
    customSuccessMessage: "Thank you for the Purchase",
  });
  const { token } = useAuth();

  function handleChange(e) {
    const { value, id } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStore(store.id, formData, token);
      toast("Update Successful");
    } catch (error) {
      console.error(error);
      toast("Failed to update after purchase settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            Redirect after payment
            <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          </h3>
          <input
            type="url"
            readOnly={editable}
            value={formData.redirectAfterPurchase}
            className={`w-full px-4 py-2 ${
              editable ? "bg-slate-400" : "bg-[#131B2C]"
            } border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            id="redirectAfterPurchase"
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            Success message
            <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          </h3>
          <input
            type="text"
            readOnly={editable}
            value={formData.customSuccessMessage}
            onChange={handleChange}
            id="customSuccessMessage"
            className={`w-full px-4 py-2  ${
              editable ? "bg-slate-400" : "bg-[#131B2C]"
            } border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-[#131B2C] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            onClick={() => setEditable(!editable)}
            type="button"
          >
            Edit
          </button>
          {!editable && (
            <button
              className="px-4 py-2 bg-blue-500 border border-blue-800 rounded-lg text-white hover:border-blue-500 transition-colors"
              disabled={loading}
              type="submit"
            >
              {loading ? "Updating..." : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
