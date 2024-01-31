import {Metadata, ResolvingMetadata} from "next";

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const fcMetadata: Record<string, string> = {
        "fc:frame": "vNext",
        "fc:frame:post_url": `${process.env['HOST']}/api/mint`,
        "fc:frame:image": 'https://raw.githubusercontent.com/yamapyblack/AttackOnWallet/a28287d1d411eb844170668b39218e09a087d89b/frontend/public/noun.png',
    };
    fcMetadata[`fc:frame:button:1`] = "Mint";

    return {
        title: "f1337",
        openGraph: {
            title: "f1337",
            images: ['https://raw.githubusercontent.com/yamapyblack/AttackOnWallet/a28287d1d411eb844170668b39218e09a087d89b/frontend/public/noun.png'],
        },
        other: {
            ...fcMetadata,
        },
        metadataBase: new URL(process.env['HOST'] || '')
    }
}


export default function Page() {
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
                    f1337
                </main>
            </div>
        </>
    );

}
