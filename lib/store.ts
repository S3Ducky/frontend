import { create } from "zustand"

export interface S3File {
  key: string
  size: number
  lastModified: Date
  etag: string
}

export interface S3Credentials {
  accessKey: string
  secretKey: string
  region: string
  bucketName: string
  prefix?: string
}

interface AppState {
  credentials: S3Credentials | null
  files: S3File[]
  selectedFiles: Set<string>
  isConnected: boolean
  isLoading: boolean
  error: string | null
  sessionExpiry: Date | null

  // Actions
  setCredentials: (credentials: S3Credentials) => void
  setFiles: (files: S3File[]) => void
  toggleFileSelection: (fileKey: string) => void
  selectAllFiles: () => void
  deselectAllFiles: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setConnected: (connected: boolean) => void
  clearSession: () => void
  initSession: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  credentials: null,
  files: [],
  selectedFiles: new Set(),
  isConnected: false,
  isLoading: false,
  error: null,
  sessionExpiry: null,

  setCredentials: (credentials) => set({ credentials }),

  setFiles: (files) => set({ files }),

  toggleFileSelection: (fileKey) =>
    set((state) => {
      const newSelected = new Set(state.selectedFiles)
      if (newSelected.has(fileKey)) {
        newSelected.delete(fileKey)
      } else {
        newSelected.add(fileKey)
      }
      return { selectedFiles: newSelected }
    }),

  selectAllFiles: () =>
    set((state) => ({
      selectedFiles: new Set(state.files.map((f) => f.key)),
    })),

  deselectAllFiles: () => set({ selectedFiles: new Set() }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setConnected: (isConnected) => set({ isConnected }),

  clearSession: () =>
    set({
      credentials: null,
      files: [],
      selectedFiles: new Set(),
      isConnected: false,
      error: null,
      sessionExpiry: null,
    }),

  initSession: () =>
    set({
      sessionExpiry: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    }),
}))
