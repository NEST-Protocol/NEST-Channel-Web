export const Button = {
  baseStyle: {
    borderRadius: "20px",
    fontWeight: "bold",
    height: "40px",
  },
  variants: {
    outline: {
      bg: "white",
      color: "primary.500",
      border: "2px",
      borderRadius: "20px",
      borderColor: "primary.500",
      _hover: {
        bg: "primary.500",
        color: "white",
        borderColor: "primary.500",
      },
      _active: {
        bg: "primary.500",
        opacity: 0.5,
        borderColor: "primary.500",
      },
      _focus: "none",
    },
    solid: {
      bg: "primary.500",
      color: "white",
      _hover: {
        bg: "primary.500",
      },
      _focus: "none",
      _active: {
        bg: "primary.500",
        opacity: 0.5,
      },
      fontWeight: "800",
      fontFamily: "Montserrat"
    },
    ghost: {
      _hover: {
        bg: "none",
        opacity: 0.8,
      },
      _active: {
        bg: "none",
        opacity: 0.5,
      },
      _focus: "none"
    },
  },
}
