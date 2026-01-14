"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  accept?: string
  label: string
  onFileSelect: (fileUrl: string) => void
  currentFile?: string
  fileType?: "image" | "audio" | "document"
}

export function FileUpload({ accept, label, onFileSelect, currentFile, fileType = "image" }: FileUploadProps) {
  const [preview, setPreview] = useState<string>(currentFile || "")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Create a local URL for the file
    const fileUrl = URL.createObjectURL(file)
    setPreview(fileUrl)
    onFileSelect(fileUrl)

    // In a real application, you would upload to a storage service here
    // For now, we're using blob URLs which work in the browser
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const clearFile = () => {
    setPreview("")
    onFileSelect("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`file-upload-${label}`}
      />

      {!preview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-slate-100 rounded-full">
              <Upload className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-xs text-slate-500 mt-1">Click to browse or drag and drop</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-slate-200 rounded-lg overflow-hidden">
          {fileType === "image" ? (
            <div className="aspect-video relative bg-slate-100">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            </div>
          ) : fileType === "audio" ? (
            <div className="p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded">
                <File className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Audio file selected</p>
                <audio src={preview} controls className="w-full mt-2" />
              </div>
            </div>
          ) : (
            <div className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <File className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">File selected</p>
                <p className="text-xs text-slate-500">Ready to upload</p>
              </div>
            </div>
          )}
          <Button type="button" size="sm" variant="destructive" className="absolute top-2 right-2" onClick={clearFile}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
