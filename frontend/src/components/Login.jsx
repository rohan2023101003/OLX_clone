import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;

    const allowedDomain = "@iiit.ac.in";
    if (!email.endsWith(allowedDomain)) {
      alert(`Email must belong to the organization (${allowedDomain}).`);
      return;
    }
    try {
      const response = await axios.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login Successful", response.data);

      // Set state to true to trigger navigation
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  }

  // Redirect if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                value.endsWith("@iiit.ac.in") ||
                "Email must belong to the organization (@iiit.ac.in)",
            })}
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
              border: "2px solid green",
              borderRadius: "10px",
              textAlign: "center",
              outline: "none",
              transition: "border-color 0.3s ease",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
              border: "2px solid green",
              borderRadius: "10px",
              textAlign: "center",
              outline: "none",
              transition: "border-color 0.3s ease",
              backgroundColor: "#fff",
              color: "#000",
            }}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <input
          type="submit"
          disabled={isSubmitting}
          value={isSubmitting ? "Logging In..." : "Log In"}
          className="btn btn-custom w-100"
          style={{
            backgroundColor: "green", // Green background
            color: "white", // White text
            padding: "0.375rem 0.75rem",
            border: "2px solid green", // Green border
            borderRadius: "5px", // Optional rounded corners
            transition: "all 0.3s ease", // Smooth transition effect
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = "white"; // White background on click
            e.target.style.color = "green"; // Green text on click
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = "green"; // Reset to green background
            e.target.style.color = "white"; // Reset to white text
          }}
        />
      </form>

      <div>
        <p className="text-center">Don't have an account?</p>
        <Link
          to="/signup"
          className="btn btn-custom w-100"
          style={{
            backgroundColor: "green", // Green background
            color: "white", // White text
            padding: "0.375rem 0.75rem",
            border: "2px solid green", // Green border
            borderRadius: "5px", // Optional rounded corners
            textAlign: "center", // Center text
            transition: "all 0.3s ease", // Smooth transition effect
            display: "inline-block", // Ensures it behaves like a button
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = "white"; // White on click
            e.target.style.color = "green"; // Green text on click
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = "green"; // Reset to green
            e.target.style.color = "white"; // Reset to white
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
