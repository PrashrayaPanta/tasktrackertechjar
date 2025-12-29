import React from "react";
import http from "../http";

const SubmitButton = ({ btnProperties, formik, navigatedto }) => {
  console.log(navigatedto);

  const handleDelete = async (id) => {
    await http.delete(`/tasks/${id}`);

    const { data } = await http.get("/tasks");
  };

  return (
    <>
      <button
        className={`${
          btnProperties?.color
        } px-4 py-2 bg-black text-white gap-1  flex   items-center justify-center   ${
          btnProperties?.type == "full-width" && "w-full"
        }`}
        onClick={() => handleDelete(navigatedto)}
      >
        <i
          className={`w-5 fa-solid ${
            formik?.isSubmitting ? "fa-refresh fa-spin" : btnProperties?.icon
          }`}
        ></i>

        {btnProperties?.label}
      </button>
    </>
  );
};

export default SubmitButton;
