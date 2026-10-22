import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Spinner({ label = 'Đang tải dữ liệu...' }: { label?: string }) {
  return (
    <div className="loading-center" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export function ErrorMessage({ message, onRetry }: { message: string, onRetry?: () => void }) {
  return (
    <div className="notice notice-error" role="alert">
      <AlertCircle size={23} className="notice-icon" />
      <div className="notice-content">
        <strong>Rất tiếc, đã xảy ra lỗi</strong>
        <p>{message}</p>
      </div>
      {onRetry && <button type="button" className="button button-white button-small" onClick={onRetry}><RefreshCw size={15} /> Thử lại</button>}
    </div>
  )
}

export function BackLink({ to = '/', text = 'Quay lại trang chủ' }: { to?: string, text?: string }) {
  return <Link to={to} className="back-link"><ArrowLeft size={17} /> {text}</Link>
}
