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