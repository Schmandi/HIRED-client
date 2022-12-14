import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Welcome = () => {
  const { username, /*isDeveloper,*/ isSubmitter, isAdmin } = useAuth()

  const date = new Date()
  // Formatting the date:
  // https://dev.to/rsa/perfectly-localizing-date-time-with-intl-datetimeformat-ack
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date)

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Hi there {username}!</h1>
      <p>
        <Link to="/dash/issues">View issues</Link>
      </p>
      {(isSubmitter || isAdmin) && (
        <p>
          <Link to="/dash/issues/new">Create new issue</Link>
        </p>
      )}
      {isAdmin && (
        <p>
          <Link to="/dash/users">View user settings</Link>
        </p>
      )}
      {isAdmin && (
        <p>
          <Link to="/dash/users/new">Create new user</Link>
        </p>
      )}
    </section>
  )

  return content
}

export default Welcome
