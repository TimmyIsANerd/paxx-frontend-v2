import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Paxx Payments | Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <main className="max-h-screen">
      <Navbar />
      <ToastContainer
        toastClassName="bg-black text-[#005BFE] border-2 border-[#005BFE] rounded-md shadow-2xl shadow-[#005BFE]"
        bodyClassName="font-semibold text-center md:text-left text-sm text-black"
        hideProgressBar={true}
        closeButton={false}
        position="top-right"
        closeOnClick={true}
      />
      <div className="flex items-start">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
