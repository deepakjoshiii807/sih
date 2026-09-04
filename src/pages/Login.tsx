import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.replace("/auth/login.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F0]">
      <p className="text-sm text-gray-400">Loading authentication...</p>
    </div>
  );
}
