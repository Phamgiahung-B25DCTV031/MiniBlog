import { ArrowRight, ArrowUpRight, BookOpen, Feather, PenLine, Search, Sparkles, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'
import { PostCard } from '../components/PostCard'
import { ErrorMessage, Spinner } from '../components/UI'

const PAGE_SIZE = 9
const norm = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')

export function HomePage() {
  const { posts, localCount, status, error, retry } = usePosts()
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const q = norm(query.trim())
  const found = posts.filter((post) => norm(post.title).includes(q))
  const pages = Math.max(1, Math.ceil(found.length / PAGE_SIZE))
  const requestedPage = Number(params.get('page') || '1')
  const page = Number.isSafeInteger(requestedPage) && requestedPage >= 1 ? Math.min(requestedPage, pages) : 1
  const showing = found.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const updateSearch = (value: string) => setParams(value ? { q: value } : {}, { replace: true })
  const goToPage = (next: number) => {
    setParams(query ? { q: query, page: String(next) } : { page: String(next) })
    document.querySelector('#articles')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="eyebrow"><Sparkles size={15} /> GÓC NHỎ DÀNH CHO Ý TƯỞNG LỚN</div>
            <h1>Mỗi câu chuyện<br />đều <span className="hero-highlight">đáng được kể<span className="highlight-star">✳</span></span></h1>
            <p className="hero-description">Khám phá những góc nhìn mới, lưu giữ ý tưởng hay và chia sẻ câu chuyện của chính bạn. Tất cả bắt đầu từ đây.</p>
            <div className="hero-actions">
              <a href="#articles" className="button button-primary button-large">Khám phá bài viết <ArrowRight size={18} /></a>
              <Link to="/write" className="button button-outline button-large"><PenLine size={17} /> Viết bài mới</Link>
            </div>
            <div className="hero-stats">
              <div><strong>{posts.length}</strong><span>Bài viết</span></div>
              <div className="stat-divider" />
              <div><strong>{localCount}</strong><span>Bài của bạn</span></div>
              <div className="stat-divider" />
              <div><strong>∞</strong><span>Ý tưởng mới</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-blob blob-a" /><div className="hero-blob blob-b" />
            <div className="hero-art-card hero-art-back"><span className="tiny-circle" /><span className="tiny-circle" /><span className="tiny-circle" /><div className="art-back-lines"><i /><i /><i /></div></div>
            <div className="hero-art-card hero-art-main">
              <div className="art-topline"><span>THE CREATIVE SPACE</span><span className="art-dot" /></div>
              <div className="illustration-book"><div className="page-left"><span /><span /><span /></div><div className="page-right"><span /><span /><span /></div></div>
              <div className="art-bottom"><span>Small stories,<br />big impact.</span><Feather size={27} /></div>
            </div>
            <div className="hero-float float-top"><Sparkles size={20} /> create.</div>
            <div className="hero-float float-bottom"><BookOpen size={18} /> share your story</div>
          </div>
        </div>
      </section>

      <section id="articles" className="articles-section container">
        <div className="section-intro">
          <div>
            <div className="section-kicker"><span className="section-kicker-line" /> THƯ VIỆN BÀI VIẾT</div>
            <h2>Chuyện hay đang chờ bạn <span>✳</span></h2>
            <p>Một chút cảm hứng cho ngày hôm nay.</p>
          </div>
          <div className="count-chip"><span className="count-dot" /> {found.length} bài viết</div>
        </div>

        <div className="filter-row">
          <label className="search-box">
            <Search size={21} aria-hidden="true" />
            <input type="search" value={query} onChange={(e) => updateSearch(e.target.value)} placeholder="Tìm kiếm theo tiêu đề bài viết..." aria-label="Tìm bài viết theo tiêu đề" />
            {query && <button type="button" className="search-clear" onClick={() => updateSearch('')} aria-label="Xóa tìm kiếm"><X size={17} /></button>}
          </label>
          <span className="filter-hint">Tìm câu chuyện bạn quan tâm <ArrowUpRight size={17} /></span>
        </div>

        {status === 'error' && <ErrorMessage message={`${error} Bạn vẫn có thể xem những bài đã lưu trên thiết bị.`} onRetry={retry} />}
        {status === 'loading' && posts.length === 0 ? <Spinner label="Đang lấy danh sách bài viết từ JSONPlaceholder..." /> :
          showing.length > 0 ? (
            <>
              <div className="posts-grid">{showing.map((post, index) => <PostCard key={post.id} post={post} index={(page - 1) * PAGE_SIZE + index} />)}</div>
              {pages > 1 && <div className="pagination" aria-label="Phân trang bài viết">
                <button type="button" disabled={page === 1} onClick={() => goToPage(page - 1)}>← Trước</button>
                <span>Trang <strong>{page}</strong> / {pages}</span>
                <button type="button" disabled={page === pages} onClick={() => goToPage(page + 1)}>Tiếp →</button>
              </div>}
            </>
          ) : status !== 'error' || posts.length > 0 ? (
            <div className="empty-state"><div className="empty-art"><Search size={32} /></div><h3>Chưa tìm thấy bài viết nào</h3><p>Hãy thử một từ khóa khác hoặc viết bài đầu tiên của bạn nhé!</p><button className="button button-outline" type="button" onClick={() => updateSearch('')}>Xóa bộ lọc</button></div>
          ) : null}
      </section>

      <section className="bottom-cta container">
        <div className="cta-icon"><PenLine size={29} /></div>
        <div><span className="cta-overline">BẮT ĐẦU TỪ MỘT DÒNG CHỮ</span><h2>Bạn có câu chuyện muốn chia sẻ?</h2><p>Hãy để ý tưởng của bạn trở thành nguồn cảm hứng cho người khác.</p></div>
        <Link to="/write" className="button button-white button-large">Bắt đầu viết <ArrowRight size={18} /></Link>
      </section>
    </>
  )
}
