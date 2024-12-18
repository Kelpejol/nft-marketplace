'use client'
import { ContractOptions, getContract, sendTransaction } from "thirdweb";
import { deployERC1155Contract, deployERC721Contract } from "thirdweb/deploys";
import { client } from "../client";
import {Account} from "thirdweb/wallets"
import { anvil } from "thirdweb/chains";
import {FieldValues} from "react-hook-form";
import { NFT_TYPE } from "../components/modals/CreateNftModal";


// const dynamicMintTo = async (nftType: NFT_TYPE) => {
//   try {
//     switch(nftType) {
//       case NFT_TYPE.SINGLE:
//         const { mintTo: mintToERC721 } = await import("thirdweb/extensions/erc721");
//         return mintToERC721;
      
//       case NFT_TYPE.MULTIPLE:
//         const { mintTo: mintToERC1155 } = await import("thirdweb/extensions/erc1155");
//         return mintToERC1155;
      
//       default:
//         throw new Error('Invalid NFT type');
//     }
//   } catch (error) {
//     console.error('Error dynamically importing mint function:', error);
//     throw error;
//   }
// }





 function nftContract(contractAddress: string) {
const contract =  getContract({
 client,
 chain: anvil,
 address: contractAddress,
}); 

return contract;
} 



async function deploySingleNFT(account: Account, params: FieldValues) {
    const contractAddress = await deployERC721Contract({
 chain: anvil,
 client,
 account,
 type: "TokenERC721",
 params: {
   name: params.name,
   royaltyRecipient: account.address,
   royaltyBps: params.royalties,
   
 }
});

return contractAddress;
}

async function deployMultipleNFT(account: Account, params: FieldValues) {
    const contractAddress = await deployERC1155Contract({
 chain: anvil,
 client,
 account,
 type: "TokenERC1155",
 params: {
   name: params.name,
   royaltyRecipient: account.address,
   royaltyBps: params.royalties,
   
 }
});

return contractAddress;
}


async function mintNFT(contract:Readonly<ContractOptions<any>>, to: string, params: FieldValues, account:Account) {
   if(params.nftType === NFT_TYPE.SINGLE) {
  const transaction = (await import("thirdweb/extensions/erc721")).mintTo({
	contract,
	to: to,
    nft: {
      name: params.name,
      description: params.description,
      image: params.image,
      symbol: params.symbol,
    },
})
  

await sendTransaction({ transaction, account });   
} else if(params.nftType === NFT_TYPE.MULTIPLE) {
  const transaction = (await import("thirdweb/extensions/erc1155")).mintTo({
	contract,
	to: to,
  supply: params.amountToMint,
    nft: {
      name: params.name,
      description: params.description,
      image: params.image,
      symbol: params.symbol,
    },
})
console.log(params.amountToMint)
await sendTransaction({ transaction, account });   
   }
  }


export default async function createNFT(account: Account, params: FieldValues) {
  let contractAddress;
  try {
       if(params.nftType === NFT_TYPE.SINGLE) {

     contractAddress = await deploySingleNFT(account, params);
       } else if(params.nftType === NFT_TYPE.MULTIPLE) {
       contractAddress = await deployMultipleNFT(account, params);

       }

       console.log(contractAddress);

    const contract = nftContract(contractAddress!);
    await mintNFT(contract, account.address, params, account);
    
    return {
      success: true,
      message: 'NFT created successfully',
      contractAddress
    };
  } catch (error) {
    return {
      success: false,
      message: "NFT creation failed: Try again",
    };
  }
}




