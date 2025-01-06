"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import {
  getAllStores,
  switchStatus,
  storeUrl,
  deleteStore,
} from "@/services/store";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function StoreTable() {
  const [stores, setStores] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { push } = useRouter();

  async function loadStores() {
    setLoading(true);
    try {
      const stores = await getAllStores(token);
      setStores(stores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  const handleToggleStatus = async (id) => {
    const status = !stores.find((store) => store.id === id).status;

    try {
      await switchStatus(id, { status }, token);

      setStores((prev) =>
        prev.map((store) =>
          store.id === id ? { ...store, status: !store.status } : store
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStore = async (id) => {
    try {
      await deleteStore(id, token);
      toast("Store Deleted Successfully");
      loadStores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          {stores.length > 0 ? (
            <div className="w-full bg-white dark:bg-[#131B2C] rounded-lg border border-gray-200 dark:border-gray-800 shadow overflow-hidden relative">
              <div className="overflow-x-auto relative">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Name
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Orders
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Revenue
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Link
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {stores.map((store) => (
                      <tr
                        key={store.id}
                        className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative overflow-clip hover:cursor-pointer"
                        onClick={() => push(`/dashboard/store/${store.id}`)}
                      >
                        <td className="px-6 py-4 hover:cursor-pointer">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {store.storeName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {store.totalNoOfOrders}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {store.revenue}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4">
                          <Switch
                            checked={store.status}
                            onChange={() => handleToggleStatus(store.id)}
                            className={`${
                              store.status
                                ? "bg-blue-500"
                                : "bg-gray-200 dark:bg-gray-700"
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                          >
                            <span
                              className={`${
                                store.status ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                            />
                          </Switch>
                        </td> */}
                        <td className="px-6 py-4">
                          <Link
                            href={storeUrl + "/" + store.storeLink}
                            className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                            target="_blank"
                          >
                            Preview
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/dashboard/store/${store.id}`}
                              className="p-1 hover:text-purple-500 transition-colors"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteStore(store.id)}
                              className="p-1 hover:text-red-500 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <h3>No Stores</h3>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}
