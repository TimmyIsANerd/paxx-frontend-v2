import Image from "next/image";
import Modal from "@/components/Modal";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");
  return (
    <>
      <Modal />
    </>
  );
}
