"use client";
import { useState } from "react";
import StoreHeader from "@/components/Store/StoreFront/Filter";
import StoreTable from "@/components/Store/StoreFront/Table";
import NewStorefrontModal from "@/components/Store/StoreFront/NewStoreModal";

export default function StorePage() {
  const [openNewStoreFrontModal, setOpenNewStoreFrontModal] = useState(false);


  return (
    <>
      <div className="w-full my-3 p-3">
        <div>
          <h3 className="font-medium text-3xl">Store Fronts</h3>
          <p></p>
        </div>
        <StoreHeader openStore={() => setOpenNewStoreFrontModal(true)} />
        <StoreTable />
        {openNewStoreFrontModal && (
          <NewStorefrontModal
            onClose={() => setOpenNewStoreFrontModal(false)}
          />
        )}
      </div>
    </>
  );
}
