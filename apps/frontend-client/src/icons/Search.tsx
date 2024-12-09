import { IoIosSearch } from "react-icons/io"

interface prop {
  props?: string
}

function Search({ props }: prop) {
  return (
    <>
      <IoIosSearch className={props} />
    </>
  )
}

export default Search
