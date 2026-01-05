import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'

interface PaginationProps {
  value: number
  totalPages: number
  totalCount: number
  onNewPage: (page: number) => void
}

export default function Pagination({ 
  value, 
  totalPages, 
  totalCount, 
  onNewPage 
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(value || 1)

  useEffect(() => {
    setCurrentPage(value)
  }, [value])

  const showPrevButton = currentPage > 1
  const showNextButton = currentPage < totalPages

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (newValue > 0 && newValue <= totalPages) {
      onNewPage(newValue)
    }
  }

  const keyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === '.') {
      e.preventDefault()
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <button
        disabled={!showPrevButton}
        onClick={() => onNewPage(currentPage - 1)}
        className={`flex items-center justify-center h-[26px] px-2 rounded bg-gray-500 text-white ${
          !showPrevButton ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
        }`}
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        <input
          type="number"
          min="1"
          max="9"
          value={currentPage}
          onChange={handleInput}
          onKeyDown={keyHandler}
          className="w-[30px] h-[26px] rounded text-center"
        />
        <p className="text-white">/ {totalPages}</p>
      </div>

      <button
        disabled={!showNextButton}
        onClick={() => onNewPage(currentPage + 1)}
        className={`flex items-center justify-center h-[26px] px-2 rounded bg-gray-500 text-white ${
          !showNextButton ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
        }`}
      >
        Next
      </button>
    </div>
  )
}