"use client";

import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import OrdersTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/OrdersTab";
import ProductsTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/ProductsTab";
import CustomizeTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/CustomizeTab";
import DiscountTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/DiscountTab";
import DeliveryTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/DeliveryTab";
import AfterPurchaseTab from "@/components/Store/StoreFront/UpdateStore/StoreManagement/AfterPurchaseTab";

const tabs = [
  { id: "orders", label: "Orders" },
  { id: "products", label: "Products" },
  { id: "customize", label: "Customize Storefront" },
  { id: "discounts", label: "Discount Codes", badge: "NEW" },
  { id: "delivery", label: "Delivery", badge: "1" },
  { id: "after-purchase", label: "After Purchase" },
];

export default function StoreManagement() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-[#0B0F1C] p-6 w-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Test</h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Preview
            </button>
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Copy Link
            </button>
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-b border-gray-800">
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
        <div className="mt-6 max-h-full overflow-y-auto">
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "customize" && <CustomizeTab />}
          {activeTab === "discounts" && <DiscountTab />}
          {activeTab === "delivery" && <DeliveryTab />}
          {activeTab === "after-purchase" && <AfterPurchaseTab />}
        </div>
      </div>
    </div>
  );
}
