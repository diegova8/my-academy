import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:5000/api/login", values)
            .then((response) => {
              localStorage.setItem("token", response.data.token); // Store token
              navigate("/dashboard");
              setSubmitting(false);
            })
            .catch((error) => {
              setError("Invalid login credentials");
              console.error(error);
              setSubmitting(false);
            });
        }}
      >
        <Form className="w-full max-w-sm">
          <h2 className="text-2xl mb-6 text-center">Login</h2>
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
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
