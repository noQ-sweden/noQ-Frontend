import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from './../api/AxiosNoqApi'
import PropTypes from 'prop-types'
import useLogin from './../hooks/useLogin'
import useHeader from './../hooks/useHeader'
import SEO from '../components/SEO'

LoginPage.propTypes = {
  loginHandler: PropTypes.func
}

export default function LoginPage() {
  const { setLogin } = useLogin()
  const { setHeader } = useHeader()
  const userRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const navigateToRegister = () => {
    navigate('/register')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    axios
      .post('api/login/', {
        email: username,
        password: password
      })
      .then((response) => {
        if (response.status === 200 && response.data.login_status === true) {
          const usergroups = response?.data?.groups
          const host = response?.data?.host
          const first_name = response?.data?.first_name
          const last_name = response?.data?.last_name
          setLogin({ username, first_name, last_name, usergroups, host })
          setHeader('')

          setUsername('')
          setPassword('')

          const returnUrl = from === '/' ? '/' + usergroups[0] : from
          navigate(returnUrl, { replace: true })
        } else {
          setErrorMessage('Autentisering misslyckades.')
          setUsername('')
          setPassword('')
        }
      })
      .catch((error) => {
        console.log('Error while login.', error)
      })
    setPassword('')
  }

  return (
    <>
      <SEO
        title={`Inloggning | NoQ - Trygg Plats för att alla förtjänar det`}
      />
      <div className="flex flex-col items-center">
        <div className="mb-12 text-red-600 text-xl font-semibold">
          <p
            ref={errorRef}
            className={errorMessage ? 'errorMessage' : 'offScreen'}
          >
            {errorMessage}
          </p>
        </div>
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <h1 className="mb-8 text-2xl font-bold text-green-noQ tracking-normal">
                Välkommen till noQ
              </h1>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-base font-semibold mb-2"
                htmlFor="username"
              >
                E-post
                <input
                  className="
                  appearance-none
                  border rounded
                  w-full
                  py-2
                  px-3
                  bg-slate-100
                  text-gray-700
                  leading-tight
                  focus:outline-none
                  focus:shadow-outline"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="on"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              </label>
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-base font-semibold mb-2"
                htmlFor="password"
              >
                Lösenord
                <input
                  className="
                  appearance-none
                  border rounded
                  w-full
                  py-2
                  px-3
                  bg-slate-100
                  text-gray-700
                  leading-tight
                  focus:outline-none
                  focus:shadow-outline"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  autoComplete="current-password"
                />
              </label>
            </div>
            <div>
              <p className="text-sm">Glömt lösenordet?</p>
            </div>
            {/*
          // to be added when this functionality is in place
          <div className="mb-4 flex flex-row items-center">
            <div>
              <input type="checkbox" />
            </div>
            <div>
              <p className="text-sm mx-2">Håll mig inloggad</p>
            </div>
          </div>
          */}
            <div className="flex flex-col items-center mt-10">
              <button
                type="submit"
                className="
                bg-green-600
                hover:bg-green-700
                text-white
                font-bold
                w-44
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline"
                id="login-button"
              >
                Logga in
              </button>
            </div>
            <div className="flex flex-col items-center mt-10">
              <div>
                <p className="text-sm mb-1">Har du inget konto?</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="
                  bg-gray-200
                  hover:bg-gray-300
                  border-slate-800
                  text-gray-500
                  font-bold
                  w-44
                  py-2
                  px-4
                  rounded
                  focus:outline-none
                  focus:shadow-outline"
                  id="register-button"
                >
                  Skapa konto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
