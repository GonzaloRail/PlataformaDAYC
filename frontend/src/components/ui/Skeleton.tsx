
import { Fragment } from 'react'
import './Skeleton.css'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'table' | 'card'
  width?: string
  height?: string
  count?: number
  className?: string
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
}: SkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'circular':
        return (
          <div
            className="skeleton skeleton-circular"
            style={{ width: width || '40px', height: height || '40px' }}
          />
        )
      case 'rectangular':
        return (
          <div
            className="skeleton skeleton-rect"
            style={{ width: width || '100%', height: height || '20px' }}
          />
        )
      case 'table':
        return (
          <div className="skeleton-table">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="skeleton-table-row">
                <div className="skeleton skeleton-text" style={{ width: '30%' }} />
                <div className="skeleton skeleton-text" style={{ width: '20%' }} />
                <div className="skeleton skeleton-text" style={{ width: '25%' }} />
                <div className="skeleton skeleton-text" style={{ width: '25%' }} />
              </div>
            ))}
          </div>
        )
      case 'card':
        return (
          <div className="skeleton-card">
            <div className="skeleton skeleton-rect" style={{ width: '100%', height: '120px' }} />
            <div className="skeleton skeleton-text" style={{ width: '80%', marginTop: '12px' }} />
            <div className="skeleton skeleton-text" style={{ width: '60%' }} />
          </div>
        )
      default:
        return (
          <div
            className="skeleton skeleton-text"
            style={{ width: width || '100%', height: height || '16px' }}
          />
        )
    }
  }

  return (
    <div className={`skeleton-wrapper ${className}`} role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <Fragment key={i}>
          {renderSkeleton()}
        </Fragment>
      ))}
    </div>
  )
}

export function SkeletonCard({ count = 1 }: { count?: number }) {
  return <Skeleton variant="card" count={count} />
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return <Skeleton variant="table" count={rows} />
}

export default Skeleton
