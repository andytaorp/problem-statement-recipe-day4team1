import { useRecipesContext } from '../hooks/useRecipesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const RecipeDetails = ({ recipe }) => {
  const { dispatch } = useRecipesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/` + recipe._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_RECIPE', payload: json})
    }
  }


  //EDITING A RECIPE
  const handleEdit = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipes/` + recipe._id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    body: JSON.stringify({
      // You would send the updated data here (for example, update name, ingredients, etc.)
      name: "Updated Name", // replace with actual new data you want to update
      ingredients: "Updated Ingredients",
      instructions: "Updated Instructions",
      prepTime: "Updated Prep Time",
      difficulty: "Updated Difficulty"
      })
    })

    

    const json = await response.json()

    // Dispatch the edit action if the response is successful
    if (response.ok) {
      dispatch({ type: 'EDIT_RECIPE', payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4>{recipe.name}</h4>
      <p><strong>Ingredients: </strong>{recipe.ingredients}</p>
      <p><strong>Instructions: </strong>{recipe.instructions}</p>
      <p><strong>Preparation Time: </strong>{recipe.prepTime}</p>
      <p><strong>Difficulty: </strong>{recipe.difficulty}</p>
      <p>{formatDistanceToNow(new Date(recipe.createdAt), { addSuffix: true })}</p>
      <div className="recipe-buttons">
      <span className="material-symbols-outlined" onClick={handleEdit}>edit</span>
        <span className="material-symbols-outlined" style={{backgroundColor: 'red'}} onClick={handleClick}>delete</span>
        
      </div>
    </div>
  )
}

export default RecipeDetails