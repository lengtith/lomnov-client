
import React  from "react";
import { BsArrowDownCircle } from "react-icons/bs";
type prop =  {
    className ?: string
}

function ArrowLeftCycle({className}:prop){
    return(
        <>
            <BsArrowDownCircle className={className}/>
        </>
    )
}

export default ArrowLeftCycle;