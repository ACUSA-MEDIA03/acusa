"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Plus,
  Mail,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Pencil,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "../card/FileUpload";
import { toast } from "sonner";

interface Newsletter {
  id: string;
  title: string;
  description: string;
  content: string;
  images?: string[];
  imageUrl?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

const ITEMS_PER_PAGE = 6;

export default function Newsletter() {
  const [newsLetter, setNewsLetter] = useState<Newsletter[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNewsLetter, setEditingNewsLetter] = useState<Newsletter | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    images: [] as string[],
    tags: "",
    published: false,
  });

  //  Fetch Newsletter on counter mount
  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/admin/publications?category=NEWSLETTER&limit=100",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch newsletters");
      }

      const data = await response.json();
      setNewsLetter(data.publications || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      toast.error("Error fetching newsletters");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Handle form submission for creating or updating a newsletter
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
        toast.error("Title and content are required.");
        setSubmitting(false);
        return;
      }
      //  convert comma- seperated tags to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      //  Determine URL and method for either creating or updating
      const url = editingNewsLetter
        ? `/api/admin/publications/${editingNewsLetter.id}`
        : `/api/admin/publications`;
      const method = editingNewsLetter ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: contentWithParagraphs,
          description: formData.description,
          category: "NEWSLETTER",
          imageUrl: formData.imageUrl || formData.images[0],
          images: formData.images,
          tags: tagsArray,
          published: formData.published,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      //  success
      toast.success(
        `Newsletter ${editingNewsLetter ? "updated" : "created"} successfully`,
      );
      resetForm();
      fetchNewsletters();
    } catch (error: unknown) {
      console.error("Error submitting newsletter:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (newsletter: Newsletter) => {
    setEditingNewsLetter(newsletter);
    setFormData({
      title: newsletter.title,
      content: newsletter.content,
      description: newsletter.description,
      imageUrl: newsletter.imageUrl || "",
      images: newsletter.images || [],
      tags: newsletter.tags.join(", "),
      published: newsletter.published,
    });
    setShowForm(true);
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
            setNewsLetter((prev) =>
              prev.filter((newsletter) => newsletter.id !== id),
            );

            toast.success("Newsletter deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete newsletter");
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

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      tags: "",
      imageUrl: "",
      images: [],
      published: false,
    });
    setEditingNewsLetter(null);
    setShowForm(false);
    setUploadMethod("upload");
  };

  const sortedNewsletters = [...newsLetter].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalPages = Math.ceil(sortedNewsletters.length / ITEMS_PER_PAGE);
  const paginatedNewsletters = sortedNewsletters.slice(
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
                Newsletter Management
              </h1>
              <p className="text-slate-600">
                Create and manage your newsletters
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-main hover:bg-main/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Newsletter
              </Button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <CardHeader className="">
              <CardTitle className="text-2xl text-main">
                {editingNewsLetter ? "Edit Newsletter" : "Create Newsletter"}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 -mt-8 ">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="newsletter-title"
                    className="block text-sm font-semibold text-main"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="newsletter-title"
                    type="text"
                    placeholder="Enter newsletter title"
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
                    htmlFor="newsletter-description"
                    className="block text-sm font-semibold text-main"
                  >
                    Short Description <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="newsletter-description"
                    type="text"
                    placeholder="Brief description of the newsletter"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    required
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
                          setFormData({
                            ...formData,
                            imageUrl: e.target.value,
                          })
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
                    htmlFor="newsletter-content"
                    className="block text-sm font-semibold text-main"
                  >
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="newsletter-content"
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
                    htmlFor="newsletter-tags"
                    className="block text-sm font-semibold text-main"
                  >
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="newsletter-tags"
                    type="text"
                    placeholder="e.g., monthly, updates, community"
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
                    id="newsletter-published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        published: e.target.checked,
                      })
                    }
                    className="h-5 w-5 text-main rounded border-par focus:ring-2 focus:ring-main cursor-pointer"
                  />
                  <Label
                    htmlFor="newsletter-published"
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
                    {editingNewsLetter
                      ? "Update Newsletter"
                      : "Create Newsletter"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1 sm:flex-none border-2 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Newsletter Grid Section */}
        {!showForm && (
          <>
            {paginatedNewsletters.length === 0 ? (
              <Card className="shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-10 h-10 text-sub" />
                  </div>
                  <h3 className="text-xl font-semibold text-par mb-2">
                    No newsletters yet
                  </h3>
                  <p className="text-par mb-6 text-center max-w-md">
                    Get started by creating your first newsletter to share with
                    your audience
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-main hover:bg-main/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create your first newsletter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedNewsletters.map((newsletter) => (
                    <Card
                      key={newsletter.id}
                      className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={newsletter.imageUrl || "/placeholder.svg"}
                          alt={newsletter.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-main rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xs font-bold text-main uppercase tracking-wide">
                            Newsletter
                          </span>
                        </div>

                        <h3 className="font-bold text-lg text-par mb-2 line-clamp-2 group-hover:text-main transition-colors duration-200">
                          {newsletter.title}
                        </h3>

                        <p className="text-sm text-par mb-4 line-clamp-2 leading-relaxed">
                          {newsletter.description}
                        </p>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                          <span className="text-xs text-par font-medium">
                            {new Date(newsletter.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                          {newsletter.published && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                              Published
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {newsletter.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1 bg-main/10 text-main rounded-full font-medium hover:bg-main/20 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(newsletter)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-slate-100 hover:bg-slate-200"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(newsletter.id)}
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