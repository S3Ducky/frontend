"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, Key, Database, MapPin, Filter } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { S3Client } from "@/lib/s3-client"
import { AWS_REGIONS } from "@/lib/utils"
import { SessionTimeout } from "@/components/session-timeout"
import Image from "next/image";

export default function CredentialsPage() {
  const router = useRouter()
  const { setCredentials, setConnected, setLoading, setError, error, isLoading, initSession } = useAppStore()

  

  const [formData, setFormData] = useState({
    accessKey: "",
    secretKey: "",
    region: "us-east-1",
    bucketName: "",
    prefix: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const credentials = {
        accessKey: formData.accessKey,
        secretKey: formData.secretKey,
        region: formData.region,
        bucketName: formData.bucketName,
        prefix: formData.prefix || undefined,
      }

      const s3Client = new S3Client(credentials)
      await s3Client.validateCredentials()

      setCredentials(credentials)
      setConnected(true)
      initSession()
      router.push("/browser")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.accessKey && formData.secretKey && formData.region && formData.bucketName

  return (
    <div className="max-w-2xl mx-auto">
      <SessionTimeout />

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Image
                      src="/Amazon-S3-Logo.png" 
                      alt="S3Ducky Logo"
                      width={32}
                      height={32}
                      className="h-12 w-12"
                    />
          </div>
          <CardTitle className="text-3xl">Connect to AWS S3</CardTitle>
          <CardDescription className="text-lg">
            Enter your AWS credentials to securely access your S3 bucket
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessKey" className="flex items-center">
                <Key className="h-4 w-4 mr-2" />
                AWS Access Key ID
              </Label>
              <Input
                id="accessKey"
                type="text"
                placeholder="AKIA..."
                value={formData.accessKey}
                onChange={(e) => setFormData((prev) => ({ ...prev, accessKey: e.target.value }))}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secretKey" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                AWS Secret Access Key
              </Label>
              <Input
                id="secretKey"
                type="password"
                placeholder="••••••••••••••••••••••••••••••••••••••••"
                value={formData.secretKey}
                onChange={(e) => setFormData((prev) => ({ ...prev, secretKey: e.target.value }))}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                AWS Region
              </Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AWS_REGIONS.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bucketName" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                S3 Bucket Name
              </Label>
              <Input
                id="bucketName"
                type="text"
                placeholder="my-bucket-name"
                value={formData.bucketName}
                onChange={(e) => setFormData((prev) => ({ ...prev, bucketName: e.target.value }))}
                required
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prefix" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Prefix Filter (Optional)
              </Label>
              <Input
                id="prefix"
                type="text"
                placeholder="folder/subfolder/"
                value={formData.prefix}
                onChange={(e) => setFormData((prev) => ({ ...prev, prefix: e.target.value }))}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Filter files by prefix (e.g., "documents/" to show only files in the documents folder)
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full h-12 text-lg"  style={{ backgroundColor: "#f90" }} disabled={!isFormValid || isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect to S3"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Security Notice
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Your credentials are processed securely in memory only</li>
              <li>• No credentials are stored in browser storage or cookies</li>
              <li>• Session automatically expires after 30 minutes of inactivity</li>
              <li>• All connections use HTTPS encryption</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
