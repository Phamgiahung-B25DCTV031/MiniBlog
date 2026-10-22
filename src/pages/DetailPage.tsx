import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, MessageCircle, PenLine, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { fetchComments } from '../api'
import { ErrorMessage, Spinner } from '../components/UI'
import { usePosts } from '../context/PostsContext'
import { isLocalPost, type Comment, type RequestStatus } from '../types'
import { NotFoundPage } from './NotFoundPage'

export function DetailPage() {
  const { id } = useParams()
  const numericId = Number(id)
  const { posts, status, error, retry } = usePosts()
  const post = Number.isSafeInteger(numericId) && numericId > 0 ? posts.find((item) => item.id === numericId) : undefined
  const isLocal = post ? isLocalPost(post) : false
  const [comments, setComments] = useState<Comment[]>([])
  const [commentsStatus, setCommentsStatus] = useState<RequestStatus>('loading')
  const [commentsError, setCommentsError] = useState('')
  const [commentsRetry, setCommentsRetry] = useState(0)

  useEffect(() => {
    if (!post || isLocal) return
    const controller = new AbortController()
    setCommentsStatus('loading')
    setCommentsError('')
    setComments([])
    fetchComments(post.id, controller.signal)
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Dữ liệu bình luận không hợp lệ.')
        setComments(data)
        setCommentsStatus('success')
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setCommentsError(err instanceof Error ? err.message : 'Không tải được bình luận.')
        setCommentsStatus('error')
      })
    return () => controller.abort()
  }, [post?.id, isLocal, commentsRetry])

  if (status === 'loading' && !post) return <div className="container page-loading"><Spinner label="Đang tải nội dung bài viết..." /></div>
  if (status === 'error' && !post) return <div className="container page-error"><ErrorMessage message={error} onRetry={retry} /><Link className="back-link" to="/"><ArrowLeft size={16} /> Về trang chủ</Link></div>
  if (!post) return <NotFoundPage />

  const localPost = isLocalPost(post) ? post : null
  const paragraphs = post.body.split(/\n+/).filter(Boolean)

  return (
    <div className="detail-page">
      <div className="container detail-container">
        <Link to="/" className="back-link"><ArrowLeft size={17} /> Trở lại bài viết</Link>
        <article className="detail-article">
          <div className="detail-heading">
            <div className="detail-topline"><span className="detail-label">{isLocal ? '✦ BÀI VIẾT CỦA BẠN' : '✦ MINI BLOG STORIES'}</span><span className="detail-number">#{post.id}</span></div>
            <h1>{post.title}</h1>
            <div className="detail-author-row">
              <div className="author-avatar"><UserRound size={21} /></div>
              <div><strong>{isLocal ? 'admin' : `Tác giả #${post.userId}`}</strong><span>{localPost ? <><CalendarDays size={13} /> {new Date(localPost.createdAt).toLocaleDateString('vi-VN')}</> : 'Bài viết từ JSONPlaceholder'}</span></div>
              <div className="detail-author-spacer" />
              <span className="read-time"><PenLine size={15} /> {Math.max(1, Math.ceil(post.body.trim().split(/\s+/).length / 200))} phút đọc</span>
            </div>
          </div>
          <div className="detail-cover" aria-hidden="true"><span className="cover-large-circle" /><span className="cover-small-circle" /><span className="cover-quote">“</span><span className="cover-stars">✳ ✦</span></div>
          <div className="detail-content">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        </article>

        <section className="comments-section" aria-labelledby="comment-title">
          <div className="comments-title-row"><div><span className="section-kicker"><span className="section-kicker-line" /> THẢO LUẬN</span><h2 id="comment-title">Bình luận <span className="comments-counter">{isLocal ? 0 : comments.length}</span></h2></div><MessageCircle size={28} className="comment-heading-icon" /></div>
          {isLocal ? <div className="comments-empty">Đây là bài viết lưu trên thiết bị của bạn, chưa có bình luận trên JSONPlaceholder.</div> : (
            <>
              {commentsStatus === 'loading' && <Spinner label="Đang tải bình luận..." />}
              {commentsStatus === 'error' && <ErrorMessage message={commentsError} onRetry={() => setCommentsRetry((value) => value + 1)} />}
              {commentsStatus === 'success' && (comments.length ? <div className="comments-list">{comments.map((comment, index) => (
                <div className="comment-card" key={comment.id}>
                  <div className={`comment-avatar avatar-${index % 4}`}>{comment.email.charAt(0).toUpperCase()}</div>
                  <div className="comment-text"><div className="comment-person"><strong>{comment.name}</strong><span>#{String(index + 1).padStart(2, '0')}</span></div><a className="comment-email" href={`mailto:${comment.email}`}>{comment.email}</a><p>{comment.body}</p></div>
                </div>
              ))}</div> : <div className="comments-empty">Bài viết này chưa có bình luận.</div>)}
            </>
          )}
        </section>
        <div className="detail-bottom-nav"><Link to="/" className="back-link"><ArrowLeft size={17} /> Xem những bài viết khác</Link><Link to="/write" className="detail-write-link">Chia sẻ câu chuyện <ArrowUpRight size={17} /></Link></div>
      </div>
    </div>
  )
}
