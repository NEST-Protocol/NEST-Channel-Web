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
      },
      _active: {
        bg: "primary",
        opacity: 0.5,
      },
    },
    solid: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "primary",
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
