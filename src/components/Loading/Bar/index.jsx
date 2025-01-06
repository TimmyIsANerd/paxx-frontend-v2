"use client";

import { Suspense, useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";

function LoadingBarComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
  }, []);

  useEffect(() => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 300);
  }, [pathname, searchParams]);

  return null;
}

export default function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <LoadingBarComponent />
    </Suspense>
  );
}
