import { useState, type ChangeEvent } from 'react'
import { Button, Input } from '@/components/ui'
import './DateRangeFilter.css'

interface DateRange {
  from: string
  to: string
}

interface DateRangeFilterProps {
  onChange: (range: DateRange | null) => void
}

export function DateRangeFilter({ onChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setMonth(date.getMonth() - 1)
    return date.toISOString().split('T')[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0])

  const getToday = () => new Date().toISOString().split('T')[0]

  const handleQuickSelect = (range: 'week' | 'month' | 'quarter' | 'year') => {
    const end = new Date()
    const start = new Date()
    
    switch (range) {
      case 'week':
        start.setDate(start.getDate() - 7)
        break
      case 'month':
        start.setMonth(start.getMonth() - 1)
        break
      case 'quarter':
        start.setMonth(start.getMonth() - 3)
        break
      case 'year':
        start.setFullYear(start.getFullYear() - 1)
        break
    }
    
    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const handleApply = () => {
    if (startDate && endDate && startDate <= endDate) {
      onChange({ from: startDate, to: endDate })
    }
  }

  const handleClear = () => {
    setStartDate('')
    setEndDate('')
    onChange(null)
  }

  return (
    <div className="date-range-filter">
      <div className="filter-header">
        <h3 className="filter-title">Filtrar por fecha</h3>
        <div className="quick-select">
          <Button size="sm" variant="ghost" onClick={() => handleQuickSelect('week')}>
            7 días
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleQuickSelect('month')}>
            1 mes
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleQuickSelect('quarter')}>
            3 meses
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleQuickSelect('year')}>
            1 año
          </Button>
        </div>
      </div>

      <div className="filter-inputs">
        <div className="date-input-group">
          <label className="input-label">Desde</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            max={endDate || getToday()}
          />
        </div>

        <span className="date-separator">→</span>

        <div className="date-input-group">
          <label className="input-label">Hasta</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
            min={startDate}
            max={getToday()}
          />
        </div>

        <div className="filter-actions">
          <Button onClick={handleApply}>
            Aplicar
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DateRangeFilter