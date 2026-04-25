import { FaChevronDown, FaChevronUp } from "react-icons/fa";
function NextArrow({ className, onClick }) {
  return (
    <div
      className={`${className} text-secondary flex justify-center w-3/4 mt-2`}
      onClick={onClick}
    >
      <FaChevronDown className="text-xl" />
    </div>
  );
}

function PrevArrow({ className, onClick }) {
  return (
    <div
      className={`${className} text-secondary flex justify-center w-3/4 mb-2`}
      onClick={onClick}
    >
      <FaChevronUp className="text-xl" />
    </div>
  );
}

export { PrevArrow, NextArrow };
