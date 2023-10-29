import { FarcasterAccount } from "../graphql/FarcasterAccount";

type SocialType = {
  dappName: string;
  profileName: string;
};

async function SocialAccountData(
  address: string,
  setFarcasterName: (name: string) => void,
  setConnectedFarcaster: (value: boolean) => void,
  setError: (error: string | null) => void
) {
  try {
    const data = await FarcasterAccount(address);
    
    if (data && data.Wallet && data.Wallet.socials) {
      const farcasterSocial = data.Wallet.socials[0];
      if (farcasterSocial) {
        setFarcasterName(farcasterSocial.profileName);
        setConnectedFarcaster(true);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  }
}

export default SocialAccountData;
