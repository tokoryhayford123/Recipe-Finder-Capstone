import { useState } from 'react'

export default function SearchBar({ onSearch, defaultQuery = '' }) {
  const [input, setInput] = useState(defaultQuery)

  const submit = (e) => {
    e.preventDefault()
    const q = input.trim()
    if (!q) return
    onSearch(q)
  }

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-xl">
      <input
        className="flex-1 rounded-l-xl border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Search for a recipe (e.g., Arrabiata, Chicken)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-xl bg-blue-600 px-5 font-medium text-white hover:bg-blue-700 active:bg-blue-800"
      >
        Search
      </button>
    </form>
  )
}
