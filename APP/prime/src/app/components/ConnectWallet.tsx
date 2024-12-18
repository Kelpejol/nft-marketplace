"use client"
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import { createWallet } from "thirdweb/wallets";
import {useWindowWidth} from '@react-hook/window-size'
import {client} from "../client"

interface ConnectWalletProps {
  size: 'primary' | 'secondary' | 'tertiary',
  color: 'primary' | 'secondary' | 'tertiary'
}

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.trustwallet.app"),
  createWallet("com.coinbase.wallet"),
  createWallet("app.phantom"),
];

export default function ConnectWallet({size, color}: ConnectWalletProps) {
 const width = useWindowWidth();

  
  const getButtonWidth = (size : string) => {
    if (width >= 1024) {
      if(size == "secondary") {
       return "160px"}
       else if(size == "primary") {
        return "130px"
       } else {
        return "100%"
       }
      }      
    else if (width >= 768) {
      if(size == "secondary") {
        return "144px"
      }
       else if (size == "primary") {
        return "128px"
       } else {
        return "100%"
       }
      }       
    else { 
      if(size == "secondary") {
     return "96px"
      } 
      else if(size == "primary") {
        return "96px"
      }else {
        return "100%"
      }  
     
  }                          
  };

  
  const getButtonHeight = (size: string) => {
    if (width >= 640) {
      if(size == "secondary") {
      return "48px"
      }
       else if (size == "primary") {
        return "44px"
       } else {
        return "100%"
       }
      } 
      else {  
        if(size == "secondary") {
        return "40px"
        } 
        else if (size == "primary") {
          return "40px"
        }  
        else {
          return "100%"
        }  
    
  }                          
  };

  
  const getFontSize = (size: string) => {
    if (width >= 640){
      if(size == "secondary") {
   return "16px"
      } 
      else if (size == "primary") {
        return "16px"
      } else {
        return "14px"
      }
      
      }
       else {       
    return "14px"
  }                         
  };
  return (
   <ConnectButton
    connectButton={{
    style: {
      color: "black",
      width: getButtonWidth(size),
      height: getButtonHeight(size),
      background: `${color == 'secondary' ? "white" : color == "primary" ? '#f5f5f5' : 'white'}`,
      fontWeight: "900",
      fontSize: getFontSize(size),
      padding: `${size == 'tertiary' && "12px 16px"}0 5px`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9px",
      minWidth: "96px",
      fontFamily: `-apple-system`
    },
  }}
  client={client}
  wallets={wallets}
  connectModal={{
    size: "compact",
    title: "Connect wallet",
    showThirdwebBranding: false,
  }}
  detailsButton={{
    style: {
      width: "100%",
      borderRadius: `${size == 'tertiary' && '0px'}`,
      fontSize: `${size == "tertiary" && "8px"}`
    },
  }}
/>
)}