import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import RecipeCard from './components/RecipeCard.jsx'
import RecipeDetails from './components/RecipeDetails.jsx'

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastQuery, setLastQuery] = useState('')

  async function fetchRecipes(q) {
    setLoading(true)
    setError('')
    setSelected(null)
    setRecipes([])
    setLastQuery(q)
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      const list = data?.meals ?? []
      setRecipes(list)
      if (list.length === 0) setError('No recipes found for that search. Try another dish name.')
    } catch (e) {
      setError('Failed to fetch recipes. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <header className="mx-auto mb-6 max-w-5xl text-center">
        <h1 className="text-3xl font-extrabold">🍲 Recipe Finder</h1>
        <p className="mt-2 text-gray-600">Search meals by name and view ingredients, instructions, and videos.</p>
      </header>

      <div className="mx-auto max-w-5xl">
        <SearchBar onSearch={fetchRecipes} />

        {loading && <p className="mt-6 text-center">Loading…</p>}
        {error && !loading && <p className="mt-6 text-center text-red-600">{error}</p>}

        {!selected && !loading && recipes.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => (
              <RecipeCard key={r.idMeal} recipe={r} onClick={() => setSelected(r)} />
            ))}
          </div>
        )}

        {!selected && !loading && recipes.length === 0 && !error && (
          <p className="mt-6 text-center text-gray-600">Try searching for something like "Chicken", "Pasta", or "Arrabiata".</p>
        )}

        {selected && (
          <div className="mt-6">
            <RecipeDetails recipe={selected} onBack={() => setSelected(null)} />
          </div>
        )}
      </div>

      <footer className="mt-10 text-center text-xs text-gray-500">
        Data from TheMealDB.com — free open API
      </footer>
    </div>
  )
}
