import type { LocalPost } from './types'

export const LOCAL_POSTS_KEY = 'miniblog_posts_v1'
export const AUTH_KEY = 'miniblog_logged_in_v1'

export function loadLocalPosts(): LocalPost[] {
  try {
    const raw = window.localStorage.getItem(LOCAL_POSTS_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((post): post is LocalPost =>
      typeof post === 'object' && post !== null &&
      'id' in post && typeof post.id === 'number' && Number.isSafeInteger(post.id) &&
      'title' in post && typeof post.title === 'string' &&
      'body' in post && typeof post.body === 'string' &&
      'createdAt' in post && typeof post.createdAt === 'string' &&
      'userId' in post && typeof post.userId === 'number' &&
      'local' in post && post.local === true,
    )
  } catch {
    return []
  }
}

export function persistLocalPosts(posts: LocalPost[]): void {
  window.localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(posts))
}
