'use client'

import { useState, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, X, Link } from 'lucide-react'
import SafeAvatar from '@/components/ui/safe-avatar'
import { getAvatarFallback } from '@/app/submit/submitutils'

interface LogoUploadProps {
  name: string
  title?: string
  defaultUrl?: string
}

export default function LogoUpload({ name, title = '', defaultUrl = '' }: LogoUploadProps) {
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl)
  const [urlInput, setUrlInput] = useState<string>(defaultUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file
    const maxSize = 2 * 1024 * 1024 // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']

    if (file.size > maxSize) {
      alert('File size too large. Maximum 2MB allowed.')
      return
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.')
      return
    }

    setSelectedFile(file)

    // Create preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
  }

  const handleRemoveFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl)
    }
    setSelectedFile(null)
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    setUrlInput(url)
    setPreviewUrl(url)
  }

  const toggleMode = () => {
    const newMode = uploadMode === 'upload' ? 'url' : 'upload'
    setUploadMode(newMode)

    // Clear current selection when switching modes
    if (newMode === 'upload') {
      setUrlInput('')
      setPreviewUrl('')
    } else {
      handleRemoveFile()
    }
  }

  const displayUrl = uploadMode === 'url' ? urlInput : (selectedFile ? previewUrl : '')

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="label">Logo</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleMode}
          className="text-xs"
        >
          {uploadMode === 'upload' ? (
            <>
              <Link className="w-3 h-3 mr-1" />
              Use URL instead
            </>
          ) : (
            <>
              <Upload className="w-3 h-3 mr-1" />
              Upload file instead
            </>
          )}
        </Button>
      </div>

      {uploadMode === 'upload' ? (
        <div className="space-y-3">
          {/* Hidden file input for form submission */}
          <input
            type="file"
            name={`${name}_file`}
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
          />

          {/* Hidden input to pass the preview URL if file is selected */}
          {selectedFile && (
            <input
              type="hidden"
              name={name}
              value=""
            />
          )}

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-3">
            {selectedFile ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <SafeAvatar
                    src={previewUrl}
                    alt="Logo preview"
                    fallback={getAvatarFallback(title)}
                    className="size-16"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm"
                  >
                    Choose file
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WebP, or SVG up to 2MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Input
            type="url"
            name={name}
            value={urlInput}
            onChange={handleUrlChange}
            placeholder="https://example.com/logo.png"
          />
          {displayUrl && (
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <SafeAvatar
                src={displayUrl}
                alt="Logo preview"
                fallback={getAvatarFallback(title)}
                className="size-10"
              />
              <span className="text-sm text-muted-foreground truncate flex-1">
                Preview
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}