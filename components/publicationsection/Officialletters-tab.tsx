"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  FileCheck,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/card/FileUpload";
import { toast } from "sonner";

interface OfficialLetter {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileSize: number | null;
  referenceNo: string;
  imageUrl?: string | null;
  published: boolean;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

interface FileObj {
  url: string;
  file: File | null;
  size: number;
}

interface FormData {
  title: string;
  description: string;
  imageUrl: string;
  fileUrl: FileObj | null;
  fileSize: number | null;
  referenceNo: string;
  published: boolean;
}

const ITEMS_PER_PAGE = 6;

export function OfficialLettersTab() {
  const [letters, setLetters] = useState<OfficialLetter[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLetter, setEditingLetter] = useState<OfficialLetter | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imageUrl: "",
    fileUrl: { url: "", file: null as File | null, size: 0 },
    fileSize: null as number | null,
    referenceNo: "",
    published: false,
  });

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "/api/admin/publications?category=OFFICIAL_LETTER&limit=100",
      );
      if (!response) {
        throw new Error("Failed to fetch articles");
      }

      const data = await response.json();
      setLetters(data.publications || []);
    } catch (error) {
      console.error("Fetch error", error);
      toast.error("Failed to load letters");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // validation
      if (!formData.title || !formData.description) {
        toast.error("Title and description are required");
        setSubmitting(false);
        return;
      }

      // determine url and method
      const url = editingLetter
        ? `/api/admin/publications/${editingLetter.id}`
        : `/api/admin/publications`;

      const method = editingLetter ? "PUT" : "POST";

      // Determine which URL to use based on upload method
      const documentUrl =
        uploadMethod === "upload"
          ? formData.fileUrl?.url || null
          : formData.imageUrl || null;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          fileUrl: documentUrl,
          fileSize: formData.fileUrl?.size || null, // This should be number or null
          category: "OFFICIAL_LETTER",
          published: formData.published,
          imageUrl: null,
          referenceNo: formData.referenceNo || null, // Add null fallback
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save letter");
      }
      // on success
      toast.success(editingLetter ? "Letter Updated" : "Letter created");
      resetForm();
      loadLetters();
    } catch (error: unknown) {
      console.error("Submit error", error);
      toast.error("Failed to save letter");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (letter: OfficialLetter) => {
    setEditingLetter(letter);
    setFormData({
      title: letter.title,
      description: letter.description || "",
      imageUrl: letter.imageUrl || "",
      fileSize: letter.fileSize,
      fileUrl: {
        url: letter.fileUrl || "", // wrap string in object
        file: null, // no file when editing
        size: letter.fileSize || 0, // you can default to 0
      },
      referenceNo: letter.referenceNo,
      published: letter.published,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    toast.error("Are you sure you want to delete this letter?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/publications/${id}`, {
              method: "DELETE",
            });

            if (!response.ok) {
              throw new Error("Failed to delete letter");
            }

            // Update UI
            setLetters((prev) => prev.filter((letter) => letter.id !== id));

            toast.success("Letter deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete letter");
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
      imageUrl: "",
      fileSize: null,
      fileUrl: null,
      referenceNo: "",
      published: false,
    });
    setEditingLetter(null);
    setShowForm(false);
    setUploadMethod("upload");
  };

  const sortedLetters = [...letters].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalPages = Math.ceil(sortedLetters.length / ITEMS_PER_PAGE);
  const paginatedLetters = sortedLetters.slice(
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
                Official Letters Management
              </h1>
              <p className="text-slate-600">
                Create and manage your official letters
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-main hover:bg-main/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Official Letter
              </Button>
            )}
          </div>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            <CardHeader className="">
              <CardTitle className="text-2xl text-main">
                {editingLetter
                  ? "Edit Official Letter"
                  : "Add New Official Letter"}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 -mt-8 ">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="letter-title"
                    className="block text-sm font-semibold text-main"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="letter-title"
                    type="text"
                    placeholder="Enter letter title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Reference Number Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="letter-reference"
                    className="block text-sm font-semibold text-main"
                  >
                    Reference Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="letter-reference"
                    type="text"
                    placeholder="e.g., REF/2024/001"
                    value={formData.referenceNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referenceNo: e.target.value,
                      })
                    }
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 disabled:bg-slate-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Document Upload */}
                <div className="space-y-2">
                  <Label
                    htmlFor="letter-document"
                    className="text-main font-semibold"
                  >
                    Letter Document <span className="text-red-500">*</span>
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
                        Upload Scan
                      </TabsTrigger>
                      <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-main data-[state=active]:text-white data-[state=active]:shadow-md"
                      >
                        Document URL
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-3">
                      <FileUpload
                        accept="image/*"
                        label="Upload scanned letter/memo"
                        onFileSelect={(fileObj) =>
                          setFormData({ ...formData, fileUrl: fileObj })
                        }
                        currentFile={formData.fileUrl?.url}
                        fileType="document"
                      />
                    </TabsContent>
                    <TabsContent value="url" className="mt-3">
                      <Input
                        type="url"
                        placeholder="Enter document image URL"
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

                {/* Description Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="letter-description"
                    className="block text-sm font-semibold text-main"
                  >
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="letter-description"
                    placeholder="Brief description of the letter contents"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-par rounded-lg focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-200 resize-y disabled:bg-par/50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Published Checkbox */}
                <div className="flex items-center space-x-3 p-4">
                  <Input
                    id="letter-published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="h-5 w-5 text-main rounded border-par focus:ring-2 focus:ring-main cursor-pointer"
                    disabled={submitting}
                  />
                  <Label
                    htmlFor="letter-published"
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
                    className="flex-1 sm:flex-none bg-main hover:bg-main/90 focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    {editingLetter ? "Update Letter" : "Add Letter"}
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

        {/* Letters Grid Section */}
        {!showForm && (
          <>
            {paginatedLetters.length === 0 ? (
              <Card className="shadow-xl">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FileCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-par mb-2">
                    No official letters yet
                  </h3>
                  <p className="text-par mb-6 text-center max-w-md">
                    Get started by adding your first official letter
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-main hover:bg-main/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add your first official letter
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedLetters.map((letter) => (
                    <Card
                      key={letter.id}
                      className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-4/5 relative overflow-hidden bg-slate-50">
                        <Image
                          src={letter.fileUrl || "/placeholder.svg"}
                          alt={letter.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileCheck className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-xs font-bold text-green-600 uppercase tracking-wide">
                            Official
                          </span>
                        </div>

                        <h3 className="font-bold text-lg text-par mb-2 line-clamp-2 group-hover:text-main transition-colors duration-200">
                          {letter.title}
                        </h3>

                        <p className="text-sm text-par mb-4 line-clamp-2 leading-relaxed">
                          {letter.description}
                        </p>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                          <span className="text-xs font-mono text-par bg-slate-100 px-2 py-1 rounded">
                            {letter.referenceNo}
                          </span>
                          <span className="text-xs text-par font-medium">
                            {new Date(letter.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>

                        {letter.published && (
                          <div className="mb-4">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                              Published
                            </span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEdit(letter)}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-slate-100 hover:bg-slate-200"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(letter.id)}
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