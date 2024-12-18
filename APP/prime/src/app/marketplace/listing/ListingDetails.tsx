"use client"

import Button from "@/app/components/Button";
import { ipfsToHttp } from "@/app/components/Listings";
import {PuffLoader} from 'react-spinners'
import Image from "next/image";
import {useCallback, useEffect, useMemo, useState} from "react"
import { getContract, NFT } from "thirdweb";
import useDialog from "@/hooks/useDialog";
import useBuyModal from "@/hooks/useBuyModal";
import { getListing } from "@/app/contracts/directListing";
import { anvil } from "thirdweb/chains";
import { fetchNFT } from "@/app/contracts/getPlatformInfo";
import { client } from "@/app/client";
import useSWR from "swr";


interface ListingDetailsProps {
  listingId : string;
}



   
 

export default function ListingDetails({listingId}: ListingDetailsProps) {
  const dialog = useDialog();
  const buyModal = useBuyModal();


    const fetchListing = useCallback(async () => {
    try {
      const listing = await getListing(BigInt(listingId));

      const contract = getContract({
        client,
        chain: anvil,
        address: listing.assetContract,
      });

      const nft = await fetchNFT(contract, listing);

      return {
        ...listing, 
        nft: nft || null
      };
    } catch(error) {
      console.error('Error fetching listing:', error);
      throw error;
    }
  }, [listingId]);

  // Use SWR with optimized configuration
  const { 
    data, 
    error,
    mutate,
  } = useSWR('listing/' + listingId, fetchListing, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true
    });

    const listingStatus=useMemo(() => {
console.log(data?.status)
      if(data?.status == 1){
        return "Live";
      }
      else if(data?.status == 2){
        return "Sold";
      }
      else if(data?.status == 3){
        return "Cancelled";
      }
      else {
        return "Unactive";
      }
}, [data?.status])

 const tokenStandard = useMemo(() => {
    if(data?.tokenType == 0) {
      return "ERC-721";
    }
    else {
      return "ERC-1155";
    }
  }, [data?.tokenType])

 

  // Memoized computations
  const endTime = useMemo(() => {
    if (data?.endTimestamp && data?.startTimestamp) {
      return Math.floor(Number(data.endTimestamp - data.startTimestamp)) / 86400;
    }
    return null;
  }, [data?.endTimestamp, data?.startTimestamp]);

  const rotationStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(132deg, #5ddcff, #3c67e3 43%, #4e00c2)`,
  }), []);

  // Memoized buy listing handler
  const buyListing = useCallback(() => {
    if (data) {
      buyModal.setListingId(data.listingId);
      dialog.onOpen();
      buyModal.setMutateListings(mutate) 
    }
  }, [data, buyModal, dialog, mutate]);

  
  if(error) {
    return <div>An error occured</div>
  }

  if (!data) {
    return <div>No listing found</div>
  }
  
  return (
    <div className="flex flex-col w-full items-center">
      <div className="relative w-[90%] h-[30vh] xl:h-[80vh] aspect-[3/4] group">
        {/* Animated border gradient */}
        <div 
          className="absolute inset-[-1%] z-[-1] rounded-lg opacity-100 duration-200"
          style={rotationStyle}
        />
        
        {/* Blur effect */}
        <div
          className="absolute top-1/6 inset-x-0 w-full h-full mx-auto scale-80 opacity-100 duration-500 blur-xl"
          style={{
            ...rotationStyle,
            zIndex: -1,
          }}
        />


        {/* Main card content */}
        <div className="flex flex-row justify-between h-full">
          <div className="w-[45%] h-full flex items-center justify-center">
            <div className="relative w-[80%] h-[70%]"> 
              <Image
                className=""
                src={
                  ipfsToHttp(data.nft?.metadata.image!)
                }
                alt={data.nft?.metadata.name!}
                quality={90}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, (max-width: 1024px) 30vw, 20vw"
              />
            </div>
          </div>

       
          <div className="w-[55%] h-full flex items-center pl-24">
            <div className="flex flex-col space-y-4">
           <div className="flex space-x-2 items-center">
          {data.status === 1 ? (
      <PuffLoader size={25} color="red"/>
     ) : (
    <div className="bg-red-500 w-3 h-3 rounded-full"></div>
  )}
  <div className="text-gray-300">{listingStatus}</div>
</div>
            <div className="capitalize text-white text-3xl">{data.nft?.metadata.name}{" "}#{data.tokenId.toString()}</div>
            <div className="text-gray-300 text-xl">Listed by: {"  "}
              <span className="text-white text-base">{data.listingCreator}</span>
              </div>
              <div className="text-gray-300 text-lg">Price: {"  "}
                <span className="text-white text-lg">{data.pricePerToken.toString()}{" "}MATIC</span>
                </div>    
                {data?.reserved && (
                  <div className="text-gray-300 text-xl capitalize font-black">Reserved</div>
                )}
              <div className="flex space-x-3">
              <Button actionLabel='Buy listing' size='large' color='primary' action={
               
                buyListing} />
              <Button actionLabel='Make Offer' size='large' color='secondary' />
            </div>
            
            <div className="flex items-center space-x-4">
             ⏰
              <div className="text-gray-300 text-lg">{endTime}{" "}Days left</div>
            </div>
            </div>
          </div>
        </div>

        {/* Existing details section */}
        <div className="flex flex-col justify-center items-start h-[15%] px-3 py-3 text-[12px]">
          <div className="flex justify-between items-center w-full">
            {/* Existing placeholder comments */}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { --rotate: 0deg; }
          100% { --rotate: 360deg; }
        }

        @property --rotate {
          syntax: "<angle>";
          initial-value: 132deg;
          inherits: false;
        }
      `}</style>
    <div className="h-[100vh] flex justify-center w-full items-center">
         <div className='border-gray-400 border-2 h-[80vh] w-[90%] rounded-lg'>
          
          <div className='flex w-full h-full justify-evenly items-center'>
              <div className="w-[30%] border-gray-400 border-2 h-[80%] rounded-lg p-2">
                <div className='w-full border-gray-400 border-b-2 text-center text-xl'>Details</div>
                <div className="w-full h-full flex-col items-stretch">
                  <div className='w-full h-[25%] border-gray-400 border-b-2 '>Asset Contract: <span className='text-sm'>{data?.assetContract}</span></div>
                  <div className='w-full h-[25%] border-gray-400 border-b-2 '>Asset Id: <span className='text-sm'>#{data?.tokenId.toString()}</span> </div>
                  <div className='w-full h-[25%] border-gray-400 border-b-2 '>Asset Standard: <span className='text-sm'>{tokenStandard}</span></div>
                  <div className='w-full h-[25%]'>Royalty: <span className='text-sm'>10%</span></div>
                </div>

             </div>

             <div className="w-[50%] border-gray-400 border-2 h-[80%] rounded-lg break-words overflow-y-auto p-2">
                <div className='w-full border-gray-400 border-b-2 text-center text-xl'>Description</div>
                {data?.nft?.metadata.description}
                
             </div>
          </div>

         </div>    
      </div>
    </div>
  );
};


      
