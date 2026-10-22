import { BookOpen, LogIn, LogOut, Menu, PenLine, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Layout() {
  const { isLoggedIn, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)
  const onLogout = () => {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner container">
          <Link to="/" className="brand" aria-label="MiniBlog - Trang chủ" onClick={closeMenu}>
            <span className="brand-mark"><BookOpen size={20} strokeWidth={2.8} /></span>
            <span>mini<span className="brand-accent">blog</span><span className="brand-dot">.</span></span>
          </Link>
          <button className="mobile-menu" type="button" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`header-nav ${menuOpen ? 'open' : ''}`} aria-label="Điều hướng chính">
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Khám phá</NavLink>
            <NavLink to="/write" onClick={closeMenu} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Viết bài</NavLink>
            <div className="nav-divider" aria-hidden="true" />
            {isLoggedIn ? (
              <>
                <span className="user-pill"><span className="online-dot" /> admin</span>
                <button className="button button-ghost button-small" onClick={onLogout} type="button"><LogOut size={16} /> Đăng xuất</button>
              </>
            ) : (
              <Link className="button button-primary button-small" to="/login" state={{ from: location.pathname === '/write' ? location : undefined }} onClick={closeMenu}>
                <LogIn size={16} /> Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main id="main-content" className="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link to="/" className="footer-brand" onClick={closeMenu}><Sparkles size={18} /> miniblog.</Link>
          <span>Những ý tưởng nhỏ. Những câu chuyện lớn.</span>
          <span>React + TypeScript · <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">JSONPlaceholder</a></span>
          <Link to="/write" className="footer-write"><PenLine size={16} /> Viết câu chuyện của bạn</Link>
        </div>
      </footer>
    </div>
  )
}
