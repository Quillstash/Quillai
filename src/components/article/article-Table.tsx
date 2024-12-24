import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Article } from "@prisma/client";
import { format } from "date-fns";
import { DeleteConfirmationModal } from "./delete-confirm";
import Link from "next/link";

interface ArticlesTableProps {
  articles: Article[];
  generationStatus: {
    id?: string;
    status: "generating" | "success" | "error";
    message?: string;
  } | null;
  isRefreshing: boolean;
  onRefresh: () => void;
}

type SortConfig = {
  key: keyof Article;
  direction: "asc" | "desc";
} | null;

export function ArticlesTable({
  articles,
  generationStatus,
  isRefreshing,
  onRefresh,
}: ArticlesTableProps) {
  const [selectedArticles, setSelectedArticles] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter articles based on search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort articles based on current sort configuration
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Article) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedArticles(new Set(sortedArticles.map((article) => article.id)));
    } else {
      setSelectedArticles(new Set());
    }
  };

  const handleSelectArticle = (articleId: string, checked: boolean) => {
    const newSelected = new Set(selectedArticles);
    if (checked) {
      newSelected.add(articleId);
    } else {
      newSelected.delete(articleId);
    }
    setSelectedArticles(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedArticles.size === 0) return;

    try {
      const deletePromises = Array.from(selectedArticles).map(
        async (articleId) => {
          const response = await fetch(`/api/articles/${articleId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(
              error.error || `Failed to delete article ${articleId}`
            );
          }
          return articleId;
        }
      );

      await Promise.all(deletePromises);
      setSelectedArticles(new Set());
      onRefresh();
    } catch (error) {
      console.error("Error deleting articles:", error);
    }
  };

  const SortIndicator = ({ columnKey }: { columnKey: keyof Article }) => {
    if (sortConfig?.key !== columnKey) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4 inline" />
    );
  };

  const getGeneratingStateLabel = (state: string) => {
    const stateMap: { [key: string]: string } = {
      GENERATING: "Generating",
      GENERATED: "Generated",
      DRAFT: "Draft",
    };
    return stateMap[state] || state;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search articles..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedArticles.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="group relative"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="absolute invisible group-hover:visible bg-black text-white text-xs py-1 px-2 rounded -top-8 whitespace-nowrap">
              Delete selected ({selectedArticles.size})
            </span>
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    sortedArticles.length > 0 &&
                    sortedArticles.every((article) =>
                      selectedArticles.has(article.id)
                    )
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title <SortIndicator columnKey="title" />
              </TableHead>
              <TableHead>Keywords</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("generatingState")}
              >
                Status <SortIndicator columnKey="generatingState" />
              </TableHead>
              <TableHead>Created By</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Created <SortIndicator columnKey="createdAt" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedArticles.map((article) => (
              <TableRow
                key={article.id}
                className={`
                  h-16
                  ${
                    generationStatus?.id === article.id
                      ? "bg-purple-50"
                      : selectedArticles.has(article.id)
                      ? "bg-slate-50"
                      : ""
                  }
                  hover:bg-slate-100
                `}
              >
                <TableCell className="py-4">
                  <Checkbox
                    checked={selectedArticles.has(article.id)}
                    onCheckedChange={(checked) =>
                      handleSelectArticle(article.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  
                    <Link
                      href={`articles/${article.slug}`}
                      className={`hover:underline ${
                        isRefreshing ? "pointer-events-none" : ""
                      }`}
                    >
                      {article.title}
                    </Link>
               
                </TableCell>
                <TableCell className="py-4">{article.keywords}</TableCell>
                <TableCell className="py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      article.generatingState === "GENERATED"
                        ? "bg-green-100 text-green-700"
                        : article.generatingState === "GENERATING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {getGeneratingStateLabel(article.generatingState)}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={article.author.image || undefined}
                        alt={article.author.name || undefined}
                      />
                      <AvatarFallback>
                        {article.author.name
                          ? article.author.name.charAt(0)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{article.author.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  {format(new Date(article.createdAt), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
            {sortedArticles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteSelected}
        selectedCount={selectedArticles.size}
      />
    </div>
  );
}
