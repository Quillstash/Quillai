import { KeywordSearchContainer } from "@/components/keyword/KeywordSearch";
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function KeywordSearchPage() {



  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <KeywordSearchContainer />
    </div>
  )
}

