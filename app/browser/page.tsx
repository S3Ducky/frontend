"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Download, Archive, Search, File, Loader2, CheckSquare, Square } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { S3Client } from "@/lib/s3-client"
import { formatFileSize, formatDate } from "@/lib/utils"
import { SessionTimeout } from "@/components/session-timeout"

export default function BrowserPage() {
  const router = useRouter()
  const {
    credentials,
    files,
    selectedFiles,
    isConnected,
    isLoading,
    error,
    setFiles,
    setLoading,
    setError,
    toggleFileSelection,
    selectAllFiles,
    deselectAllFiles,
    clearSession,
  } = useAppStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (!isConnected || !credentials) {
      router.push("/")
      return
    }

    loadFiles()
  }, [isConnected, credentials, router])

  const loadFiles = async () => {
    if (!credentials) return

    setLoading(true)
    setError(null)

    try {
      const s3Client = new S3Client(credentials)

      // await s3Client.validateCredentials();
      const fileList = await s3Client.listObjects()
      setFiles(fileList)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files")
       setFiles([])
    } finally {
      setLoading(false)
    }
  }

  const filteredFiles = files.filter((file) => file.key.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectedCount = selectedFiles.size
  const allSelected = filteredFiles.length > 0 && filteredFiles.every((file) => selectedFiles.has(file.key))
  const someSelected = selectedFiles.size > 0 && !allSelected

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllFiles()
    } else {
      // Select all filtered files
      filteredFiles.forEach((file) => {
        if (!selectedFiles.has(file.key)) {
          toggleFileSelection(file.key)
        }
      })
    }
  }

  const handleDownloadSelected = async () => {
    if (selectedCount === 0 || !credentials) return

    setIsDownloading(true)
    try {
      const s3Client = new S3Client(credentials)
      const selectedFileKeys = Array.from(selectedFiles)

      if (selectedCount === 1) {
        // Download single file
        const blob = await s3Client.downloadFile(selectedFileKeys[0])
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = selectedFileKeys[0].split("/").pop() || "download"
        a.click()
        URL.revokeObjectURL(url)
      } else {
        // Download as ZIP
        const blob = await s3Client.downloadMultipleFiles(selectedFileKeys)
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `s3ducky-files-${new Date().toISOString().split("T")[0]}.zip`
        a.click()
        URL.revokeObjectURL(url)
      }

      deselectAllFiles()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed")
    } finally {
      setIsDownloading(false)
    }
  }

  if (!isConnected) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="max-w-7xl mx-auto">
      <SessionTimeout />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">S3 File Browser</h1>
          <p className="text-muted-foreground mt-1">
            Connected to <Badge variant="secondary">{credentials?.bucketName}</Badge>
            {credentials?.prefix && (
              <span className="ml-2">
                with prefix <Badge variant="outline">{credentials.prefix}</Badge>
              </span>
            )}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            clearSession()
            router.push("/")
          }}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Credentials
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <File className="h-5 w-5 mr-2" />
              Files ({filteredFiles.length})
            </CardTitle>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {selectedCount > 0 && (
                <Button onClick={handleDownloadSelected} disabled={isDownloading} className="flex items-center">
                  {isDownloading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : selectedCount === 1 ? (
                    <Download className="h-4 w-4 mr-2" />
                  ) : (
                    <Archive className="h-4 w-4 mr-2" />
                  )}
                  {isDownloading
                    ? "Downloading..."
                    : selectedCount === 1
                      ? "Download File"
                      : `Download ${selectedCount} as ZIP`}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mr-3" />
              <span>Loading files...</span>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No files found</p>
              {searchTerm && <p className="text-sm mt-2">Try adjusting your search term</p>}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="flex items-center bg-transparent"
                  >
                    {allSelected ? <CheckSquare className="h-4 w-4 mr-2" /> : <Square className="h-4 w-4 mr-2" />}
                    {allSelected ? "Deselect All" : "Select All"}
                  </Button>

                  {selectedCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {selectedCount} file{selectedCount !== 1 ? "s" : ""} selected
                    </span>
                  )}
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                       <Checkbox
                        checked={allSelected ? true : someSelected ? "indeterminate" : false}
                        onCheckedChange={handleSelectAll}
                      />

                    

                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Modified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow key={file.key}>
                        <TableCell>
                          <Checkbox
                            checked={selectedFiles.has(file.key)}
                            onCheckedChange={() => toggleFileSelection(file.key)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <File className="h-4 w-4 mr-2 text-muted-foreground" />
                            {file.key}
                          </div>
                        </TableCell>
                        <TableCell>{formatFileSize(file.size)}</TableCell>
                        <TableCell>{formatDate(file.lastModified)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
