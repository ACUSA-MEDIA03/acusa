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
import { FileUpload } from "@/components/Card/FileUpload";
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
    const documentUrl = uploadMethod === "upload" 
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
      url: letter.fileUrl || "",  // wrap string in object
      file: null,                  // no file when editing
      size: letter.fileSize || 0,  // you can default to 0
    },
      referenceNo: letter.referenceNo,
      published: letter.published,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    toast("Are you sure you want to delete this article?", {
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
            setLetters((prev) =>
              prev.filter((letter) => letter.id !== id)
            );
  
            toast.success("Letter deleted successfully!");
          } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete article");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
        toast.dismiss(); // closes the toast
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
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)} className="bg-main">
            <Plus className="w-4 h-4 mr-2" />
            Add Official Letter
          </Button>
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-main">
              {editingLetter
                ? "Edit Official Letter"
                : "Add New Official Letter"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="letter-title" className="text-main">
                  Title
                </Label>
                <Input
                  id="letter-title"
                  placeholder="Enter letter title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="letter-reference" className="text-main">
                  Reference Number
                </Label>
                <Input
                  id="letter-reference"
                  placeholder="e.g., REF/2024/001"
                  value={formData.referenceNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      referenceNo: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="letter-document" className="text-main">
                  Letter Document
                </Label>
                <Tabs
                  value={uploadMethod}
                  onValueChange={(v) => setUploadMethod(v as "upload" | "url")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Scan</TabsTrigger>
                    <TabsTrigger value="url">Document URL</TabsTrigger>
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
                      placeholder="Enter document image URL"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                    />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Label htmlFor="letter-description" className="text-main">
                  Description
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
                <Button type="submit" className="bg-main">
                  {editingLetter ? "Update Letter" : "Add Letter"}
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
          {paginatedLetters.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileCheck className="w-12 h-12 text-sub mb-3" />
                <p className="text-sub mb-4">No official letters added yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-main">
                  <Plus className="w-4 h-4 mr-2" />
                  Add your first official letter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedLetters.map((letter) => (
                  <Card key={letter.id} className="overflow-hidden">
                    <div className="aspect-4/5 relative bg-slate-100">
                      <Image
                        src={letter.fileUrl || "/placeholder.svg"}
                        alt={letter.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">
                          OFFICIAL
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">
                        {letter.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {letter.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-slate-500">
                          {letter.fileSize}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(letter.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(letter)}
                          className="flex-1"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(letter.id)}
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
