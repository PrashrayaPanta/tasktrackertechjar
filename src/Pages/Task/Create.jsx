import React from "react";
import Form from "../../components/Form";

import { useFormik } from "formik";

import * as Yup from "yup";
import http from "../../http";
import { useNavigate } from "react-router-dom";

// Button Information
const btnProperties = {
  label: "Add",
  icon: "fa-plus",
  color: "bg-black-500",
};

const taskValidationSchema = Yup.object({
  title: Yup.string().required(),
  dueDate: Yup.string().required(),
  status: Yup.string().required(),
});

const Create = () => {
  const navigate = useNavigate();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      dueDate: null,
      status: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log("Form submitted with values:", values);

      async function createTask() {
        try {
          await http.post("/tasks", values);
          navigate("/task");
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }

      createTask();
    },
  });

  return (
    <Form title="Create Task" btnProperties={btnProperties} formik={formik} />
  );
};

export default Create;
