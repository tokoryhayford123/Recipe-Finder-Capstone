export default function RecipeDetails({ recipe, onBack }) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`]
    const mea = recipe[`strMeasure${i}`]
    if (ing && ing.trim()) ingredients.push(`${ing}${mea ? ` — ${mea}` : ''}`)
  }

  // Try to extract a YouTube ID robustly
  const yt = recipe.strYoutube || ''
  let ytId = ''
  try {
    const url = new URL(yt)
    ytId = url.searchParams.get('v') || yt.split('/').pop()
  } catch (_) {
    ytId = yt.includes('v=') ? yt.split('v=')[1] : ''
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
      <button
        onClick={onBack}
        className="mb-4 rounded-lg bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
      >
        ← Back to results
      </button>

      <div className="grid gap-6 md:grid-cols-2">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-full w-full rounded-xl object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Category:</span> {recipe.strCategory}
            <br />
            <span className="font-semibold">Cuisine:</span> {recipe.strArea}
          </p>

          <h3 className="mt-4 text-lg font-semibold">Ingredients</h3>
          <ul className="ml-5 list-disc space-y-1">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Instructions</h3>
        <p className="whitespace-pre-line">{recipe.strInstructions}</p>
      </div>

      {ytId && (
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Tutorial Video</h3>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${ytId}`}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {recipe.strSource && (
        <a
          className="mt-6 inline-block text-blue-600 underline"
          href={recipe.strSource}
          target="_blank"
          rel="noreferrer"
        >
          View Full Recipe Source
        </a>
      )}
    </div>
  )
}
