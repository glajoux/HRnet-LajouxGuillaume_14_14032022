import React from "react";

/**
 * This function is used to create a select element.
 * @returns A select element with a label and an option for each item in the array.
 */
function Select({ label, datas, change }) {
  /**
   * *Capitalizes the first letter of a string.*
   * @returns The first letter of the string is capitalized.
   */
  const capitalizedFirstLetter = (string) => {
    return string && string[0].toUpperCase() + string.slice(1);
  };

  /**
   * This function is used to display the options for the dropdown menu.
   * @returns The `displayOption` function is being called and the result is being returned.
   */
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
      <label className="label" htmlFor={label}>
        {capitalizedFirstLetter(label)}
      </label>
      <select name={label} id={label} className="main-select" onChange={change}>
        {displayOption()}
      </select>
    </>
  );
}

export default Select;
