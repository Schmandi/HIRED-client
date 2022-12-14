import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"
import ErrorMessage from "../../components/ErrorMessage"

const Login = () => {
  useTitle("Login - HIRED Issue Tracker")
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = (e) => setPersist((prev) => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap() //unwrap to not use RTK Query error / isError blocks
      dispatch(setCredentials({ accessToken }))
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response")
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password")
      } else if (err.status === 401) {
        setErrMsg("Wrong Username or Password")
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading)
    return (
      <p className="loading-animation-wrapper">
        <PulseLoader color={"var(--COLOR)"} className="loading-animation" />
        <p className="loginmsg">
          This can take some time (1-2 min), when the app starts the first time
          in a while.
        </p>
      </p>
    )

  const content = (
    <section className="public">
      <theader>
        <h1>Employee Login</h1>
      </theader>
      <main className="login">
        <ErrorMessage
          ref={errRef}
          ariaLive="assertive"
          errMsg={errMsg}
          errClass={errClass}
        />

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="form__submit-button">Sign In</button>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust this device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  )

  return content
}

export default Login
