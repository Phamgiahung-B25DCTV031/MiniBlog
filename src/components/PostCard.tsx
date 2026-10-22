import { ArrowUpRight, Bookmark, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { isLocalPost, type Post } from '../types'

export function PostCard({ post, index }: { post: Post, index: number }) {
  const local = isLocalPost(post)
  const theme = ['purple', 'peach', 'mint', 'blue', 'lavender', 'yellow'][index % 6]
  return (
    <article className="post-card">
      <Link className={`post-art art-${theme}`} to={`/posts/${post.id}`} aria-label={`Đọc bài: ${post.title}`}>
        <span className="art-shape art-shape-one" />
        <span className="art-shape art-shape-two" />
        <span className="art-shape art-shape-three" />
        <span className="art-counter">{String(index + 1).padStart(2, '0')}</span>
        <span className="art-arrow"><ArrowUpRight size={21} /></span>
      </Link>
      <div className="post-card-body">
        <div className="post-meta">
          <span className={`meta-category ${local ? 'meta-own' : ''}`}><Bookmark size={13} /> {local ? 'Bài viết của bạn' : 'Bài viết'}</span>
          <span className="meta-separator">•</span>
          {local ? <span><CalendarDays size={13} /> {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span> : <span>#{post.id}</span>}
        </div>
        <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
        <p>{post.body}</p>
        <Link className="read-more" to={`/posts/${post.id}`}>Đọc tiếp <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  )
}
