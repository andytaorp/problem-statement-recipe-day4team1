import { useAuthContext } from './useAuthContext'
import { useRecipesContext } from './useRecipesContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchRecipes } = useRecipesContext()
  // need to change to recipe

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchRecipes({ type: 'SET_WORKOUTS', payload: null }) //need to change to recipe
  }

  return { logout }
}