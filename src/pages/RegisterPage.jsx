import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:5000/api/register", values)
            .then((response) => {
              console.log(response.data);
              navigate("/login");
              setSubmitting(false);
            })
            .catch((error) => {
              console.error(error);
              setError("Registration failed");
              setSubmitting(false);
            });
        }}
      >
        <Form className="w-full max-w-sm">
          <h2 className="text-2xl mb-6 text-center">Register</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <Field
              name="firstName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <Field
              name="lastName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <Field
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <Field
              name="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
