"use client";

import { useState } from "react";

export default function Modal({ title, content, confirm }) {
  const [modal, setModal] = useState(true);

  return (
    <div
      className={`z-40 fixed top-0 left-0 ${
        modal ? "flex" : "hidden"
      } items-center justify-center w-full h-full bg-black bg-opacity-30`}
    >
      <div className="p-4">
        <div className="relative p-6 py-11 bg-gray-900 bg-opacity-30 max-w-lg text-center w-full rounded-3xl">
          <h3 className="mb-4 text-3xl font-medium text-white tracking-3xl">
            {title ? title : "Unsaved Changes"}
          </h3>
          <p className="mb-8 text-white">
            {content ? content : "Do you want to save or discard changes?"}
          </p>
          <div className="flex flex-wrap justify-center -m-2">
            <div className="w-auto p-2">
              <button
                onClick={() => setModal(false)}
                className="px-14 py-4 text-white font-medium tracking-2xl hover:bg-transparent hover:text-[#005BFE] border-2 border-white focus:border-[#005BFE] focus:border-opacity-40 hover:border-[#005BFE] focus:ring-4 focus:ring-[#005BFE] focus:ring-opacity-40 rounded-full  flex items-center justify-center"
                href="#"
              >
                Cancel
              </button>
            </div>
            <div className="w-auto p-2">
              <a
                className="inline-block px-14 py-4 font-medium tracking-2xl border-2 border-[#005BFE] bg-[#005BFE]  focus:ring-[#005BFE] focus:ring-4 focus:ring-opacity-40 rounded-full transition duration-700 hover:shadow-[#005BFE] hover:shadow-2xl"
                href="#"
              >
                Confirm
              </a>
            </div>
          </div>
          <a
            onClick={() => {
              confirm();
            }}
            className="absolute top-6 right-6"
            href="#"
          >
            <img src="https://static.shuffle.dev/components/preview/697340ff-5445-426e-84bf-57e856b9afbf/assets/public/nightsable-assets/images/modals/close-icon.png" />
          </a>
        </div>
      </div>
    </div>
  );
}
