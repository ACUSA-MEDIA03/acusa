"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Podcast,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import { FileUpload } from "@/components/Card/FileUpload";
import { toast } from "sonner";

interface PodcastItem {
  id: string;
  title: string;
  content: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
  duration?: number | null;
  fileSize?: number | null;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: string;
  createdBy?: {
    name: string;
    email: string;
  };
}

const ITEMS_PER_PAGE = 6;

export function PodcastsTab() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<PodcastItem | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [imageUploadMethod, setImageUploadMethod] = useState<"upload" | "url">(
    "upload",
  );
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [audioType, setAudioType] = useState<"upload" | "link">("link");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    audioUrl: "",
    imageUrl: "",
    duration: "",
    author: "",
    tags: "",
    published: false,
  });
  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/admin/publications?category=PODCAST&limit=100",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch podcasts");
      }

      const data = await response.json();
      setPodcasts(data.publications || []);
    } catch (error) {
      console.error("Error fetching Podcasts", error);
      console.log(error);
      toast.error("Error fetching podcasts");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.title || !formData.content) {
        toast.error("Title and content are required");
        setSubmitting(false);
        return;
      }
      //  convert comma -seperated tags to array
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      //  url and method
      const url = editingPodcast
        ? `/api/admin/publications/${editingPodcast.id}`
        : `/api/admin/publications`;

      const method = editingPodcast ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          description: formData.description,
          category: "PODCAST",
          audioUrl: formData.audioUrl,
          imageUrl: formData.imageUrl || null,
          duration: parseDurationToSeconds(formData.duration),
          fileSize: audioType === "upload" ? fileSize : null,
          tags: tagsArray,
          author: formData.author,
          published: formData.published,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        `Podcast ${editingPodcast ? "updated" : "created"} successfully`,
      );
      resetForm();
      loadPodcasts();
    } catch (error) {
      console.error("Error submitting podcast:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (podcast: PodcastItem) => {
    setEditingPodcast(podcast);

    setFormData({
      title: podcast.title,
      content: podcast.content,
      description: podcast.description,
      audioUrl: podcast.audioUrl,
      imageUrl: podcast.imageUrl || "",
      author: podcast.author,
      tags: podcast.tags.join(", "),
      published: podcast.published,
      duration: podcast.duration
        ? `${Math.floor(podcast.duration / 60)}:${podcast.duration % 60}`
        : "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
   toast.error("Are you sure you want to delete this podcast?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const response = await fetch(`/api/admin/publications/${id}`, {
              method: "DELETE",
            });
            if (!response.ok) {
              throw new Error("Failed to delete podcast");
            }
            toast.success("Podcast deleted successfully");
            setPodcasts((prev) => prev.filter((n) => n.id !== id));
          } catch (error) {
            console.error("Error deleting podcast:", error);
            toast.error("Error deleting podcast");
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
      

  const togglePlay = (id: string, audioUrl: string) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing audio
      if (playingId) {
        audioRefs.current[playingId]?.pause();
      }
      // Play new audio
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(audioUrl);
        audioRefs.current[id].addEventListener("ended", () =>
          setPlayingId(null),
        );
      }
      audioRefs.current[id].play();
      setPlayingId(id);
    }
  };

  const parseDurationToSeconds = (value: string): number | null => {
    if (!value) return null;

    const parts = value.split(":").map(Number);
    if (parts.some(isNaN)) return null;

    if (parts.length === 2) {
      const [m, s] = parts;
      return m * 60 + s;
    }

    if (parts.length === 3) {
      const [h, m, s] = parts;
      return h * 3600 + m * 60 + s;
    }

    return null;
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      audioUrl: "",
      imageUrl: "",
      duration: "",
      author: "",
      tags: "",
      published: false,
    });
    setFileSize(null);
    setAudioType("link");
    setEditingPodcast(null);
    setShowForm(false);
  };

  const sortedPodcasts = [...podcasts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalPages = Math.ceil(sortedPodcasts.length / ITEMS_PER_PAGE);
  const paginatedPodcasts = sortedPodcasts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  if (loading) {
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
    </div>;
  }
  return (
    <div className="space-y-6">
      {!showForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)} className="bg-main">
            <Plus className="w-4 h-4 mr-2" />
            Add Podcast
          </Button>
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-main">
              {editingPodcast ? "Edit Podcast" : "Add New Podcast"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="podcast-title" className="text-main">
                  Podcast Title
                </Label>
                <Input
                  id="podcast-title"
                  placeholder="Enter podcast title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcast-content" className="text-main">
                  Podcast Content
                </Label>
                <Input
                  id="podcast-content"
                  placeholder="Enter podcast Content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcast-author" className="text-main">
                  Author
                </Label>
                <Input
                  id="podcast-author"
                  placeholder="Enter author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-main">Cover Image</Label>
                <Tabs
                  value={imageUploadMethod}
                  onValueChange={(v) =>
                    setImageUploadMethod(v as "upload" | "url")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-3">
                    <FileUpload
                      accept="image/*"
                      label="Upload podcast cover"
                      onFileSelect={(fileObj) =>
                        setFormData({ ...formData, imageUrl: fileObj.url })
                      }
                      currentFile={formData.imageUrl}
                      fileType="image"
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter cover image URL or leave blank for placeholder"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                    />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcast-description" className="text-main">
                  Description
                </Label>
                <Textarea
                  id="podcast-description"
                  placeholder="Brief description of the podcast episode"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-main">Audio Source</Label>
                <RadioGroup
                  value={audioType}
                  onValueChange={(value: "upload" | "link") =>
                    setAudioType(value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="audio-link" />
                    <Label
                      htmlFor="audio-link"
                      className="font-normal cursor-pointer"
                    >
                      External Link (Spotify, Apple Podcasts, etc.)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="audio-upload" />
                    <Label
                      htmlFor="audio-upload"
                      className="font-normal cursor-pointer"
                    >
                      Upload Audio File
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.audioUrl === "upload" ? (
                <div className="space-y-2">
                  <Label>Audio File</Label>
                  <FileUpload
                    accept="audio/*"
                    label="Upload podcast audio"
                    onFileSelect={(fileObj) => {
                      setFormData((prev) => ({
                        ...prev,
                        audioUrl: fileObj.url,
                      }));
                      setFileSize(fileObj.size ?? null);
                    }}
                    currentFile={formData.audioUrl}
                    fileType="audio"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="podcast-audio" className="text-main">
                    Podcast URL
                  </Label>
                  <Input
                    id="podcast-audio"
                    placeholder="e.g., https://open.spotify.com/episode/..."
                    value={formData.audioUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, audioUrl: e.target.value })
                    }
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="podcast-duration" className="text-main">
                  Duration (optional)
                </Label>
                <Input
                  id="podcast-duration"
                  placeholder="e.g., 45:30"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
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
                <Label
                  htmlFor="article-published"
                  className="text-main cursor-pointer"
                >
                  Publish immediately (visible to public)
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-main">
                  {editingPodcast ? "Update Podcast" : "Add Podcast"}
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
          {paginatedPodcasts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Podcast className="w-12 h-12 text-sub mb-3" />
                <p className="text-main mb-4">No podcasts added yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-main">
                  <Plus className="w-4 h-4 mr-2" />
                  Add your first podcast
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPodcasts.map((podcast) => (
                  <Card key={podcast.id} className="overflow-hidden">
                    <div className="aspect-square relative bg-slate-100">
                      <Image
                        src={podcast.imageUrl || "/placeholder.svg"}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Podcast className="w-4 h-4 text-sub" />
                        <span className="text-xs font-medium text-main">
                          PODCAST
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">
                        {podcast.title}
                      </h3>
                      <p className="text-sm text-black mb-3 line-clamp-2">
                        {podcast.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-black">
                          Author: {podcast.author}
                        </span>
                        {podcast.duration && (
                          <span className="text-xs text-black">
                            {podcast.duration}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mb-3">
                        {podcast.audioUrl === "upload" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              togglePlay(podcast.id, podcast.audioUrl)
                            }
                            className="flex-1"
                          >
                            {playingId === podcast.id ? (
                              <>
                                <Pause className="w-3 h-3 mr-1" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 mr-1" />
                                Play
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="flex-1 bg-transparent"
                          >
                            <a
                              href={podcast.audioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Listen
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(podcast)}
                          className="flex-1"
                        >
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(podcast.id)}
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
