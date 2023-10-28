import { ConnectedSocialAccount } from "../graphql/ConnectedSocialAccount";

type SocialType = {
  dappName: string;
  profileName: string;
};

async function SocialAccountData(
  address: string,
  setSocialData: (data: any) => void,
  setFarcasterName: (name: string) => void,
  setConnectedFarcaster: (value: boolean) => void,
  setError: (error: string | null) => void
) {
  try {
    const data = await ConnectedSocialAccount(address);
    if (data && data.Socials && data.Socials.Social) {
      setSocialData(data.Socials.Social);

      const farcasterSocial = data.Socials.Social.find((social: SocialType) =>
        social.dappName.includes("farcaster")
      );

      if (farcasterSocial) {
        setFarcasterName(farcasterSocial.profileName);
        setConnectedFarcaster(true);
      } else {
        setConnectedFarcaster(false);
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
