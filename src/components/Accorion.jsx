/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LeftIcon } from "../assets";
import { useState } from "react";

const Accordion = ({ items }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (index) => {
    setExpandedItem((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => handleToggle(index)}
            className="cursor-pointer p-3 border-[0.5px] border-primary flex align-top gap-3"
          >
            <img
              src={LeftIcon}
              alt=""
              className={`${expandedItem === index ? "rotate" : ""}`}
            />
            <p>{item.title}</p>
          </div>

          {expandedItem === index && (
            <div className="border-x-[0.5px] border-b-[0.5px] border-primary p-10">
              {item.content}{" "}
              <span className=" text-secondary font-bold cursor-pointer">
                <Link to={item.to}>{item.linkText}</Link>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default Accordion;
