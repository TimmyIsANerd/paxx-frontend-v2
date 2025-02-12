import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { WalletContextProvider } from "@/context/WalletContext";

export const metadata = {
  title: "Paxx Payments | Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <WalletContextProvider>
      <main className="max-h-screen">
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          {children}
        </div>
      </main>
    </WalletContextProvider>
  );
}
