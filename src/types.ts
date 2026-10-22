export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface LocalPost extends Post {
  local: true
  createdAt: string
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type RequestStatus = 'loading' | 'success' | 'error'

export function isLocalPost(post: Post): post is LocalPost {
  return 'local' in post && (post as LocalPost).local === true
}
