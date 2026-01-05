import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

interface SearchComponentProps {
  onClose: () => void
}

export default function SearchComponent({ onClose }: SearchComponentProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onSearch = () => {
    if (search.length > 0) {
      setIsSearch(true)
      router.push({ pathname: '/', query: { search } })
      window.scrollTo(0, 0)
      setSearch("")
      onClose()
    }
  }

  return (
    <div className="w-full">
      <h4 className="text-left text-gray-500 mb-4">Search</h4>

      <div className="mt-5 mb-3 w-full flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for game"
          className="form-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <button
          className="bg-[#faa100] text-white cursor-pointer px-2.5 py-1.5 rounded-lg flex-[0_0_10%]"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  )
}