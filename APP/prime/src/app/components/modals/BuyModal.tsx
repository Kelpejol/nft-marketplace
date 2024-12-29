"use client";

import Modal from "./Modal";
import { useState } from "react";
import { FieldValues, useForm} from "react-hook-form";
import { useRouter } from "next/navigation";
import Heading from "../Heading";


import useBuyModal from "@/hooks/useBuyModal";
import { useActiveAccount } from "thirdweb/react";
import { buyFromListing } from "@/app/contracts/directListing";
import toast from "react-hot-toast";
import { showToast } from "../WalletToast";




export default function BuyModal() {
  const router = useRouter();
   const account = useActiveAccount();
    const [isDisabled, setIsDisabled] = useState(false);
      const buyModal = useBuyModal();


  
  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      recipientAddress: "",
    },
  });

  const onSubmit = (data: FieldValues) => {
    if(account) {
      setIsDisabled(true);
      buyFromListing(data.recipientAddress, buyModal.listingId!, account!).then((data)=> {
        if(data.success){
          toast.success(data.message!);
          buyModal.onClose();
          reset();
           buyModal.mutateListing();
        } else {
          toast.error(data.message!)
        }
         setIsDisabled(false);

      })

    } else {
      showToast();
    }
  };

 


  // let bodyContent = (
  //   <div className="flex flex-col  gap-7">
  //    <Heading
  //    title="Who is the recipient?"
  //    center
  //    subtitle="Choose who will receive this art"
  //    />
  //  <div className="flex flex-col gap-4">
  //        <div className="flex flex-col gap-2">
  //         <label htmlFor="recipientAddress" className="block sm:text-xs text-[10px] font-black text-black">Recipient address</label>
  //         <input type="text"  id="recipientAddress" className="border-2 border-gray-300 rounded-lg p-2 w-full pl-6" {...register("recipientAddress", {
  //         required: true
  //       })} placeholder="0x123...789" />
          
           
  //      </div>
  //   </div>
  //   </div>
      
  // );

  let bodyContent = (
    <div className="flex flex-col gap-4 w-full">
      <Heading
        title="Who is the recipient?"
        center
        subtitle="Choose who will receive this art"
      />
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="recipientAddress" className="block text-xs sm:text-sm font-bold text-gray-700">
          Recipient address
        </label>
        <input
          type="text"
          id="recipientAddress"
          className="border-2 border-gray-300 rounded-lg p-2 w-full pl-3 sm:pl-4 text-sm sm:text-base"
          {...register("recipientAddress", { required: true })}
          placeholder="0x123...789"
        />
      </div>
    </div>
  );


  

  return (
    <div>
       <Modal
      title="Buy from listing"
      isOpen={buyModal.isOpen}
      onClose={buyModal.onClose}  
      onSubmit={handleSubmit(onSubmit)}   
      actionlabel={"Submit"}
      secondaryActionLabel={undefined}
      body={bodyContent}
      disabled={isDisabled}
    />
    </div>
  );
}
