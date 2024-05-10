import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)
    console.log('@@inp',{name, email, password})

    const response = await fetch('https://major-rest-apis.onrender.com/register/teacher', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password })
    })
    console.log('@@response',response)
    const json = await response.json()

    if (!json.isSuccess) {
      setIsLoading(false)
      setError(json.error)
    }
    if (json.isSuccess) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}