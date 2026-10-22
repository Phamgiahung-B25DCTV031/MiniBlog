import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Lightbulb, PenLine, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'

export function WritePage() {
  const { addPost } = usePosts()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState('')
  const titleError = title.trim().length < 5 ? 'Tiêu đề cần ít nhất 5 ký tự.' : ''
  const bodyError = body.trim().length < 20 ? 'Nội dung cần ít nhất 20 ký tự.' : ''

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setSaveError('')
    if (titleError || bodyError) return
    try {
      const newPost = addPost(title, body)
      navigate(`/posts/${newPost.id}`)
    } catch {
      setSaveError('Không lưu được bài viết vào localStorage. Hãy kiểm tra dung lượng lưu trữ/trình duyệt và thử lại.')
    }
  }

  return (
    <div className="editor-page container">
      <Link className="back-link" to="/"><ArrowLeft size={17} /> Quay về trang chủ</Link>
      <div className="editor-header"><div className="form-eyebrow"><span className="eyebrow-dot" /> KHÔNG GIAN SÁNG TẠO</div><h1>Viết nên câu chuyện <span>của bạn ✳</span></h1><p>Mọi câu chuyện đều bắt đầu từ một ý tưởng nhỏ.</p></div>
      <div className="editor-layout">
        <form className="editor-card" onSubmit={handleSubmit} noValidate>
          <div className="editor-card-top"><div className="editor-step"><span>01</span> THÔNG TIN BÀI VIẾT</div><span className="draft-indicator"><span /> Bản nháp</span></div>
          <div className="editor-fields">
            <label className="editor-label" htmlFor="post-title">Tiêu đề bài viết <span>*</span></label>
            <p className="field-description">Một tiêu đề hấp dẫn sẽ thu hút người đọc.</p>
            <input id="post-title" className="editor-title-input" placeholder="Ví dụ: Những điều nhỏ bé làm nên hạnh phúc..." maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} aria-invalid={submitted && Boolean(titleError)} aria-describedby={submitted && titleError ? 'title-error' : undefined} />
            <div className="field-foot"><span className="input-error" id="title-error">{submitted && titleError}</span><span>{title.length}/120</span></div>
            <div className="editor-separator" />
            <label className="editor-label" htmlFor="post-body">Nội dung bài viết <span>*</span></label>
            <p className="field-description">Chia sẻ suy nghĩ, trải nghiệm hoặc những gì bạn tâm đắc.</p>
            <textarea id="post-body" rows={11} placeholder="Hôm nay tôi muốn kể cho bạn nghe về..." maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} aria-invalid={submitted && Boolean(bodyError)} aria-describedby={submitted && bodyError ? 'body-error' : undefined} />
            <div className="field-foot"><span className="input-error" id="body-error">{submitted && bodyError}</span><span>{body.length}/5000</span></div>
          </div>
          {saveError && <div className="form-error" role="alert">{saveError}</div>}
          <div className="editor-actions"><span><CheckCircle2 size={17} /> Bài viết được lưu ngay trên trình duyệt</span><button className="button button-primary button-large" type="submit">Đăng bài viết <ArrowRight size={18} /></button></div>
        </form>
        <aside className="editor-sidebar">
          <div className="editor-tip-card"><div className="tip-icon"><Lightbulb size={24} /></div><h3>Viết hay hơn mỗi ngày</h3><p>Một vài gợi ý nhỏ để câu chuyện của bạn thật cuốn hút.</p><ul><li>Đặt tiêu đề ngắn gọn, rõ ràng.</li><li>Bắt đầu bằng một điều thú vị.</li><li>Chia sẻ cảm xúc thật của bạn.</li><li>Đọc lại trước khi đăng bài.</li></ul></div>
          <div className="editor-storage-card"><FileText size={24} /><strong>Bài viết được lưu cục bộ</strong><p>Nội dung của bạn được lưu trong localStorage và sẽ xuất hiện ngay ở trang chủ. Không có máy chủ lưu bài mới.</p></div>
          <div className="editor-sidebar-sign"><Sparkles size={18} /> Every story matters. <PenLine size={18} /></div>
        </aside>
      </div>
    </div>
  )
}
