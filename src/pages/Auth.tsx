import { CinematicHero } from "@/components/ui/cinematic-hero";

export default function Auth() {
  return (
    <div className="min-h-screen">
      <CinematicHero
        brandName="L2L"
        tagline1="Build the skills,"
        tagline2="bridge the gap."
        cardHeading="Evidence-backed skill profiles."
        cardDescription={
          <>
            <span className="text-white font-semibold">Lead2Learn</span> connects students with industry through verified skills, semantic matching, and real opportunity discovery.
          </>
        }
        metricValue={340}
        metricLabel="Verified Skills"
        ctaHeading="Start your journey."
        ctaDescription="Join thousands of students bridging the gap between academics and industry."
      />
    </div>
  );
}
