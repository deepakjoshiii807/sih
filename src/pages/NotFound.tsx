import { Link } from "react-router";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-32 px-4">
        <div className="bg-[#FAF8F2] ink-border paper-shadow p-10 text-center max-w-sm">
          <p className="heading-xl text-5xl text-[#1A1A1A] mb-2">404</p>
          <p className="text-[13px] text-[#7A7570] mb-6 body-lg">The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn-paper btn-ink">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
