import React from "react";
import { classNames } from "../../../utils/helpers";

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "md",
  shadow = "sm",
  border = true,
  ...props
}) => {
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const classes = classNames(
    "bg-white rounded-xl",
    paddingClasses[padding],
    shadowClasses[shadow],
    border && "border border-gray-200",
    hover && "hover:shadow-md transition-shadow duration-200",
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = "", ...props }) => (
  <div className={classNames("mb-4", className)} {...props}>
    {children}
  </div>
);

Card.Body = ({ children, className = "", ...props }) => (
  <div className={classNames("", className)} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = "", ...props }) => (
  <div
    className={classNames("mt-4 pt-4 border-t border-gray-200", className)}
    {...props}
  >
    {children}
  </div>
);

export default Card;
