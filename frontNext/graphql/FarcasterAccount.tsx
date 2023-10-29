import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core"

const AIRSTACK_ENDPOINT = "https://api.airstack.xyz/gql"
const AIRSTACK_API_KEY = process.env.REACT_APP_AIRSTACK_API_KEY

const client = new ApolloClient({
    uri: AIRSTACK_ENDPOINT,
    cache: new InMemoryCache(),
    headers: { Authorization: AIRSTACK_API_KEY || "" },
})

export async function FarcasterAccount(address: string): Promise<any> {
    const query = gql`
      query FarcasterAccount {
        Wallet(input: {identity: "${address}", blockchain: ethereum}) {
          socials(input: {filter: {dappName: {_eq: farcaster}}}) {
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
