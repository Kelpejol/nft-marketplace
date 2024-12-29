"use client"
import {useWindowWidth} from '@react-hook/window-size'
import MyLogo from './MyLogo';
import {useMemo} from "react"

export default function Logo() {
    const width = useWindowWidth();

    const size = useMemo(() => {
        if (width >= 1024) {
            return "200px"
        }      
        else if (width >= 768) {
            return "140px"
        }       
        else if (width >= 640)  {      
            return "100px"
        } else {
            return '90px'
        }                        
    }, [width])

    return (
        <div className=" flex items-start cursor-pointer">
            <div className="flex items-start">
                <MyLogo width={size} />
            </div>
        </div>
    )
}