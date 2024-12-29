import { prepareContractCall, sendTransaction } from "thirdweb";
import { Account } from "thirdweb/wallets";
import { contract } from "./getContract";
import { NATIVE_TOKEN } from "./constant";
import { getListing } from "./directListing";


export const makeOffer = async (listingId: bigint, account: Account, duration : bigint, totalPrice: bigint) => {

  const data = await getListing(listingId);
    
   let fee: bigint | undefined
    if(data.currency == NATIVE_TOKEN) {
      fee= totalPrice
    } 
    else {
      fee = undefined
    }
  

     const transaction = prepareContractCall({
          contract,
          method: "makeOffer",
          params: [{
            totalPrice,
            duration,
          },
            listingId,
          ],
          value: fee
        });

    try {

             await sendTransaction({
              account,
              transaction,
            });
        
            return {
             success: true,
             message: "Offer sent" 
            }        
          
          } catch (error: any) {
            let message;
            if(error.message && error.message.includes("__Offer_InvalidListing")) {
              message = "You can't make an offer on this listing"
            }
            else if(error.message && error.message.includes("__Offer_InsufficientFunds")) {
             message = "Insufficient amount"
            }
            else {
              message = "An unexpected error occured: Try again"
            }
        
            return {
              success: false,
              message: message
            }
            
          }

}