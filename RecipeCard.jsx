export default function RecipeCard({ recipe, onClick }) {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{recipe.strMeal}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {recipe.strCategory} • {recipe.strArea}
        </p>
      </div>
    </div>
  )
}
