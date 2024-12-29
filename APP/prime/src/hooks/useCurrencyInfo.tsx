import { useCallback, useMemo } from 'react';
import useSWR from 'swr';



const fetchTokenInfo = async (contractAddress: string) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch token info for ${contractAddress}`);
  }

  return response.json();
};

export const useCurrencyInfo = () => {
  const tokenAddresses = useMemo(() => [
    "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
    "0x6b175474e89094c44da98b954eedeac495271d0f"  // DAI
  ], []);

  const fetchCurrency = useCallback(async () => {
   const currency = await Promise.all(
      tokenAddresses
        .filter(addr => addr !== '0x0000000000000000000000000000000000000000')
        .map(fetchTokenInfo)
    )
    return currency;
  }, [tokenAddresses]) 

  const { 
    data: tokenInfos,  error, isLoading } = useSWR("currency", fetchCurrency, {
    revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: false,
  revalidateOnMount: true
  });

  const currency = useMemo(() => {
    if (!tokenInfos) return [];
    return tokenInfos.map(token => ({
      value: token.id,
      symbol: token.symbol,
      image: {
        thumb: token.image.thumb,
        small: token.image.small,
        large: token.image.large
      },
      address: token.contract_address, 
    }))
  }, [tokenInfos]);

  return { 
    currency, 
    isLoading, 
    error
  };
};