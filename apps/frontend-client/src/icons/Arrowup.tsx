import React  from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
type prop =  {
    className ?: string
}

function ArrowRightCycle({className}:prop){
    return(
        <>
            <BsArrowLeftCircle className={className}/>
        </>
    )
}

export default ArrowRightCycle;