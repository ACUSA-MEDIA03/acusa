"use client"

import { useState,  } from "react"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
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

    // const handleEdit = (newsletter: Newsletter) => {
    //     setEditingNewsLetter(newsletter)
    //     setShowForm({

    //         title: newsletter.title,
    //         description: newsletter.description,
    //         content: newsletter.content,
    //         image: newsletter.image,
    //         tags: newsletter.tags.join(",")
    //     })
    //     setShowForm(true)
    // }

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
        </div>
    )
}