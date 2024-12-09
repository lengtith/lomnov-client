import React from "react";

function SelectLanguages() {
  return (
    <>
      <select
        name="lng"
        id="lng"
        className="border-[1px] px-3 py-2 rounded-md w-fit ml-5 "
      >
        <option value="eng">English</option>
        <option value="kh">Khmer</option>
      </select>
    </>
  );
}

export default SelectLanguages;
