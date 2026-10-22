import { useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/write'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (login(username, password)) navigate(from, { replace: true })
    else setError('Tên đăng nhập hoặc mật khẩu không chính xác.')
  }

  if (isLoggedIn) return <div className="auth-page"><div className="auth-card already-logged"><ShieldCheck size={48} /><h1>Bạn đã đăng nhập</h1><p>Tiếp tục chia sẻ câu chuyện của bạn nhé.</p><Link to="/write" className="button button-primary button-large">Đi đến trang viết bài <ArrowRight size={17} /></Link></div></div>

  return (
    <div className="auth-page">
      <div className="auth-side" aria-hidden="true"><div className="auth-pattern"><span className="auth-moon"/><span className="auth-star-one">✳</span><span className="auth-star-two">✦</span></div><div className="auth-side-copy"><span>WELCOME BACK</span><h2>Your story<br />starts here<span>.</span></h2><p>Viết tiếp những điều đáng nhớ.</p></div></div>
      <div className="auth-form-side">
        <div className="auth-card">
          <span className="form-eyebrow"><span className="eyebrow-dot" /> MINI BLOG COMMUNITY</span>
          <h1>Chào mừng trở lại <span>👋</span></h1>
          <p className="form-subtitle">Đăng nhập để bắt đầu viết và lưu những câu chuyện của bạn.</p>
          <form onSubmit={submit} noValidate>
            <label className="form-field"><span>Tên đăng nhập</span><div className="field-control"><UserRound size={19} /><input value={username} onChange={(event) => { setUsername(event.target.value); setError('') }} placeholder="Nhập tên đăng nhập" autoComplete="username" required /></div></label>
            <label className="form-field"><span>Mật khẩu</span><div className="field-control"><LockKeyhole size={19} /><input type={visible ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} placeholder="Nhập mật khẩu" autoComplete="current-password" required /><button type="button" className="show-password" aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setVisible((v) => !v)}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label>
            {error && <div className="form-error" role="alert">{error}</div>}
            <button type="submit" className="button button-primary button-submit">Đăng nhập <ArrowRight size={18} /></button>
          </form>
          <div className="test-credentials"><ShieldCheck size={18} /><div><strong>Tài khoản dùng thử</strong><span>admin / 123456</span></div></div>
          <Link className="auth-back" to="/">← Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  )
}
