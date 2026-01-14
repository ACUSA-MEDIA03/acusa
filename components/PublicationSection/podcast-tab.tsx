"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Podcast, Pencil, Trash2, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import { FileUpload } from "@/components/Card/FileUpload"

interface PodcastItem {
  id: string
  title: string
  description: string
  coverImage: string
  audioType: "upload" | "link"
  audioUrl: string
  duration?: string
  host: string
  createdAt: string
}

const ITEMS_PER_PAGE = 6

export function PodcastsTab() {
  const [podcasts, setPodcasts] = useState<PodcastItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingPodcast, setEditingPodcast] = useState<PodcastItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [imageUploadMethod, setImageUploadMethod] = useState<"upload" | "url">("upload")
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    audioType: "link" as "upload" | "link",
    audioUrl: "",
    duration: "",
    host: "",
  })

  const loadPodcasts = () => {
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const podcastData: PodcastItem = {
      id: editingPodcast?.id,
      title: formData.title,
      description: formData.description,
      coverImage: formData.coverImage || "/podcast-cover.png",
      audioType: formData.audioType,
      audioUrl: formData.audioUrl,
      duration: formData.duration,
      host: formData.host,
      createdAt: editingPodcast?.createdAt || new Date().toISOString(),
    }
    setPodcasts(updatedPodcasts)
    resetForm()
  }

  const handleEdit = (podcast: PodcastItem) => {
    setEditingPodcast(podcast)
    setFormData({
      title: podcast.title,
      description: podcast.description,
      coverImage: podcast.coverImage,
      audioType: podcast.audioType,
      audioUrl: podcast.audioUrl,
      duration: podcast.duration || "",
      host: podcast.host,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    
  }
// useEffect(() => {
//     loadPodcasts()
//   }, [])
  const togglePlay = (id: string, audioUrl: string) => {
    if (playingId === id) {
      audioRefs.current[id]?.pause()
      setPlayingId(null)
    } else {
      // Pause any currently playing audio
      if (playingId) {
        audioRefs.current[playingId]?.pause()
      }
      // Play new audio
      if (!audioRefs.current[id]) {
        audioRefs.current[id] = new Audio(audioUrl)
        audioRefs.current[id].addEventListener("ended", () => setPlayingId(null))
      }
      audioRefs.current[id].play()
      setPlayingId(id)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      coverImage: "",
      audioType: "link",
      audioUrl: "",
      duration: "",
      host: "",
    })
    setEditingPodcast(null)
    setShowForm(false)
    setImageUploadMethod("upload")
  }

  const sortedPodcasts = [...podcasts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const totalPages = Math.ceil(sortedPodcasts.length / ITEMS_PER_PAGE)
  const paginatedPodcasts = sortedPodcasts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
            <CardTitle className="text-main">{editingPodcast ? "Edit Podcast" : "Add New Podcast"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="podcast-title" className="text-main">Podcast Title</Label>
                <Input
                  id="podcast-title"
                  placeholder="Enter podcast title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcast-host" className="text-main">Host</Label>
                <Input
                  id="podcast-host"
                  placeholder="Enter host name"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-main">Cover Image</Label>
                <Tabs value={imageUploadMethod} onValueChange={(v) => setImageUploadMethod(v as "upload" | "url")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-3">
                    <FileUpload
                      accept="image/*"
                      label="Upload podcast cover"
                      onFileSelect={(url) => setFormData({ ...formData, coverImage: url })}
                      currentFile={formData.coverImage}
                      fileType="image"
                    />
                  </TabsContent>
                  <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter cover image URL or leave blank for placeholder"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcast-description" className="text-main">Description</Label>
                <Textarea
                  id="podcast-description"
                  placeholder="Brief description of the podcast episode"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-main">Audio Source</Label>
                <RadioGroup
                  value={formData.audioType}
                  onValueChange={(value: "upload" | "link") => setFormData({ ...formData, audioType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="link" id="audio-link" />
                    <Label htmlFor="audio-link" className="font-normal cursor-pointer">
                      External Link (Spotify, Apple Podcasts, etc.)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="audio-upload" />
                    <Label htmlFor="audio-upload" className="font-normal cursor-pointer">
                      Upload Audio File
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.audioType === "upload" ? (
                <div className="space-y-2">
                  <Label>Audio File</Label>
                  <FileUpload
                    accept="audio/*"
                    label="Upload podcast audio (MP3, WAV, etc.)"
                    onFileSelect={(url) => setFormData({ ...formData, audioUrl: url })}
                    currentFile={formData.audioUrl}
                    fileType="audio"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="podcast-audio" className="text-main">Podcast URL</Label>
                  <Input
                    id="podcast-audio"
                    placeholder="e.g., https://open.spotify.com/episode/..."
                    value={formData.audioUrl}
                    onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="podcast-duration" className="text-main">Duration (optional)</Label>
                <Input
                  id="podcast-duration"
                  placeholder="e.g., 45:30"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-main">{editingPodcast ? "Update Podcast" : "Add Podcast"}</Button>
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
                        src={podcast.coverImage || "/placeholder.svg"}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Podcast className="w-4 h-4 text-sub" />
                        <span className="text-xs font-medium text-main">PODCAST</span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">{podcast.title}</h3>
                      <p className="text-sm text-black mb-3 line-clamp-2">{podcast.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-black">Host: {podcast.host}</span>
                        {podcast.duration && <span className="text-xs text-black">{podcast.duration}</span>}
                      </div>
                      <div className="flex gap-2 mb-3">
                        {podcast.audioType === "upload" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePlay(podcast.id, podcast.audioUrl)}
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
                          <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                            <a href={podcast.audioUrl} target="_blank" rel="noopener noreferrer">
                              <Play className="w-3 h-3 mr-1" />
                              Listen
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(podcast)} className="flex-1">
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
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
  )
}
