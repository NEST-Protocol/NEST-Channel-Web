export const Button = {
  baseStyle: {
    borderRadius: 'full',
    fontWeight: 'semibold',
    height: '40px',
  },
  variants: {
    outline: {
      bg: 'white',
      color: 'black',
      border: '2px',
      borderRadius: 'full',
      borderColor: 'primary.500',
      _hover: {
        bg: 'primary.500',
        color: 'white',
        borderColor: 'primary.500',
      },
      _active: {
        bg: 'primary.500',
        opacity: 0.5,
        borderColor: 'primary.500',
      },
    },
    solid: {
      bg: 'primary.500',
      color: 'black',
      _hover: {
        bg: 'primary.500',
      },
      _active: {
        bg: 'primary.500',
        opacity: 0.5,
      },
      fontWeight: '800',
      fontFamily: 'Montserrat',
      borderRadius: 'full',
    },
    ghost: {
      _hover: {
        bg: 'none',
        opacity: 0.8,
      },
      _active: {
        bg: 'none',
        opacity: 0.5,
      },
    },
  },
}
