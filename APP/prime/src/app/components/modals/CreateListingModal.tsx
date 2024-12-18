"use client";

import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
import useCreateListingModal from "@/hooks/useCreateListingModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import ToggleSwitch from "../ToggleSwitch";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import CurrencySelect, { CurrencySelectValue } from "../CurrencySelect";
import { createListing } from "@/app/contracts/directListing";
import toast from "react-hot-toast";
import { showToast } from "../WalletToast";
 

enum STEPS {
  TYPE = 0,
  INFO = 1,
  
}

enum LISTING_TYPE {
  BASIC,
  ADVANCED ,
  PRO 
}

export default function CreateListingModal() {
  const [selectedType, setSelectedType] = useState<LISTING_TYPE>();
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState<CurrencySelectValue>();
   const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createListingModal = useCreateListingModal();
  const account = useActiveAccount();



    

  


const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listingType: null,
      assetContract: "",
      tokenId: null,
      tokenPrice: null,
      currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      isReserved: checked
    },
     mode: 'onSubmit', // Validate on form submission
    reValidateMode: 'onSubmit'
  })




    const onSubmit: SubmitHandler<FieldValues> = (data) => {
 
  if (step !== STEPS.INFO) {
    return onNext();
  }
   

  if (account) {
     const listingData = {
      assetContract: data.assetContract,
      tokenId: BigInt(data.tokenId), 
      currency: data.currency,
      pricePerToken: BigInt(data.tokenPrice), 
      listingType: data.listingType, 
      reserved: data.isReserved
    };
       if(!data.currency) {
        toast.error("Please select a currency");
        return;
      }
    setIsLoading(true);
   createListing( listingData, account).then((data) => {
    if (data.success) {
          createListingModal.onClose();
      toast.success(data.message);
       reset();
        setSelectedType(undefined);
        setChecked(false);
        setSelectedValue(undefined);
        setStep(STEPS.TYPE);
        createListingModal.mutateListing();
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
   })
  } else {
  showToast()
  }
 
};

const listingTypeLabel = useCallback(() => {
  if(selectedType === LISTING_TYPE.ADVANCED || selectedType === LISTING_TYPE.PRO || selectedType === LISTING_TYPE.BASIC) {
    return "Next";
  } 
  else {
    return undefined
  }
}, [selectedType])



 
  const setCustomValues = useCallback((key: any, value: string | number | File | null | CurrencySelectValue | undefined | boolean) => {
  setValue(key, value, {
    shouldValidate: true,
    shouldDirty: true,
  });
}, [setValue]);


 
  const handleSelectedValue = (selectedOption: CurrencySelectValue | null) => {
    if(selectedOption) {
      setSelectedValue(selectedOption);
      setCustomValues("currency", selectedOption.address)
    } else {
      setSelectedValue(undefined);
      setCustomValues("currency", undefined)
    }
   
  }

  const handleToggleChange = (value: boolean) => {
    setChecked(value);
    setCustomValues("isReserved", value);
    
  };



 

  const [step, setStep] = useState(STEPS.TYPE);
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const handleSelect = (type: LISTING_TYPE) => {
    setSelectedType(type);
    setCustomValues("listingType", type);
  };




  const actionLabel = useMemo(() => {
    switch (step) {
      case STEPS.TYPE:
        return listingTypeLabel();
      case STEPS.INFO:
        return "Submit";
      default:
        return "Next";
    }
  }, [step, listingTypeLabel]);

  const secondaryActionLabel = useMemo(() => {
    switch (step) {
      case STEPS.TYPE:
        return undefined;
      case STEPS.INFO:
        return "Back";
      default:
        return "Back";
    }
  }, [step]);


  let bodyContent = (
    <div className="flex flex-col  gap-7">
     <Heading
     title="Choose Listing Plan"
     subtitle="Select the listing plan of your choice"
     />
   <div className="flex w-[90] justify-between space-x-3">
      <div onClick={() => handleSelect(LISTING_TYPE.BASIC)} className={`${selectedType == LISTING_TYPE.BASIC && "bg-black text-white "} border-gray-300 border  rounded-lg p-2 cursor-pointer w-[30%]`}>
        <div className="text-center">
         <div className="text-lg font-bold">Basic</div>
      <div className={`${selectedType == LISTING_TYPE.BASIC && "text-white"}font-light text-neutral-500 mt-2 text-sm`}>$10</div>
      <div className={`${selectedType == LISTING_TYPE.BASIC && "text-white"} text-black font-semibold mt-2 text-sm`}>1 month</div>
        </div>
         </div>
 <div onClick={() => handleSelect(LISTING_TYPE.ADVANCED)} className={`${selectedType == LISTING_TYPE.ADVANCED && "bg-black text-white "} border-gray-300 border  rounded-lg p-2 cursor-pointer w-[30%]`}>   
  <div className="text-center">
         <div className="text-lg font-bold">Advanced</div>
      <div className={`${selectedType == LISTING_TYPE.ADVANCED && "text-white"}font-light text-neutral-500 mt-2 text-sm`}>$30</div>
      <div className={`${selectedType == LISTING_TYPE.ADVANCED && "text-white"} text-black font-semibold mt-2 text-sm`}>3 month</div>
        </div>  
  
     </div>
 <div onClick={() => handleSelect(LISTING_TYPE.PRO)} className={`${selectedType == LISTING_TYPE.PRO && "bg-black text-white "} border-gray-300 border  rounded-lg p-2 cursor-pointer w-[30%]`}>   
  <div className="text-center">
         <div className="text-lg font-bold">Pro</div>
      <div className={`${selectedType == LISTING_TYPE.PRO && "text-white"}font-light text-neutral-500 mt-2 text-sm`}>$50</div>
      <div className={`${selectedType == LISTING_TYPE.PRO && "text-white"} text-black font-semibold mt-2 text-sm`}>5 month</div>
        </div>  
  
     </div>
     </div>
    </div>
      
  );

  

  if(step == STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col  gap-7">
        <Heading
        title="Listing Details"
        subtitle="Enter information about your listing"
        />
       <div className="flex flex-col gap-4">
         <div className="flex flex-col gap-2">
          <label htmlFor="assetContract" className="block sm:text-xs text-[10px] font-black text-black">Asset address</label>
          <input type="text"  id="assetContract" className={`${errors.assetContract ? "border-red-500" : "border-gray-300"} border-2 rounded-lg p-2 w-full pl-6`} {...register("assetContract", {
          required: true
        })} placeholder="0x123...789" />
          
           
       </div>
        <div className="flex justify-between">
        <div className="w-[47%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="tokenId" className="block sm:text-xs text-[10px] font-black text-black">Token id</label>
          <input type="number" id="tokenId"  {...register("tokenId", {
          required: true
        })} className={`${errors.tokenId ? "border-red-500" : "border-gray-300"} border-2 rounded-lg p-2 w-full placeholder:text-[13px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} placeholder="0" />
 

       </div>
       </div>
           <div className="w-[47%]">

        <div className="flex flex-col gap-2">
          <label htmlFor="tokenPrice" className="block sm:text-xs text-[10px] font-black text-black">Token price</label>
          <input type="number" id="tokenPrice"  {...register("tokenPrice", {
          required: true,
        })} className={`${errors.tokenPrice ? "border-red-500" : "border-gray-300"} border-2 rounded-lg p-2 w-full placeholder:text-[13px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} placeholder="0" />
 

       </div>
        
          </div>
          </div>

       
         <CurrencySelect
          value={selectedValue}
          onChange={handleSelectedValue}
         />
        
       
        
       
        <div className="flex justify-between">
          <div className="text-black font-black block sm:text-xs text-[10px]">Reserve listing?</div>
          <div className="flex flex-end">
         <ToggleSwitch
         checked={checked}
         onChange={handleToggleChange}
         
         />
         </div>
         </div>
       </div>
       
       </div>
       )
  }



 
  return (
    <div>
       <Modal
      title="Create a Listing"
      isOpen={createListingModal.isOpen}
      onClose={createListingModal.onClose}  // Fixed: Add proper onClose handler
      onSubmit={handleSubmit(onSubmit)}           // Fixed: Add proper onSubmit handler
      actionlabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryActions={step === STEPS.TYPE ? undefined : onBack}
      disabled={isLoading}
      body={bodyContent}
    />
    </div>
  );
}
