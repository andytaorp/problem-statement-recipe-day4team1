import { createContext, useReducer } from 'react'

export const RecipesContext = createContext()

//to be changed to recipes
export const RecipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPE': //to be changed to recipe
      return {
        recipes: action.payload
      }
    case 'CREATE_RECIPE': //to be changed to recipe
      return {
        recipes: [action.payload, ...state.recipes]
      }
    case 'DELETE_RECIPE': //to be changed to recipe
      return {
        recipes: state.recipes.filter((w) => w._id !== action.payload._id)
      }

    //Editing a Recipe  - .map function to loop through recipes, update the recipe that matches the id
    case 'EDIT_RECIPE': //to be done
      return {
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        )
      }
    default:
      return state
  }
}

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipesReducer, {
    recipes: null
  })

  return (
    <RecipesContext.Provider value={{...state, dispatch}}>
      { children }
    </RecipesContext.Provider>
  )
}