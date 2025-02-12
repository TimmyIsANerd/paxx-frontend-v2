import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import { AuthContextProvider } from "@/context/AuthContext";
import LoadingBar from "@/components/Loading/Bar";
import AppWalletProvider from "@/components/Web3/AppWalletProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Paxx Payment Systems",
  description: "Empowering Payments Without Boundaries",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <AppWalletProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <LoadingBar />
            {children}
            <ToastContainer
              toastClassName="bg-black text-[#005BFE] border-2 border-[#005BFE] rounded-md shadow-2xl shadow-[#005BFE]"
              bodyClassName="font-semibold text-center md:text-left text-sm text-black"
              hideProgressBar={true}
              closeButton={false}
              position="top-right"
              closeOnClick={true}
            />
          </body>
        </html>
      </AppWalletProvider>
    </AuthContextProvider>
  );
}
