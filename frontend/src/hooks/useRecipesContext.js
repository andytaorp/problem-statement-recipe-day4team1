import { RecipesContext } from '../context/RecipeContext'
import { useContext } from 'react'


//to be changed to recipe
export const useRecipesContext = () => {
  const context = useContext(RecipesContext)

  if (!context) {
    throw Error('useRecipesContext must be used inside an RecipesContextProvider')
  }

  return context
}