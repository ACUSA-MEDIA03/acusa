"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { FileUpload } from "@/components/card/fileupload";
import { Textarea } from "../ui/textarea";
import {
  FileText,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";

interface ArticleProps {
  id: string;
  title: string;
  imageUrl?: string;
  images?: string[];
  content: string;
  description?: string;
  author?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

export default function ArticleTab() {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleProps | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    images: [] as string[],
    content: "",
    description: "",
    author: "",
    tags: "",
    published: false,
  });

  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/admin/publications?category=ARTICLE&limit=100",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setArticles(data.publications || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate
      if (!formData.title || !formData.content) {
        toast.error("Title and content are required");
        setSubmitting(false);
        return;
      }

      // Convert comma-separated tags to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      // Determine URL and method
      const url = editingArticle
        ? `/api/admin/publications/${editingArticle.id}`
        : "/api/admin/publications";
      const method = editingArticle ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          description: formData.description,
          category: "ARTICLE",
          imageUrl: formData.imageUrl || null,
          images: formData.images,
          author: formData.author || null,
          tags: tagsArray,
          published: formData.published,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save article");
      }

      // Success
      toast.success(editingArticle ? "Article updated!" : "Article created!");
      resetForm();
      fetchArticles(); // Refresh list
    } catch (error: unknown) {
      console.error("Submit error:", error);
      toast.error("Failed to save article");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    toast.error("Are you sure you want to delete this article?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/publications/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) {
              throw new Error("Failed to delete article");
            }

            // Update UI
            setArticles((prev) => prev.filter((article) => article.id !== id));

            toast.success("Article deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete article");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
  };

  const handleEdit = (article: ArticleProps) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      description: article.description || "",
      imageUrl: article.imageUrl || "",
      images: article.images || [],
      author: article.author || "",
      tags: article.tags.join(", "),
      published: article.published,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      description: "",
      imageUrl: "",
      images: [],
      author: "",
      tags: "",
      published: false,
    });
    setEditingArticle(null);
    setShowForm(false);
    setUploadMethod("upload");
  };

  // Pagination
  const ITEMS_PER_PAGE = 6;
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalPages = Math.ceil(sortedArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-main"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Article
          </Button>
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-main">
              {editingArticle ? "Edit Article" : "Create New Article"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="article-title" className="text-main">
                  Title *
                </Label>
                <Input
                  id="article-title"
                  placeholder="Enter Article title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-description" className="text-main">
                  Short Description
                </Label>
                <Input
                  id="article-description"
                  placeholder="Brief summary of the article"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-author" className="text-main">
                  Author
                </Label>
                <Input
                  id="article-author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-images" className="text-main">
                  Featured Image
                </Label>
                <Tabs
                  value={uploadMethod}
                  onValueChange={(v) => setUploadMethod(v as "upload" | "url")}
                >
                  <TabsList>
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-3">
                    <FileUpload
                      accept="image/*"
                      label="Upload article image"
                      onFileSelect={(fileObj) =>
                        setFormData({ ...formData, imageUrl: fileObj.url })
                      }
                      currentFile={formData.imageUrl}
                      fileType="image"
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter image URL or leave blank"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      disabled={submitting}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-content" className="text-main">
                  Content *
                </Label>
                <Textarea
                  id="article-content"
                  placeholder="Write your article content here..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-tags" className="text-main">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="article-tags"
                  placeholder="e.g., technology, business, news"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  disabled={submitting}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="article-published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 rounded"
                  disabled={submitting}
                />
                <Label
                  htmlFor="article-published"
                  className="text-main cursor-pointer"
                >
                  Publish immediately (visible to public)
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-main" disabled={submitting}>
                  {submitting
                    ? "Saving..."
                    : editingArticle
                      ? "Update Article"
                      : "Create Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!showForm && (
        <>
          {paginatedArticles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-sub mb-3" />
                <p className="text-sub mb-4">No articles created yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-main">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first article
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-slate-100">
                      <Image
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg text-main line-clamp-2 flex-1">
                          {article.title}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            article.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {article.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <p className="text-sm text-black mb-3 line-clamp-3">
                        {article.description || article.content}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-black">
                          By{" "}
                          {article.author ||
                            article.createdBy?.name ||
                            "Unknown"}
                        </span>
                        <span className="text-xs text-black">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-blue-50 text-sub rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              +{article.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(article)}
                          className="flex-1"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(article.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
