import React from "react";

function Button({ className, children, variant, type = "button", ...props }) {
  return (
    <button
      {...props}
      type={type}
      className={`${
        variant === "primary" ? "button-primary" : "button-secondary"
      } disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
