import type { Comment, Post } from './types'

const API_URL = 'https://jsonplaceholder.typicode.com'

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { signal })
  if (!response.ok) {
    throw new Error(`Không thể lấy dữ liệu (HTTP ${response.status}).`)
  }
  return (await response.json()) as T
}

export const fetchPosts = (signal?: AbortSignal) => getJson<Post[]>('/posts', signal)
export const fetchComments = (postId: number, signal?: AbortSignal) =>
  getJson<Comment[]>(`/posts/${postId}/comments`, signal)
