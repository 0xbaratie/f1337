import type { NextApiRequest, NextApiResponse } from "next";
import { http, createWalletClient, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { MintDelegaterAbi } from "../../data/NFTContractAbi";
import { MintDelegaterAddress } from "../../data/NFTContractAddress";

const rpcUrl = "https://base.publicnode.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let generatedNum =  Math.floor(Math.random() * 49);
  if (req.method === "POST") {
    try {
      console.log("req.body", req.body);

      const fid = req.body.untrustedData.fid;
      const addressFromFid = await getAddrByFid(fid);
      console.log("Extracted address from FID: ", addressFromFid);

      const account = privateKeyToAccount(
        process.env.PRIVATE_KEY as `0x${string}`
      );

      const publicClient = createPublicClient({
        chain: base,
        transport: http(rpcUrl),
      });
      const walletClient = createWalletClient({
        account,
        chain: base,
        transport: http(rpcUrl),
      });
      // const [account] = await walletClient.getAddresses();

      const { request, result } = await publicClient.simulateContract({
        address: MintDelegaterAddress,
        abi: MintDelegaterAbi,
        functionName: "mint",
        account,
        args: [addressFromFid],
      });
      const hash = await walletClient.writeContract(request);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      const blockNumber = receipt.blockNumber;

      console.log("@@Result: ", result);
      const resultString = result.toString();
      
      if (resultString === "1337") {
        // Success HTML Response
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>You are 1337 - F1337</title>
              <meta property="og:title" content="You are 1337">
              <meta
                property="og:image"
                content="https://f1337.vercel.app/ogp.png"
              />
              <meta name="test:blockNumber" content="${blockNumber}">
              <meta name="fc:frame" content="vNext">
              <meta
                property="fc:frame:image"
                content="https://f1337.vercel.app/success/0.GIF"
              />
            </head>
          </html>
        `);
      } else {
        // Failure HTML Response
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>You are not 1337 - F1337</title>
              <meta property="og:title" content="You are not 1337">
              <meta
                property="og:image"
                content="https://f1337.vercel.app/ogp.png"
              />
              <meta name="test:blockNumber" content="${blockNumber}">
              <meta name="fc:frame" content="vNext">
              <meta
                property="fc:frame:image"
                content="https://f1337.vercel.app//failed/${generatedNum}.GIF"
              />
            </head>
          </html>
        `);
      }

    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating image");
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Based on https://github.com/coinbase/build-onchain-apps/blob/b0afac264799caa2f64d437125940aa674bf20a2/template/app/api/frame/route.ts#L13
async function getAddrByFid(fid: number) {
  console.log("Extracting address for FID: ", fid);
  const options = {
    method: "GET",
    url: `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR_API_KEY || "",
    },
  };
  console.log("Fetching user address from Neynar API");
  const resp = await fetch(options.url, { headers: options.headers });
  console.log("Response: ", resp);
  const responseBody = await resp.json(); // Parse the response body as JSON
  if (responseBody.users) {
    const userVerifications = responseBody.users[0];
    if (userVerifications.verifications) {
      console.log(
        "User address from Neynar API: ",
        userVerifications.verifications[0]
      );
      return userVerifications.verifications[0].toString();
    }
  }
  console.log("Could not fetch user address from Neynar API for FID: ", fid);
  return "0x0000000000000000000000000000000000000000";
}
