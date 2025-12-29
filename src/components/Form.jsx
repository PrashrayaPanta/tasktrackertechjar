import React, { useEffect } from "react";

import DatePicker from "react-datepicker";
import SubmitButton from "./SubmitButton";
import { useLocation } from "react-router-dom";

const Form = ({ type, title, btnProperties, formik, task }) => {
  // console.log(useLocation());

  const { pathname } = useLocation();

  console.log(pathname.split("/")[2] === "add");

  // Handle DatePicker change - write directly into Formik
  const handleDateChange = (date) => {
    console.log("I am insiode the ha ndlemc hnage");

    console.log(date);
    formik?.setFieldValue("dueDate", date);
  };

  // Handle DatePicker blur - mark field as touched in Formik
  const handleBlur = () => {
    formik?.setFieldTouched("dueDate", true);
  };

  console.log(task);

  useEffect(() => {
    if (pathname.split("/")[2] === "add") {
      return;
    }

    if (Object?.keys(task)?.length > 0) {
      for (let k in formik?.values) {
        console.log(formik?.values);
        formik.setFieldValue(k, task[k]);
      }
    }
    // console.log(staff);
  }, [task]);

  return (
    <form
      onSubmit={formik?.handleSubmit}
      className={`space-y-5 shadow-2xl rounded-sm py-4 mx-2 px-2  mt-2 ${
        type === "HorizontalFormCenter" && "px-2 mx-auto max-w-sm"
      } `}
    >
      {/* Form Title */}
      <h1
        className={`${
          type === "HorizontalFormCenter" && "text-center"
        } font-bold text-xl bg-amber-300`}
      >
        {title}
      </h1>
      {/* Task Name Field */}
      <div className="flex flex-col">
        <div className="flex bg-amber-300">
          <label htmlFor="task-name">Task Name</label>
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-red-500"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 6v12"></path>
            <path d="M17.196 9 6.804 15"></path>
            <path d="m6.804 9 10.392 6"></path>
          </svg>
        </div>

        <input
          type="text"
          name="title"
          value={formik?.values?.title}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          className="h-8 bg-white text-black border-1 focus:outline-0 px-2"
          id="task-name"
        />
        {formik?.touched?.title && formik?.errors?.title && (
          <h1 className="text-red-500">{formik?.errors?.title}</h1>
        )}
      </div>

      {/* Due Date Field */}
      <div className="flex flex-col">
        <div className="flex">
          <label htmlFor="task-due-date">Task Due Date</label>
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-red-500"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 6v12"></path>
            <path d="M17.196 9 6.804 15"></path>
            <path d="m6.804 9 10.392 6"></path>
          </svg>
        </div>

        <DatePicker
          selected={formik.values.dueDate}
          onChange={handleDateChange}
          onBlur={handleBlur}
          showTimeSelect
          dateFormat="yyyy/MM/dd"
          className="outline-none border-1 px-2 h-8 w-full"
        />
        {formik?.touched?.dueDate && formik?.errors?.dueDate && (
          <h1 className="text-red-500">{formik?.errors?.dueDate}</h1>
        )}
      </div>

      {/* Task Status */}

      <div className="flex flex-col">
        <div className="flex">
          <label htmlFor="">Status</label>

          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-red-500"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 6v12"></path>
            <path d="M17.196 9 6.804 15"></path>
            <path d="m6.804 9 10.392 6"></path>
          </svg>
        </div>

        <select
          name="status"
          id=""
          className="w-full border-1 outline-none bg-amber-200"
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.status}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {formik?.touched.status && formik?.errors.status && (
          <h1 className="text-red-500">{formik?.errors.status}</h1>
        )}
      </div>

      <SubmitButton
        btnProperties={btnProperties}
        formik={formik}
        type="submit"
      />
    </form>
  );
};

export default Form;
