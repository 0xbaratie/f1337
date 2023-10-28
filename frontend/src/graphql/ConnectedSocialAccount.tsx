import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core"

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql"
const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY

const client = new ApolloClient({
    uri: AIRSTACK_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { Authorization: AIRSTACK_API_KEY || "" },
})

export async function ConnectedSocialAccount(address: string): Promise<any> {
    const query = gql`
      query GetAllSocials {
        Socials(
          input: {filter: {userAssociatedAddresses: {_eq: $address}}, blockchain: ethereum}
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
