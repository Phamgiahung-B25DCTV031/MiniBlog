import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { fetchPosts } from '../api'
import { loadLocalPosts, persistLocalPosts } from '../storage'
import type { LocalPost, Post, RequestStatus } from '../types'

type PostsContextValue = {
  posts: Post[]
  localCount: number
  status: RequestStatus
  error: string
  retry: () => void
  addPost: (title: string, body: string) => LocalPost
}

const PostsContext = createContext<PostsContextValue | null>(null)

export function PostsProvider({ children }: { children: ReactNode }) {
  const [remotePosts, setRemotePosts] = useState<Post[]>([])
  const [localPosts, setLocalPosts] = useState<LocalPost[]>(loadLocalPosts)
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError('')

    fetchPosts(controller.signal)
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Dữ liệu bài viết không hợp lệ.')
        setRemotePosts(data)
        setStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Không thể tải bài viết. Vui lòng thử lại.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [attempt])

  const value = useMemo<PostsContextValue>(() => ({
    posts: [...localPosts, ...remotePosts],
    localCount: localPosts.length,
    status,
    error,
    retry: () => setAttempt((n) => n + 1),
    addPost(title, body) {
      const newId = Math.max(Date.now(), 101, ...localPosts.map((post) => post.id + 1))
      const post: LocalPost = {
        id: newId,
        userId: 1,
        title: title.trim(),
        body: body.trim(),
        local: true,
        createdAt: new Date().toISOString(),
      }
      // Ghi ngay vào localStorage, trước khi điều hướng sang trang chi tiết.
      persistLocalPosts([post, ...localPosts])
      setLocalPosts((prev) => [post, ...prev])
      return post
    },
  }), [error, localPosts, remotePosts, status])

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export function usePosts() {
  const context = useContext(PostsContext)
  if (!context) throw new Error('usePosts phải được gọi bên trong PostsProvider')
  return context
}
