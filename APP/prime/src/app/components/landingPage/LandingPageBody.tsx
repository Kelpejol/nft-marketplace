"use client"
import Image from "next/image"
import prime from "@public/prime.svg"
import img1 from "@public/img1.jpeg"
import img2 from "@public/img2.jpeg"
import img3 from "@public/img3.jpeg"
import img4 from "@public/img4.jpeg"
import Button from "../Button"
import Link from "next/link"
import useCreateNftModal from "@/hooks/useCreateNftModal"
import WalletToast from "../WalletToast"



export default function LandingPageBody() {
        const createNFTModal = useCreateNftModal();

    return (
   <div className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-2 lg:py-36">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col top-1/4 lg:pr-12">
            <h1 className="font-sans mb-4 text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-extrabold leading-none">
              One Platform to explore, collect{" "}
              <br className="hidden md:block" />
              and sell NFTs
            </h1>
            <p className="font-sans mb-6 text-white text-sm md:text-md py-4 w-fit">
              Prime is an NFT marketplace where you can buy sell and mint NFTs using
              the most popular cryptocurrencies such as ETH, SOL,etc. Connect your wallet
              and purchase today.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/marketplace">
              <Button size="medium" color="gradient1" actionLabel="Discover"/>
                </Link>
             <Button size="medium" color="gradient2" actionLabel="Create" action={createNFTModal.onOpen}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
            <div>
              <Image
                className="rounded-lg md:w-full"
                src={img1}
                alt="NFT artwork 1"
              />
            </div>
            <div className="mt-8">
              <Image
                className="rounded-lg md:w-full"
                src={img2}
                alt="NFT artwork 2"
              />
            </div>
            <div>
              <Image
                className="-mt-8 rounded-lg md:w-full z-12"
                src={img3}
                alt="NFT artwork 3"
              />
            </div>
            <div>
              <Image
                className="rounded-lg md:w-full z-12"
                src={img4}
                alt="NFT artwork 4"
              />
            </div>
          </div>
           

        </div>
      </div>
    )
}