import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const EditUser = () => {
  useTitle("Edit User - HIRED Issue Tracker")

  const { id } = useParams()

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <p className="loading-animation-wrapper">
      <PulseLoader color={"var(--COLOR)"} className="loading-animation" />
    </p>
  )

  return content
}

export default EditUser
