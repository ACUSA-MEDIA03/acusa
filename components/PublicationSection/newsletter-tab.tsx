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
import { FileUpload } from "../Card/FileUpload";
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
    null
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
        "/api/admin/publications?category=NEWSLETTER&limit=100"
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
      //  Determine URL and method
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
          content: formData.content,
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
        `Newsletter ${editingNewsLetter ? "updated" : "created"} successfully`
      );
      resetForm();
       fetchNewsletters();
    } catch (error: unknown) {
      console.error("Error submitting newsletter:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsletter")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/publications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete newsletter");
      }
      toast.success("Newsletter deleted successfully");
      setNewsLetter((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting newsletter:", error);
      toast.error("Error deleting newsletter");
    }
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const totalPages = Math.ceil(sortedNewsletters.length / ITEMS_PER_PAGE);
  const paginatedNewsletters = sortedNewsletters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    (
       <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
      </div>
)
  }
  return (
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)} className="bg-main">
            <Plus className="w-4 h-4 mr-2" /> Add Newsletter
          </Button>
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-main">
              {editingNewsLetter ? "Edit Newsletter" : "Create Newsletter"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form action="" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="newsLetter-title" className="text-main">
                  Title
                </Label>
                <Input
                  id="newsletter-title"
                  placeholder="Enter newsletter title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="news-letter-description" className="text-main">
                  {" "}
                 Short   Description
                </Label>
                <Textarea
                  id="newsletter-description"
                  placeholder="Brief description of the newsletter"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter-image" className="text-main">
                  Newsletter Image
                </Label>
                <Tabs
                  value={uploadMethod}
                  onValueChange={(v) => setUploadMethod(v as "upload" | "url")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-3">
                    <FileUpload
                      accept="image/*"
                      label="Upload newsletter image"
                      onFileSelect={(url) =>
                        setFormData({ ...formData, images: [url] })
                      }
                      currentFile={formData.images[0]}
                      fileType="image"
                      
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter image URL or leave blank for placeholder"
                      value={formData.images[0] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, images: [e.target.value] })
                      }
                      disabled={submitting}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter-content" className="text-main">
                  Content
                </Label>
                <Textarea
                  id="newsletter-content"
                  placeholder="Write your newsletter content here..."
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
                <Label htmlFor="newsletter-tags">Tags (comma-separated)</Label>
                <Input
                  id="newsletter-tags"
                  placeholder="e.g., monthly, updates, community"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  disabled={submitting}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="newsletter-published"
                  type="checkbox"
                  checked={formData.published}
                 onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                className="h-4 w-4 text-main rounded"
                />
                <Label htmlFor="article-published" className="text-main cursor-pointer">Publish immediately (visible to public)</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-main">
                  {editingNewsLetter
                    ? "Update Newsletter"
                    : "Create Newsletter"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!showForm && (
        <>
          {paginatedNewsletters.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="w-12 h-12 text-sub mb-3" />
                <p className="text-sub mb-4">No newsletters created yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-main">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first newsletter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedNewsletters.map((newsletter) => (
                  <Card key={newsletter.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-slate-100">
                      <Image
                        src={
                          newsletter.imageUrl ||
                          newsletter.images?.[0] ||
                          "/placeholder.svg"
                        }
                        alt={newsletter.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-sub">
                          NEWSLETTER
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">
                        {newsletter.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {newsletter.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-500">
                          {new Date(newsletter.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newsletter.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(newsletter)}
                          className="flex-1"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(newsletter.id)}
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
                <div className="flex items-center justify-center gap-2">
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
