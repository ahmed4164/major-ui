import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

    // branch,
        // section,
        // year
  const signup = async (name, email, password, selectedRole, selectedCollege, collegeCode, branch, section, year ) => {
    setIsLoading(true)
    setError(null)
    console.log('@@inp',{name, email, password,type: selectedRole,  collegecode:collegeCode,
      collegename:selectedCollege, branch, section, year})

    const response = await fetch('https://major-rest-apis.onrender.com/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password, type:selectedRole, collegecode:collegeCode,
        collegename:selectedCollege, branch, section, year })
    })
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