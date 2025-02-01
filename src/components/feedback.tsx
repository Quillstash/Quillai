import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function FeedbackCard() {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Feedback & Support</CardTitle>
        <CardDescription>
          We value your input and are here to help!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Have feedback or need support?{" "}
          <span className="font-bold">Join our Discord community</span> to share
          your thoughts or get assistance from our team and other users.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a
            href="https://discord.gg/PN85bBuuqg"
            className="cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our Discord <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
