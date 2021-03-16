import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import client from 'services/graphql/client'
import SignUp from './components/SignUp'

const currentUserQuery = loader('./graphql/currentUser.graphql')

function App () {
  const { loading, error, data } = useQuery(currentUserQuery, { client })

  const showCurrentUser = () => {
    if (error) return alert(JSON.stringify(error, null, 2))
    return alert(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <button onClick={() => showCurrentUser()}>See current user</button>
    </>
  )
}

export default App
