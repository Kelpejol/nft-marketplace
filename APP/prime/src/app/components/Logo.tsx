"use client"
import {useWindowWidth} from '@react-hook/window-size'
import MyLogo from './MyLogo';

export default function Logo() {
    const width = useWindowWidth();

    const size = () => {
        if (width >= 1024) {
            return "240px"
        }      
        else if (width >= 768) {
            return "180px"
        }       
        else if (width >= 640)  {      
            return "140px"
        } else {
            return '125px'
        }                        
    };

    return (
        <div className=" flex items-start cursor-pointer">
            <div className="flex items-start">
                <MyLogo width={size()} />
            </div>
        </div>
    )
}