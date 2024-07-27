/* eslint-disable react/prop-types */
const Button = ({ btnClick, btnStyle, btnText }) => {
  return (
    <button className={`px-8 py-3 ${btnStyle}`} onClick={btnClick}>
      {btnText}
    </button>
  );
};

export default Button;
