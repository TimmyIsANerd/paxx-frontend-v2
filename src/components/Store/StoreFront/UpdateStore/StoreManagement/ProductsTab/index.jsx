"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Test",
    image: "/placeholder.svg",
    inStock: "Unlimited",
    sold: 1,
    display: true,
  },
];

export default function ProductsTab() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#131B2C] rounded-lg border border-gray-800 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-gray-300"
            } transition-colors`}
          >
            <Squares2X2Icon className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-gray-300"
            } transition-colors`}
          >
            <ListBulletIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search 1 product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-[#131B2C] border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
          + Add Products
        </button>
      </div>

      <div className="bg-[#131B2C] rounded-lg border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                In Stock
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                Sold
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                Display
              </th>
              <th className="w-px"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-400">
                      {product.inStock}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-400">{product.sold}</span>
                </td>
                <td className="px-6 py-4">
                  <Switch
                    checked={product.display}
                    onChange={() => {}}
                    className={`${
                      product.display ? "bg-emerald-500" : "bg-gray-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        product.display ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
