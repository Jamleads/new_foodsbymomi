export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    color: "black",
    fontSize: "14px",
    fontWeight: "500",
    border: "none",
    textTransform: "capitalize",
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    "&:hover": {
      border: "none",
      boxShadow: "none",
    },
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "none",
    color: "black",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#A8CC45",
      color: "#fff",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  }),
};
