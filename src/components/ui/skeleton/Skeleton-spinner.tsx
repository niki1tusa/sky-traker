import {  LoaderCircle } from "lucide-react"

export const SkeletonSpinner = ({size}:{size: number}) =>{
return (
    <div className="w-full h-screen flex items-center justify-center z-0">
        <LoaderCircle className="animate-spin" color="gray" size={size}/>
    </div>

)
}