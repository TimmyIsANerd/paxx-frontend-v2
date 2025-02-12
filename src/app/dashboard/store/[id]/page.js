"use client";

import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import OrdersTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/OrdersTab";
import ProductsTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/ProductsTab";
import CustomizeTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/CustomizeTab";
import DiscountTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/DiscountTab";
import DeliveryTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/DeliveryTab";
import AfterPurchaseTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/AfterPurchaseTab";
import { getStore } from "@/services/store";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { updateProduct, deleteProduct } from "@/services/product";

const tabs = [
  { id: "orders", label: "Orders" },
  { id: "products", label: "Products" },
  { id: "customize", label: "Customize Storefront" },
  { id: "discounts", label: "Discount Codes", badge: "COMING SOON" },
  { id: "delivery", label: "Delivery", badge: "1" },
  { id: "after-purchase", label: "After Purchase" },
];

export default function StoreManagement() {
  const [activeTab, setActiveTab] = useState("orders");
  const [store, setStore] = useState();
  const { token } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  async function loadStore() {
    try {
      const store = await getStore(id, token);
      setStore(store);
      console.log(store);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadStore();
  }, [id]);

  async function handleUpdate(payload, token) {
    try {
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function handleProductDisplay(id, payload) {
    try {
      await updateProduct(id, payload, token);
      toast(`Set Product Display to ${payload.display ? "On" : "Off"}`);
      loadStore(); // reload the store
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function handleProductDelete(id) {
    try {
      await deleteProduct(id, token);
      loadStore();
      toast("Product deleted");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function handleCopyLink(src) {
    navigator.clipboard
      .writeText(src)
      .then(() => {
        toast("Preview Link Copied");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  }

  return (
    <div className="min-h-screen max-h-screen bg-white/5 p-6 w-full  overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            {store && store.storeName}
          </h1>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-gradient-to-r from-[#005BFE] to-[#00A1FE] text-white rounded-lg font-medium hover:opacity-90 transition-opacity relative group flex justify-center">
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#005BFE]/50 to-[#00A1FE]/50 opacity-0 group-hover:opacity-100 blur-xl rounded-lg transition-opacity" />
              <span className="relative text-sm">Preview</span>
            </button>

            <button
              className="px-6 py-2 bg-[#131B2C] border border-gray-800 text-gray-400 hover:text-white rounded-lg font-medium transition-colors text-sm"
              onClick={() => handleCopyLink(store.storeLink)}
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-b border-gray-800 max-w-full overflow-x-auto">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-1 ${
                  activeTab === tab.id
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                } transition-colors`}
              >
                <div className="flex items-center gap-2">
                  {tab.label}
                  {tab.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-xs rounded-full ${
                        tab.badge === "NEW"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        {loading ? (
          <div className="mt-6 h-full">
            {activeTab === "orders" && <OrdersTab store={store} />}
            {activeTab === "products" && (
              <ProductsTab
                store={store}
                reloadStore={loadStore}
                handleProductDisplay={handleProductDisplay}
                handleProductDelete={handleProductDelete}
              />
            )}
            {activeTab === "customize" && (
              <CustomizeTab store={store} reloadStore={loadStore} />
            )}
            {activeTab === "discounts" && <DiscountTab />}
            {activeTab === "delivery" && (
              <DeliveryTab reloadStore={loadStore} store={store} />
            )}
            {activeTab === "after-purchase" && (
              <AfterPurchaseTab
                store={store}
                handleUpdate={handleUpdate}
                reloadStore={loadStore}
              />
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
