export const Button = {
  baseStyle: {
    borderRadius: "20px",
    fontWeight: "bold",
  },
  variants: {
    outline: {
      bg: "white",
      color: "primary",
      border: "2px",
      borderRadius: "20px",
      borderColor: "primary",
      _hover: {
        bg: "primary",
        color: "white",
        opacity: 0.8,
        border: "none",
      },
      _active: {
        bg: "primary",
        opacity: 0.5,
        border: "none",
      },
    },
    solid: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "primary",
        opacity: 0.8
      },
      _focus: "none",
      _active: {
        bg: "primary",
        opacity: 0.5
      },
      fontSize: "16px",
      fontWeight: "800",
      fontFamily: "Montserrat"
    },
    ghost: {
    },
  },
}
