import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client'

import { getAccessToken, setAccessToken } from '../authentication/access_token'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getAccessToken()
  
  if (token) {
    operation.setContext({
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
  
  return forward(operation).map(result => {
    const { response } = operation.getContext()
    const authorizationHeaderValue = response?.headers.get('authorization')
    
    try{
      const token = authorizationHeaderValue.replace('Bearer ','')
      setAccessToken(token)
    } catch (e) {
      console.log('Access token is undefined')
    }
  
    return result
  })
})
​
const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql'
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
})

export default client
