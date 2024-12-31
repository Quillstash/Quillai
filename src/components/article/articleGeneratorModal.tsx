import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2 } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Article } from "@prisma/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  keyword: z
    .string()
    .min(1, "Keyword is required")
    .max(50, "Keyword is too long"),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerationStart: () => void;
  onArticleGenerated: (article: Article) => void;
  onGenerationError: () => void;
}

export function ArticleGeneratorModal({
  isOpen,
  onClose,
  onGenerationStart,
  onArticleGenerated,
  onGenerationError,
}: ArticleGeneratorModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { data: session } = useSession();
  const [creditError, setCreditError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const handleGenerate = async (data: FormValues) => {
    if (!session?.user?.id) {
      console.error("User is not authenticated");
      onGenerationError();
      return;
    }

    setIsGenerating(true);
    onClose();
    onGenerationStart();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: data.keyword,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error === 'INSUFFICIENT_CREDITS') {
          setCreditError('You have insufficient credits. Please purchase more credits to continue using our services.')
          onClose()
          onGenerationError()
          return
        }
        throw new Error(`Failed to generate article: ${response.status}`)
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get response reader");
      }

      let fullContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        fullContent += chunk;
        console.log("Received chunk:", chunk);
      }

      console.log("Full content:", fullContent);

      // For now, we'll pass the full content as the article
      // You might want to parse this content into a proper Article object
      onArticleGenerated(fullContent as unknown as Article);
      reset();
    } catch (error) {
      console.error("Failed to generate article:", error);
      onGenerationError();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate New Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleGenerate)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="keyword" className="text-sm font-medium">
              Keyword
            </label>
            <Input
              id="keyword"
              placeholder="Enter a keyword..."
              {...register("keyword")}
              className={errors.keyword ? "border-red-500" : ""}
            />
            {errors.keyword && (
              <p className="text-sm text-red-500">{errors.keyword.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !session?.user}
            className="w-full"
          >
            {isGenerating ? (
              "Generating..."
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate Article
              </>
            )}
          </Button>
          {!session?.user && (
            <p className="text-sm text-red-500">
              You must be logged in to generate articles.
            </p>
          )}
        </form>
      </DialogContent>
      {creditError && (
        <Dialog open={!!creditError} onOpenChange={() => setCreditError(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insufficient Credits</DialogTitle>
            </DialogHeader>
            <Alert variant="destructive">
              <AlertTitle>Credit Balance Too Low</AlertTitle>
              <AlertDescription>{creditError}</AlertDescription>
            </Alert>
            <Button
              onClick={() => (window.location.href = "/pricing")}
              className="w-full"
            >
              Purchase Credits
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
