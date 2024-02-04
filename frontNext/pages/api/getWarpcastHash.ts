import type { NextApiRequest, NextApiResponse } from "next";
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";


// This function for development debugging
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY || '');
  const url = "https://warpcast.com/baratie/0x508754e9"; // Change this to your warpcast url
  const cast = await client.lookUpCastByHashOrWarpcastUrl(url, CastParamType.Url);
  console.log(cast);
  
}
