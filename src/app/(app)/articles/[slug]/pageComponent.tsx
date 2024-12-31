"use client";

import { Article } from "@prisma/client";
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "@/components/editor/TextEditor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import KeywordInput from "@/components/keyword/KeywordInput";
import Image from "next/image";

interface ArticleComponentProps {
  article: Article;
}

interface ArticleValues {
  title: string;
  content: string;
  coverImage: string | null;
  keywords: string[];
  metaDescription: string | null;
}

export default function ArticleComponent({
  article: initialArticle,
}: ArticleComponentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  // control,
  const {  handleSubmit, setValue, watch } = useForm<ArticleValues>({
    defaultValues: {
      title: initialArticle.title,
      content: initialArticle.content,
      coverImage: initialArticle.coverImage,
      keywords: initialArticle.keywords,
      metaDescription: initialArticle.metaDescription,
    },
  });

  const handleSave = async (data: ArticleValues) => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/articles/${initialArticle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Article updated successfully");
        setIsEditing(false);
        router.refresh();
      } else {
        throw new Error(result.error || "Failed to update article");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to update article");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/articles/${initialArticle.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete article");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Article deleted successfully");
        router.push("/ai-articles");
      } else {
        throw new Error(result.error || "Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete article");
    } finally {
      setIsDeleting(false);
    }
  };

  const formValues = watch();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/articles"
          className="inline-flex items-center text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AI Articles
        </Link>

        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Article
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your article.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            onClick={isEditing ? handleSubmit(handleSave) : () => setIsEditing(true)}
            variant={isEditing ? "default" : "outline"}
            disabled={isSaving}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </>
            ) : (
              "Edit Article"
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cover Image Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Cover Image</h3>
          {formValues.coverImage && (
            <div className="relative w-full h-[300px] mb-4">
              {/* @eslint-ignore @next/next/no-img-element */}
              <Image
                src={formValues.coverImage}
                alt={formValues.title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                width = {1200}
                height={400}
              />
            </div>
          )}
          {isEditing && (
            <Input
              type="url"
              placeholder="Enter cover image URL"
              value={formValues.coverImage || ''}
              onChange={(e) => setValue('coverImage', e.target.value)}
              className="mt-2"
            />
          )}
        </Card>

        {/* Title and Description Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              {isEditing ? (
                <Input
                  value={formValues.title}
                  onChange={(e) => setValue('title', e.target.value)}
                  className="text-2xl font-bold"
                />
              ) : (
                <h1 className="text-3xl font-bold">{formValues.title}</h1>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              {isEditing ? (
                <Textarea
                  value={formValues.metaDescription || ''}
                  onChange={(e) => setValue('metaDescription', e.target.value)}
                  className="h-24"
                />
              ) : (
                <p className="text-lg text-muted-foreground">{formValues.metaDescription}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Keywords Section */}
        {/* <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Keywords</h3>
          {isEditing ? (
            <KeywordInput control={control} />
          ) : (
            <div className="flex flex-wrap gap-2">
              {formValues.keywords.map((keyword) => (
                <div key={keyword} className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-sm">
                  {keyword}
                </div>
              ))}
            </div>
          )}
        </Card> */}

        {/* Content Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content</h3>
          {isEditing ? (
            <TextEditor
              value={formValues.content}
              onChange={(html) => setValue('content', html)}
            />
          ) : (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: formValues.content }}
            />
          )}
        </Card>

        {/* Meta Description Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Meta Description</h3>
          {isEditing ? (
            <Textarea
              value={formValues.metaDescription || ''}
              onChange={(e) => setValue('metaDescription', e.target.value)}
              className="h-24"
            />
          ) : (
            <p className="text-muted-foreground">{formValues.metaDescription}</p>
          )}
        </Card>
      </div>
    </div>
  );
}

