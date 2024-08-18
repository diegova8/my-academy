import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("http://localhost:5000/api/login", values)
          .then((response) => {
            console.log(response.data);
            setSubmitting(false);
          })
          .catch((error) => {
            console.error(error);
            setSubmitting(false);
          });
      }}
    >
      <Form className="flex flex-col max-w-md mx-auto">
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <Field name="email" type="email" className="p-2 border" />
        <ErrorMessage name="email" component="div" className="text-red-500" />

        <label htmlFor="password" className="mt-4 mb-2">
          Password
        </label>
        <div className="relative">
          <Field
            name="password"
            type={passwordShown ? "text" : "password"}
            className="p-2 border w-full"
          />
          <button
            type="button"
            onClick={togglePasswordVisiblity}
            className="absolute right-2 top-2"
          >
            {passwordShown ? "Hide" : "Show"}
          </button>
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500"
        />

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
