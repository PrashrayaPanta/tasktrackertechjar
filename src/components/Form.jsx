import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import SubmitButton from "./SubmitButton";

const Form = ({ type, title, btnProperties, formik, task }) => {
  // useState for DatePicker
  const [startDate, setStartDate] = useState(null);

  // Handle DatePicker change - update both useState and Formik
  const handleDateChange = (date) => {
    setStartDate(date);
    formik?.setFieldValue("dueDate", date);
  };

  // handle on Blur
  const handleBlur = () => {
    formik?.setFieldTouched("dueDate", true);
  };

  // Populate form when task prop is provided (for edit mode)
  useEffect(() => {
    if (task && Object?.keys(task)?.length > 0 && formik) {
      // Set all form values at once
      const formValues = { ...formik.values };
      for (let k in formValues) {
        if (task[k] !== undefined) {
          formValues[k] = task[k];
        }
      }
      formik.setValues(formValues);

      // Set the date picker value if dueDate exists in task
      if (task.dueDate) {
        const dateValue =
          task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
        setStartDate(dateValue);
        formik.setFieldValue("dueDate", dateValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          selected={startDate}
          onChange={handleDateChange}
          onBlur={handleBlur}
          id="task-due-date"
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

      <SubmitButton btnProperties={btnProperties} formik={formik} />
    </form>
  );
};

export default Form;
