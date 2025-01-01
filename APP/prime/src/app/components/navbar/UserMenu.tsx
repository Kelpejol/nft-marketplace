"use client";

import MenuItem from "./MenuItem";
import { useState, useCallback } from "react";
import { Bell, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import ConnectWallet from "../ConnectWallet";
import useCreateNftModal from "@/hooks/useCreateNftModal";
import useCreateListingModal from "@/hooks/useCreateListingModal";
import Notification from "../Notifications";
import Search from "./Search";
import Logo from "../Logo";
import Link from 'next/link'


export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifIsOpen, setNotifIsOpen] = useState(false);
  const createNFTModal = useCreateNftModal();
  const createListingModal = useCreateListingModal();
  const router = useRouter();

  const toggleIsOpen = useCallback(() => {
    setNotifIsOpen(false);
    setIsOpen((value) => !value);
  }, []);

  const openCreateListing = useCallback(() => {
     createListingModal.onOpen();
          setIsOpen(false)
                
  }, [createListingModal])

  const openNFT = useCallback(() => {
    createNFTModal.onOpen();
    setIsOpen(false)
  }, [createNFTModal])

  const notifOpen = useCallback(() => {
    setIsOpen(false);
    setNotifIsOpen((value) => !value);
  }, []);

  return (
    <div className="w-full">
      <div className=" mx-auto xl:px-20 md:px-10 sm:px-6 px-2">
        <div className="h-20 flex items-center justify-between gap-2 relative">
            <div className="flex-shrink-0 cursor-pointer"> {/* Add this wrapper */}
       <Link href="/">
        <Logo />
        </Link>
    </div>
            <div className="max-w-2xl ">
              <Search />
            </div>
          

          <div className="flex justify-between w-[25%]">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition"
              onClick={notifOpen}
            >
              <Bell size={24} />
            </button>
            
            <div className="hidden md:block">
              <ConnectWallet color="primary" size="primary"/>
            </div>

            <button
              onClick={toggleIsOpen}
              className=" p-3 border-2 border-gray-300 rounded-full hover:shadow-md transition"
            >
              <Menu size={16} />
            </button>
        </div>
        </div>


        {isOpen && (
          <div className="absolute md:right-10 right-6 top-20 bg-neutral-100 hover:bg-neutral-50 transition rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="flex flex-col md:py-2">
              <MenuItem
                label="Create listing"
                onClick={openCreateListing}
              />
              <MenuItem
                label="Create auction"
                onClick={() => {
                  setIsOpen(false)
                }
                }
              />
              <MenuItem
                label="Create NFTs"
                onClick={openNFT}
              />
              <MenuItem
                label="My listings"
                onClick={() => {
                  setIsOpen(false)
                }}
              />
              <MenuItem
                label="My auctions"
                onClick={() => {
                  setIsOpen(false)
                }}
              />
              <MenuItem
                label="Offers"
                onClick={() => {}}
              />
              
              <div className="md:hidden border-t h-full">
                <ConnectWallet size="tertiary" color="tertiary" onClick={() => {setIsOpen(false)}}/>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Notification isOpen={notifIsOpen}/>
    </div>
  );
}



