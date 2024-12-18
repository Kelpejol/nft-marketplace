'use client';

import { useState, useEffect } from 'react';
import { fetchNFT, listings } from "../contracts/getPlatformInfo";
import { anvil } from "thirdweb/chains";
import {  getContract } from "thirdweb";
import { client } from "../client";
import Card from "./card/Card";
import Container from './Container';
import CardContainer from './card/CardContainer';
import useBuyModal from '@/hooks/useBuyModal';
import useSWR from 'swr';
import useCreateListingModal from '@/hooks/useCreateListingModal';

// Utility function to get contract address
export function getContractAddress(address: string) {
  return getContract({
    address,
    chain: anvil,
    client
  });
}

export const ipfsToHttp = (ipfsUri: string) => {
  const gateway = 'https://ipfs.io/ipfs/';
  console.log(ipfsUri)
  const replacedIpfsUri = ipfsUri.replace('ipfs://', gateway);
  console.log(replacedIpfsUri);
  return replacedIpfsUri;
};

// Async function to fetch individual NFT

export default function Listings() {
 
  
  const buyModal = useBuyModal();
  const createListing = useCreateListingModal();

  

    async function fetchListings() {
      try {
        console.log("Fetching listings...");

        const fetchedListings = await listings();
        console.log("Fetched listings:", fetchedListings);

        if (!fetchedListings || fetchedListings.length === 0) {
         
          return null;
        }

        const nftCards = await Promise.all(
          fetchedListings.map(async (listing, index) => {
            try {
              const contract = getContractAddress(listing.assetContract);
              const nftDetails = await fetchNFT(contract, listing);
              console.log(listing);

              
                return (
                  <Card
                    key={index}
                    src={ipfsToHttp(nftDetails!.metadata.image!) || ''}
                    name={nftDetails!.metadata.name || 'Unnamed NFT'}
                    tokenId={`${listing.tokenId}`}
                    price={`${listing.pricePerToken}`}
                    click={() => { buyModal.setListingId(listing.listingId) }}
                    listingId={listing.listingId}
                  />
                );
              
            } catch (error) {
              console.log(`Error processing listing ${index}:`, error);
            }
          })
        );

        const validCards = nftCards.filter(card => card !== null);

        if (validCards.length === 0) {
          return null;
        } else {
          return validCards;
        }
      } catch (error) {
        console.error('Critical error in Listings component:', error);
        return null
      } 
    }

    const { data: fetchedListings, error, isLoading, mutate } = useSWR('listings', fetchListings, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
     createListing.setMutateListings(mutate) 
    
  }, [ mutate])


  

 



  if (isLoading) {
    return <div>Loading listings...</div>;
  }
  if (error) {
    return <div>Error fetching listings</div>;
  }

  return (
    <Container>
      <CardContainer>
        {fetchedListings?.map(item => item).toReversed()}
       
      </CardContainer>
    </Container>
  );
}
