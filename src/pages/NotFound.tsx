import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import { PixelMagnifier } from "@/components/PixelIcons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-32 px-4">
        <div className="pixel-card bg-card p-10 text-center max-w-sm">
          <div className="w-16 h-16 bg-cream-dark border-[3px] border-ink shadow-[4px_4px_0px_var(--ink)] flex items-center justify-center mx-auto mb-4">
            <PixelMagnifier className="text-ink-muted" size={28} />
          </div>
          <p className="text-5xl font-extrabold text-ink mb-2 pixel">404</p>
          <p className="text-[13px] text-ink-muted mb-6 sans">The page you're looking for doesn't exist.</p>
          <Link to="/" className="pixel-btn pixel-btn-primary justify-center w-full">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
