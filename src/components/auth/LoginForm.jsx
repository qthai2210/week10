import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch, // Add watch to check field values in real-time
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur", // Enable real-time validation onBlur, onChange, onSubmit, onTouched
  });
  // validate string
  // Custom validation patterns
  const usernamePattern = /^[a-zA-Z0-9_-]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

  const onSubmit = async (data) => {
    dispatch(loginThunk(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Username cannot exceed 20 characters",
            },
            pattern: {
              value: usernamePattern,
              message:
                "Username can only contain letters, numbers, underscore and dash",
            },
            validate: {
              notAdmin: (value) =>
                value.toLowerCase() !== "admin" ||
                "This username is not allowed",
              noSpaces: (value) =>
                !value.includes(" ") || "Username cannot contain spaces",
            },
          })}
          placeholder="Username"
          aria-invalid={errors.username ? "true" : "false"}
        />
        {touchedFields.username && errors.username && (
          <span className="error" role="alert">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 50,
              message: "Password cannot exceed 50 characters",
            },
            pattern: {
              value: passwordPattern,
              message:
                "Password must contain at least one letter, one number, and be at least 6 characters long",
            },
            validate: {
              notEqualUsername: (value) => {
                const username = watch("username");
                return (
                  value !== username ||
                  "Password cannot be the same as username"
                );
              },
              noCommonWords: (value) => {
                const commonPasswords = [
                  "password123",
                  "12345678",
                  "qwerty123",
                ];
                return (
                  !commonPasswords.includes(value.toLowerCase()) ||
                  "Please use a stronger password"
                );
              },
            },
          })}
          placeholder="Password"
          aria-invalid={errors.password ? "true" : "false"}
        />
        {touchedFields.password && errors.password && (
          <span className="error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </button>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};

export default LoginForm;
