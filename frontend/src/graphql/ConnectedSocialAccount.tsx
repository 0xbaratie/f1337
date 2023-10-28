import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core"

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql"
const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY

const client = new ApolloClient({
    uri: AIRSTACK_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { Authorization: AIRSTACK_API_KEY || "" },
})

export async function ConnectedSocialAccount(): Promise<any> {
    const query = gql`
      query GetAllSocials {
        Socials(
          input: {filter: {userAssociatedAddresses: {_eq: "0x6d92e36f3c7c309f90e7ca98d06e6599649961e3"}}, blockchain: ethereum}
        ) {
          Social {
            dappName
            profileName
          }
        }
        }
    `
    
    const response = await client.query({
        query
    })
    return response.data
}
