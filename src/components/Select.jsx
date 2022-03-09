import React from "react";

function Select({ label, datas, change }) {
  const capitalizedFirstLetter = (string) => {
    return string && string[0].toUpperCase() + string.slice(1);
  };
  const displayOption = () => {
    if (typeof datas[0] === "string") {
      return datas.map((data, index) => (
        <option value={data} key={index} className={`${label}Option`}>
          {data}
        </option>
      ));
    } else {
      return datas.map((data, index) => (
        <option
          value={data.abbreviation}
          key={index}
          className={`${label}Option`}
        >
          {data.name}
        </option>
      ));
    }
  };
  return (
    <>
      <label htmlFor={label}>{capitalizedFirstLetter(label)}</label>
      <select name={label} id={label} className="main-select" onChange={change}>
        {displayOption()}
      </select>
    </>
  );
}

export default Select;
