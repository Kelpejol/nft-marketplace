'use client';

import { useEffect } from 'react';
import { fetchNFT, listings } from "../contracts/getPlatformInfo";
import { anvil } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { client } from "../client";
import Card from "../components/card/Card";
import Container from '../components/Container';
import CardContainer from '../components/card/CardContainer';
import useSWR from 'swr';
import useCreateListingModal from '@/hooks/useCreateListingModal'; 
import EmptyState from '../components/EmptyState';
import Error from '../components/Error';

export function getContractAddress(address: string) {
  return getContract({
    address,
    chain: anvil,
    client
  });
}

export const ipfsToHttp = (ipfsUri: string) => {
  const gateway = 'https://ipfs.io/ipfs/';
  return ipfsUri.replace('ipfs://', gateway);
};

export default function Listings() {
  const createListing = useCreateListingModal();

  async function fetchListings() {
    try {
      const fetchedListings = await listings();

      if (!fetchedListings || fetchedListings.length === 0) {
        return [];
      }

      const nftCards = fetchedListings.map(async (listing, index) => {
        try {
          const contract = getContractAddress(listing.assetContract);
          const nftDetails = await fetchNFT(contract, listing);
          
          if (!nftDetails?.metadata) {
            console.error(`Missing metadata for listing ${index}`);
            return null;
          }

          return (
           
              <Card
                key={`${listing.listingId}-${index}`}
                src={ipfsToHttp(nftDetails.metadata.image!) || ''}
                name={nftDetails.metadata.name || 'Unnamed NFT'}
                tokenId={`${listing.tokenId}`}
                price={`${listing.pricePerToken}`}
                listingId={listing.listingId}
              />
            
          );
        } catch (error) {
          console.error(`Error processing listing ${index}:`, error);
          return null;
        }
      });

      const resolvedCards = await Promise.allSettled(nftCards);
      return resolvedCards
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => (result as PromiseFulfilledResult<any>).value).toReversed()
    } catch (error) {
      console.error('Critical error in Listings component:', error);
      return [];
    } 
  }

  const { data: fetchedListings, error, isLoading, mutate } = useSWR('listings', fetchListings, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    createListing.setMutateListings(mutate);
  }, [mutate]);

  if(error) {
    <Error error={error}/>
    
  }

  if (!fetchedListings?.length) {
    return (
      <EmptyState
        title='Oops!'
        subtitle="No listing at this moment. Try creating one"
        showButton={true}
        onClick={createListing.onOpen}
        label='Create Listing'
      />
    );
  }

  return (
    <Container>
      <CardContainer>
        {fetchedListings}
      </CardContainer>
    </Container>
  );
}