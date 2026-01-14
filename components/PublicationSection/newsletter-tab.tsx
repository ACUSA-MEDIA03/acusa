"use client"

import Image from "next/image"
import { useState,  } from "react"
import { Button } from "../ui/button"
import { Plus, Mail , ChevronRight, ChevronLeft, Trash2, Pencil} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "../ui/tabs"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { FileUpload } from "../Card/FileUpload"

interface Newsletter {
  id: string
  title: string
  description: string
  content: string
  image: string
  tags: string[]
  createdAt: string
}


 const ITEMS_PER_PAGE = 6
export default function Newsletter() {
  
    const [newsLetter, setNewsLetter] = useState<Newsletter[]>([])
    const [showForm, setShowForm ]= useState(false)
    const [editingNewsLetter, setEditingNewsLetter] = useState<Newsletter | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload")
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        tags: ""
    })
   

    const handleSubmit = () => {

    }

    const handleEdit = (newsletter: Newsletter) => {
        setEditingNewsLetter(newsletter)
        setShowForm({
            title: newsletter.title,
            description: newsletter.description,
            content: newsletter.content,
            image: newsletter.image,
            tags: newsletter.tags.join(",")
        })
        setShowForm(true)
    }

    const handleDelete = () => {

    }

    const resetForm = () => {
        setFormData({ title: "", description: "", content: "", image: "", tags: "" })
        setEditingNewsLetter(null)
        setShowForm(false)
        setUploadMethod("upload")
    }

    const sortedNewsletters = [...newsLetter].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  const totalPages = Math.ceil(sortedNewsletters.length / ITEMS_PER_PAGE)
  const paginatedNewsletters = sortedNewsletters.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    return (
        <div className="space-y-6">
            {!showForm && (
                <div className="flex justify-end">
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Newsletter
                        </Button>
            </div>
            )}
            

            {showForm && (
                <Card>
                    <CardHeader >
                        <CardTitle>{ editingNewsLetter ? "Edit Newsletter": "Create Newsletter"}</CardTitle>
                    </CardHeader>


                    <CardContent>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="newsLetter-title">Title</Label>
                                <Input
                                                      id="newsletter-title"
                  placeholder="Enter newsletter title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="news-letter-description"> Description</Label>
                                <Textarea  id="newsletter-description"
                  placeholder="Brief description of the newsletter"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required/>
                            </div>


                             <div className="space-y-2">
                                <Label>Newsletter Image</Label>
                                <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod( v as "upload" | "url")}>
 <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="url">Image URL</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="upload" className="mt-3">
                                        <FileUpload  accept="image/*"
                      label="Upload newsletter image"
                      onFileSelect={(url) => setFormData({ ...formData, image: url })}
                      currentFile={formData.image}
                                            fileType="image" />
                                        </TabsContent>
                                         <TabsContent value="url" className="mt-3">
                    <Input
                      placeholder="Enter image URL or leave blank for placeholder"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                                    </TabsContent>
                                </Tabs>
                            </div>
                            

                                          <div className="space-y-2">
                <Label htmlFor="newsletter-content">Content</Label>
                <Textarea
                  id="newsletter-content"
                  placeholder="Write your newsletter content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
                            </div>
                            <div className="space-y-2">
                <Label htmlFor="newsletter-tags">Tags (comma-separated)</Label>
                <Input
                  id="newsletter-tags"
                  placeholder="e.g., monthly, updates, community"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                            </div>
                            
                             <div className="flex gap-2">
                <Button type="submit">{editingNewsLetter ? "Update Newsletter" : "Create Newsletter"}</Button>
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
                <Mail className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-slate-600 mb-4">No newsletters created yet</p>
                <Button onClick={() => setShowForm(true)}>
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
                        src={newsletter.image || "/placeholder.svg"}
                        alt={newsletter.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-600">NEWSLETTER</span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">{newsletter.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{newsletter.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-500">
                          {new Date(newsletter.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {newsletter.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(newsletter)} className="flex-1">
                          <Pencil className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete()}
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