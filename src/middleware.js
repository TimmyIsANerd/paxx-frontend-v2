import { NextResponse } from "next/server";
const baseURL =
  process.env.NODE_ENV == "production"
    ? "https://app.usepaxx.xyz"
    : "http://localhost:3000";

export function middleware(request) {
  // const url = request.url;
  // if (url.includes("/login") || url.includes("/signup")) {
  //   const cookie = request.cookies.get("paxx_user");

  //   if (cookie) {
  //     console.log(
  //       `Checking For Cookie on Auth Page`,
  //       cookie ? "Cookie Found 🍪" : "No Cookie ❌"
  //     );
  //     return NextResponse.redirect(`${baseURL}/dashboard`);
  //   }
  // }

  // if (url.includes("/dashboard")) {
  //   const cookie = request.cookies.get("paxx_user");
  //   if (!cookie) {
  //     console.log(
  //       `Checking For Cookie on Dashboard Page`,
  //       cookie ? "Cookie Found 🍪" : "No Cookie ❌"
  //     );
  //     return NextResponse.redirect(`${baseURL}/auth/login`);
  //   }
  // }
}
