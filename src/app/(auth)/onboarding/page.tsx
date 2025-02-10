import getSession from "@/auth/session";
import PageComponent from "./page-component";
import { redirect } from "next/navigation";
import db from "@/lib/db";

async function Page() {
  const session = await getSession();

  // 1. First check if session exists at all
  if (!session?.user) {
    return redirect("/auth/signin"); // Or your login page
  }

  // 2. Add type safety check
  const onboardingCompleted = !!session.user.onboardingCompleted;

  // 3. Add direct database verification (optional but recommended)
  let dbUser = null;
  try {
    dbUser = await db.user.findUnique({
      where: { id: session.user.id },
      select: { onboardingCompleted: true },
    });
  } catch (error) {
    console.error("Database check failed:", error);
    // Consider logging to error tracking service
  }

  // 4. Final verification logic
  if (onboardingCompleted || dbUser?.onboardingCompleted) {
    return redirect("/articles");
  }

  return <PageComponent />;
}

export default Page;