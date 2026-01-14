"use state"

import { useState, useEffect } from "react"
import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsList,  TabsContent, TabsTrigger } from "../ui/tabs";
import { FileUpload } from "../Card/FileUpload";
import { Textarea } from "../ui/textarea";
import { FileText, ChevronRight, ChevronLeft, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

interface ArticleProps { 
    id: string;
    title: string;
    image: string;
    content: string;
    author: string;
    tags: string[];
    createdAt: string;

}
export default function ArticleTab() {

    const [articles, setArticles] = useState<ArticleProps[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingArticle, setEditingArticle] = useState<ArticleProps | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
     const [uploadMethod, setUploadMethod] = useState<"upload" | "url">("upload")
    const [formData, setFormData] = useState({
        title: "",
        image: "", 
        content: "",
        author: "",
        tags: ""
    })

    const resetForm = () => {
        setFormData({ title: "", content: "", image: "", author: "", tags: "" })
        setEditingArticle(null)
        setShowForm(false)
        setUploadMethod("upload")
    }
    const handleDelete = () => {
        // setArticles(updatedArticles)
        toast.success("")
    }

    const handleEdit = (article: ArticleProps) => {
        setEditingArticle(article)
    setFormData({
      title: article.title,
      content: article.content,
      image: article.image,
      author: article.author,
      tags: article.tags.join(", "),
    })
    setShowForm(true)
    }

    const ITEMS_PER_PAGE = 6
    const sortedArticles = [...articles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const totalPages = Math.ceil(sortedArticles.length / ITEMS_PER_PAGE)
  const paginatedArticles = sortedArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className="space-y-6">
            {!showForm && (
                <div className="flex justify-center">
                    <Button onClick={() => setShowForm(true)}>
                        <Plus />
                        Add Article
                        </Button>
                </div>
            )}


            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                        {editingArticle ? "Edit Article " : "Create New Article"}
                    </CardTitle>
                        

                        <CardContent>
                            <form action="" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="article-title">Title</Label>
                                    <Input
                                        id="article-title"
                                        placeholder="Enter Article title"
                                        value={formData.title}
                                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    />
                                </div>

                                 <div className="space-y-2">
                <Label htmlFor="article-author">Author</Label>
                <Input
                  id="article-author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
                                </div>
                                

                                <div className="space-y-2">
                                    <Label>Article Images</Label>
                                    <Tabs>
                                        <TabsList>
                                            <TabsTrigger value="upload">Upload File </TabsTrigger>
                                             <TabsTrigger value="url">Upload URL </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="upload" className="mt-3">
                                            <FileUpload
                                         accept="image/*"
                      label="Upload article image"
                      onFileSelect={(url) => setFormData({ ...formData, image: url })}
                      currentFile={formData.image}
                      fileType="image"    />
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
                <Label htmlFor="article-content">Content</Label>
                <Textarea
                  id="article-content"
                  placeholder="Write your article content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  required
                />
                                </div>
                                
                                              <div className="space-y-2">
                <Label htmlFor="article-tags">Tags (comma-separated)</Label>
                <Input
                  id="article-tags"
                  placeholder="e.g., technology, business, news"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                                </div>
                                
                                  <div className="flex gap-2">
                <Button type="submit">{editingArticle ? "Update Article" : "Create Article"}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
                            </form>
                        </CardContent>

                    </CardHeader>
                </Card>
            )}



            {!showForm && (
                <>
                    {paginatedArticles.length === 0 ? (
                                    <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-slate-300 mb-3" />
                <p className="text-slate-600 mb-4">No articles created yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first article
                </Button>
              </CardContent>
            </Card>
                    ): (
                            <>
                                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-slate-100">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-3">{article.content}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-slate-500">By {article.author}</span>
                        <span className="text-xs text-slate-500">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(article)} className="flex-1">
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