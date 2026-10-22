import { ArrowLeft, Compass, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <div className="not-found container"><div className="not-found-graphic"><div className="not-found-orbit" /><Compass size={66} strokeWidth={1.5} /><span className="nf-star-one">✳</span><span className="nf-star-two">✦</span></div><span className="nf-kicker">OOPS! TRANG NÀY KHÔNG TỒN TẠI</span><h1>4<span>0</span>4</h1><h2>Có vẻ bạn đã đi lạc một chút!</h2><p>Đường dẫn không tồn tại hoặc bài viết bạn tìm kiếm không còn ở đây.</p><Link className="button button-primary button-large" to="/"><Home size={18} /> Về trang chủ <ArrowLeft size={16} /></Link></div>
}
