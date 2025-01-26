"use client";

import ComparisonTable from "./components/comparisonTable";
// import { useRouter } from "next/navigation";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { PainPoints } from "./components/Painpoints";
import { Pricing } from "./components/pricing";
import { Testimonials } from "./components/Testimonials";
// import WorkflowComparison from "./components/workFlow";

function Page() {
  //   const router = useRouter();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     // Replace with your session-checking logic
  //     const session = await getSession(); // Example session-checking function
  //     if (session) {
  //       router.replace('/articles'); // Redirect to /articles if session exists
  //     }
  //   };

  //   checkSession();
  // }, [router]);

  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      {/* <WorkflowComparison /> */}
      <PainPoints />
      <Features />
      <Testimonials />
      <ComparisonTable />
      <Pricing />
      <FAQ />
      {/* <Footer /> */}
    </div>
  );
}

export default Page;
