import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArticlesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your articles settings and management will be displayed here.</p>
        {/* Add article management features here */}
      </CardContent>
    </Card>
  )
}

