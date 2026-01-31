"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import { FileUpload } from "@/components/card/FileUpload";
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
    const contentWithParagraphs = formData.content
      .split("\n\n") // Split by double line breaks
      .filter((para) => para.trim()) // Remove empty paragraphs
      .map((para) => `<p>${para.trim()}</p>`) // Wrap in <p> tags
      .join("");
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
          content: contentWithParagraphs,
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Article Management
              </h1>
              <p className="text-slate-600">Create and manage your articles</p>
            </div>
            {!showForm && (
              <Button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-main hover:bg-main/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Article
              </Button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <CardHeader className="">
              <CardTitle className="text-2xl  text-main">
                {editingArticle ? "Edit Article" : "Create New Article"}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 -mt-8 ">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-title"
                    className="block text-sm font-semibold text-main"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="article-title"
                    type="text"
                    placeholder="Enter article title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-description"
                    className="block text-sm font-semibold text-main"
                  >
                    Short Description
                  </Label>
                  <Input
                    id="article-description"
                    type="text"
                    placeholder="Brief summary of the article"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Author Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-author"
                    className="block text-sm font-semibold text-main"
                  >
                    Author
                  </Label>
                  <Input
                    id="article-author"
                    type="text"
                    placeholder="Enter author name"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-images"
                    className="text-main font-semibold"
                  >
                    Featured Image
                  </Label>
                  <Tabs
                    value={uploadMethod}
                    onValueChange={(v) =>
                      setUploadMethod(v as "upload" | "url")
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-slate-50 p-1">
                      <TabsTrigger
                        value="upload"
                        className="data-[state=active]:bg-main data-[state=active]:text-white data-[state=active]:shadow-md"
                      >
                        Upload File
                      </TabsTrigger>
                      <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-main data-[state=active]:text-white data-[state=active]:shadow-md"
                      >
                        Image URL
                      </TabsTrigger>
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
                        type="url"
                        placeholder="Enter image URL or leave blank"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        disabled={submitting}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Content Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-content"
                    className="block text-sm font-semibold text-main"
                  >
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="article-content"
                    placeholder="Write your article content here... (Press Enter twice for new paragraph)"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={8}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 resize-y disabled:bg-par/50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Tags Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="article-tags"
                    className="block text-sm font-semibold text-main"
                  >
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="article-tags"
                    type="text"
                    placeholder="e.g., technology, business, news"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-par/50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center space-x-3 p-2">
                  <Input
                    id="article-published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="h-5 w-5 text-main rounded border-par focus:ring-2 focus:ring-main cursor-pointer"
                    disabled={submitting}
                  />
                  <Label
                    htmlFor="article-published"
                    className="text-sm font-medium text-main cursor-pointer"
                  >
                    Publish immediately (visible to public)
                  </Label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 sm:flex-none bg-main hover:bg-main/90 focus:ring-4 focus:ring-par disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {submitting
                      ? "Saving..."
                      : editingArticle
                        ? "Update Article"
                        : "Create Article"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    disabled={submitting}
                    className="flex-1 sm:flex-none border-2 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Article Grid Section */}
        {!showForm && (
          <>
            {paginatedArticles.length === 0 ? (
              <Card className="shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10 text-sub" />
                  </div>
                  <h3 className="text-xl font-semibold text-par mb-2">
                    No articles yet
                  </h3>
                  <p className="text-par mb-6 text-center max-w-md">
                    Get started by creating your first article to share with
                    your audience
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-main hover:bg-main/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create your first article
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={article.imageUrl || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-main rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-bold text-main uppercase tracking-wide">
                            Article
                          </span>
                        </div>

                        <h3 className="font-bold text-lg text-par mb-2 line-clamp-2 group-hover:text-main transition-colors duration-200">
                          {article.title}
                        </h3>

                        <p className="text-sm text-par mb-4 line-clamp-2 leading-relaxed">
                          {article.description ||
                            article.content?.replace(/<[^>]*>/g, "")}
                        </p>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                          <span className="text-xs text-par font-medium">
                            By{" "}
                            {article.author ||
                              article.createdBy?.name ||
                              "Unknown"}
                          </span>
                          <span className="text-xs text-par font-medium">
                            {new Date(article.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        {article.published && (
                          <div className="mb-4">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                              Published
                            </span>
                          </div>
                        )}

                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1 bg-main/10 text-main rounded-full font-medium hover:bg-main/20 transition-colors duration-200"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                                +{article.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(article)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-slate-100 hover:bg-slate-200"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(article.id)}
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <span className="px-4 py-2 text-sm font-medium text-par bg-white rounded-lg border border-slate-300">
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
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}