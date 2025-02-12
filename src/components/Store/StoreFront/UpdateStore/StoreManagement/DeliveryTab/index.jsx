"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  addDeliveryFee,
  updateDeliveryFee,
  deleteDeliveryFee,
  updateStore,
} from "@/services/store";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

function DeliveryFeeComponent({
  storedId,
  location,
  price,
  onCancel,
  reloadStore,
  type = "addDeliveryFee",
  deliveryFeeId = null,
}) {
  const [formData, setFormData] = useState({
    location: location ? location : "",
    price: price ? price : "",
  });
  const [formType, setFormType] = useState(type);
  const { token } = useAuth();

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  }

  function handleFormTypeChange(newType) {
    setFormType(newType);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formType === "addDeliveryFee") {
      try {
        await addDeliveryFee(storedId, formData, token);
        reloadStore();
        onCancel();
      } catch (error) {
        if (error && error.response) {
          toast(error.response.data.message);
        } else {
          toast("Server Error, please try again later");
        }
      }
    }

    if (formType === "setDeliveryFee") {
      try {
        await updateDeliveryFee(deliveryFeeId, formData, token);
        reloadStore();
        handleFormTypeChange("updateDeliveryFee");
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleDelete() {
    try {
      await deleteDeliveryFee(deliveryFeeId, token);

      reloadStore();
    } catch (error) {
      if (error && error.response) {
        toast(error.response.data.message);
      }
    }
  }

  function handleCancel() {
    // @todo implement checks
    if (location || price) {
      handleFormTypeChange("updateDeliveryFee");
    }
    onCancel();
  }

  return (
    <form className="flex md:flex-row flex-col w-full gap-3 items-end my-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-3 w-full">
        {formType === "updateDeliveryFee" ? (
          <></>
        ) : (
          <label htmlFor="location">Location</label>
        )}
        <input
          className={`border bg-[#131B2C] border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-4 py-2 ${
            formType === "updateDeliveryFee"
              ? "ring-0 border-none focus:ring-0 hover:cursor-default"
              : ""
          }`}
          id="location"
          value={formData.location}
          onChange={handleChange}
          readOnly={formType === "updateDeliveryFee"}
        />
      </div>
      <div className="flex flex-col gap-y-3 w-full">
        {formType === "updateDeliveryFee" ? (
          <></>
        ) : (
          <label htmlFor="price">Price</label>
        )}

        <input
          className={`border bg-[#131B2C] border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full px-4 py-2 ${
            formType === "updateDeliveryFee"
              ? "ring-0 border-none focus:ring-0 hover:cursor-default"
              : ""
          }`}
          id="price"
          value={formData.price}
          onChange={handleChange}
          readOnly={formType === "updateDeliveryFee"}
        />
      </div>
      <div className="space-x-3 w-full">
        {formType === "updateDeliveryFee" ? (
          <>
            <button
              className="text-blue-500 px-4 py-2 rounded"
              type="button"
              onClick={() => handleFormTypeChange("setDeliveryFee")}
            >
              Edit
            </button>
            <button
              className="text-red-500 px-4 py-2 rounded"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-500 px-4 py-2 rounded"
              type="submit
        "
            >
              Save
            </button>
            <button
              className="bg-slate-500 px-4 py-2 rounded"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default function DeliveryTab({ store, reloadStore }) {
  const [selectIfDelivery, setSelectIfDelivery] = useState(
    store.deliveryAddress
  );
  const [selectIfDeliveryNote, setSelectIfDeliveryNote] = useState(
    store.deliveryNote
  );
  const [showAddDeliveryFee, setShowAddDeliveryFee] = useState(false);
  const { token } = useAuth();

  async function handleDeliveryAddress(e) {
    setSelectIfDelivery(e.target.value);
    try {
      await updateStore(store.id, { deliveryAddress: e.target.value }, token);
      reloadStore();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeliveryNoteChange(e) {
    setSelectIfDeliveryNote(e.target.value);
    try {
      await updateStore(store.id, { deliveryNote: e.target.value }, token);
      reloadStore();
      toast("Update successful");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-6">Delivery Fields</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPinIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-200">Delivery Address</span>
            </div>
            <form>
              <select
                className="bg-gray-700/50 py-2 px-3 rounded"
                onChange={handleDeliveryAddress}
                value={selectIfDelivery}
              >
                <option
                  className="bg-gray-700/50 rounded text-sm text-gray-300"
                  value="disabled"
                >
                  Disabled
                </option>
                <option
                  className="bg-gray-700/50 rounded text-sm text-gray-300"
                  value="required"
                >
                  Required
                </option>
              </select>
            </form>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PencilIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-200">Delivery Note</span>
            </div>
            <select
              className="bg-gray-700/50 py-2 px-3 rounded"
              onChange={(e) => {
                handleDeliveryNoteChange(e);
              }}
              value={selectIfDeliveryNote}
            >
              <option
                value="optional"
                className="bg-gray-700/50 rounded text-sm text-gray-300"
              >
                Optional
              </option>
              <option
                value="disabled"
                className="bg-gray-700/50 rounded text-sm text-gray-300"
              >
                Disabled
              </option>
              <option
                value="required"
                className="bg-gray-700/50 rounded text-sm text-gray-300"
              >
                Required
              </option>
            </select>
          </div>
        </div>
      </div>

      {selectIfDelivery === "required" && (
        <>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
            <InformationCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-500">
              Important: Please specify the regions to which you physically
              deliver orders.
            </p>
          </div>

          <div className="bg-[#131B2C] rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Delivery Fees
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Set up custom delivery fees for each location you deliver to.
            </p>
            <div>
              {store.deliveryFees.map((fee, index) => {
                return (
                  <DeliveryFeeComponent
                    key={index}
                    storedId={store.id}
                    onCancel={() => setShowAddDeliveryFee(false)}
                    reloadStore={reloadStore}
                    location={fee.location}
                    price={fee.price}
                    type="updateDeliveryFee"
                    deliveryFeeId={fee.id}
                  />
                );
              })}
            </div>
            {!showAddDeliveryFee && (
              <button
                className="text-blue-500 hover:text-blue-400 transition-colors text-sm"
                onClick={() => setShowAddDeliveryFee(true)}
              >
                + Add delivery fee
              </button>
            )}
            {showAddDeliveryFee && (
              <DeliveryFeeComponent
                storedId={store.id}
                onCancel={() => setShowAddDeliveryFee(false)}
                reloadStore={reloadStore}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
