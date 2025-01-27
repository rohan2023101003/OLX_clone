import React from "react"
import { useForm } from "react-hook-form"
import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  async function onSubmit(data){
    const { email, password, confirmPassword, age, contact, first_name, last_name } = data;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
 
    const allowedDomain = "@iiit.ac.in";
    if (!email.endsWith(allowedDomain)) {
      alert(`Email must belong to the organization (${allowedDomain}).`);
      return;
    }
    const name = first_name ;
    try {
      const response = await axios.post('/api/signup', { email, password,first_name,last_name,age,contact}, { withCredentials: true });
      console.log("Sign-Up Successful", response.data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Error during sign-up:', error);
      if (error.response && error.response.status === 400) {
        alert('Account already exists with this email.');
      } else {
        alert('Sign-Up failed. Please try again.');
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("first_name", {
              required: "First name is required",
              validate: (value) => !/\s/.test(value) || "No spaces allowed in first name",
            })}
            type="text"
            placeholder="First Name"
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
          {errors.first_name && <p style={{ color: "red" }}>{errors.first_name.message}</p>}
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("last_name", {
              required: "Last name is required",
              validate: (value) => !/\s/.test(value) || "No spaces allowed in last name",
            })}
            type="text"
            placeholder="Last Name"
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
          {errors.last_name && <p style={{ color: "red" }}>{errors.last_name.message}</p>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("email", {
              required: "Email is required",
              validate: (value) =>
                value.endsWith("@iiit.ac.in") ||
                "Email must belong to the organization (@iiit.ac.in)",
            })}
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

        {/* Age */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("age", {
              required: "Age is required",
              validate: (value) => value >= 1 && value <= 120 || "Age must be between 1 and 120",
            })}
            type="number"
            placeholder="Age"
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
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid contact number",
              },
            })}
            type="tel"
            placeholder="Contact Number"
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
          {errors.contact && <p style={{ color: "red" }}>{errors.contact.message}</p>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("password", { required: "Password is required" })}
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

        {/* Confirm Password */}
        <div style={{ marginBottom: "15px" }}>
          <input
            {...register("confirmPassword", { required: "Please confirm your password" })}
            type="password"
            placeholder="Confirm Password"
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
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
        </div>

        <input
  type="submit"
  disabled={isSubmitting}
  value={isSubmitting ? "Signing Up..." : "Sign Up"}
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
        <p className="text-center">Already have an account?</p>
        <Link
          to="/login"
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
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
