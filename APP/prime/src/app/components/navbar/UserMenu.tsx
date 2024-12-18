"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import ConnectWallet from "../ConnectWallet";
import { AiFillBell } from "react-icons/ai";
import useCreateNftModal from "@/hooks/useCreateNftModal";
import useCreateListingModal from "@/hooks/useCreateListingModal";


export default function UserMenu() {
 
  const [isOpen, setIsOpen] = useState(false);
    const createNFTModal = useCreateNftModal();
    const createListingModal = useCreateListingModal();

  const router = useRouter();

  const toggleIsOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

 

  

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="lg:mr-10 ">
          <AiFillBell 
          size={24}/>
        </div>
        <div 
          className="hidden md:block lg:mr-10"
        >
         <ConnectWallet color="primary" size="primary"/>
        </div>
        <div
          className="sm:p-[10px] md:p-[14px] p-[8px] border-[2px] border-gray-300 flex flex-row items-center gap-2 rounded-full cursor-pointer hover:shadow-sm transition"
          onClick={toggleIsOpen}
        >
          <AiOutlineMenu 
          size={16}/>
         
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[38vw] md:w-3/4 z-30 bg-white overflow-hidden sm:right-0 right-1 top-16 text-xs sm:text-sm">
          <div className="flex flex-col cursor-pointer">

              <>
                <MenuItem
                  label="Create listing"
                  onClick={() => {createListingModal.onOpen()}}
                />
                <MenuItem
                  label="Create auction"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="Create NFTs"
                  onClick={() => {createNFTModal.onOpen()}}
                />
                <MenuItem
                  label="My listings"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My auctions"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem
                  label="Offers"
                  onClick={() => {}}
                />
               
               
              </>
           
              <>
                
                <div className="block md:hidden">
               <ConnectWallet size="tertiary" color="tertiary"/>
               </div>
              </>
           
          </div>
        </div>
      )}
    </div>
  );
}
