import type { NextApiRequest, NextApiResponse } from "next";
import { NeynarAPIClient, CastParamType } from "@neynar/nodejs-sdk";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY || '');
  const url = "https://warpcast.com/dwr.eth/0x029f7cce";
  const cast = await client.lookUpCastByHashOrWarpcastUrl(url, CastParamType.Url);
  console.log(cast);
  
}
