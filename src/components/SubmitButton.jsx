import React from "react";

const SubmitButton = ({ btnProperties, formik, type = "button", onClick }) => {
  console.log(onClick);

  const handleClick = (e) => {
    console.log(e);

    // If custom onClick is provided, use it (for delete, etc.)
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={`${
        btnProperties?.color
      } px-4 py-2 bg-black text-white gap-1  flex   items-center justify-center   ${
        btnProperties?.type == "full-width" && "w-full"
      }`}
      onClick={handleClick}
      disabled={formik?.isSubmitting}
    >
      <i
        className={`w-5 fa-solid ${
          formik?.isSubmitting ? "fa-refresh fa-spin" : btnProperties?.icon
        }`}
      ></i>

      {btnProperties?.label}
    </button>
  );
};

export default SubmitButton;
