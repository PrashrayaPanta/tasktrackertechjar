import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import { useFormik } from "formik";

import * as Yup from "yup";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";

// Button Information
const btnProperties = {
  label: "Edit",
  type: "small-width",
  icon: "fa-edit",
  color: "bg-black-500",
};

const taskValidationSchema = Yup.object({
  title: Yup.string().required(),
  dueDate: Yup.string().required(),
  status: Yup.string().required(),
});

const Edit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      dueDate: null,
      status: "",
    },
    validationSchema: taskValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const EditProduct = async () => {
        try {
          await http.put(`/tasks/${id}`, values);
          navigate("/task");
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      };

      EditProduct();

      // http
      //   .put(`/api/cms/products/${slug}`, fd, {

      //   })
      //   .then(({ data }) => navigate("/product"))
      //   .catch(({ response }) => BackendvalidationError(formik, response))
      //   .finally(() => setSubmitting(false));

      // console.log("Form submitted with values:", values);
    },
  });

  const getSingleTask = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`/tasks/${id}`);
      setTask(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleTask();
  }, []);

  console.log(task);

  return (
    <Form
      title="Edit Task"
      btnProperties={btnProperties}
      formik={formik}
      task={task}
    />
  );
};

export default Edit;
