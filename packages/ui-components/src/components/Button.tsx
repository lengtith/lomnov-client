

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

function Button({
  primary = false,
  size = "medium",
  label = "Button",
  backgroundColor,
  ...props
}: ButtonProps) {
  const fontSize =
    size === "small"
      ? "text-[10px]"
      : size === "medium"
      ? "text-[14px]"
      : size === "large"
      ? "text-[18px]"
      : "text-[16px]";

  const primaryClass = primary ? "bg-green-500" : "bg-blue-500" ;
  const buttonStyle = backgroundColor ? { backgroundColor } : {};
  const haseStayles = " text-white text-[14ox] npm nm overfoject px-5 rounded-[25px] py-2 rounded:50"
  return (
    <button
      type="button"
      className={`${haseStayles} ${fontSize} ${!backgroundColor ? primaryClass : ''}`}
      style={buttonStyle}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
