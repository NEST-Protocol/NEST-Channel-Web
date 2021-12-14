export const Input = {
  baseStyle: {
    fontFamily: 'Montserrat',
  },
  variants: {
    filled: {
      field: {
        borderRadius: '20px',
        bg: 'secondary.200',
        boxShadow: 'inset 0 0 10px 0 #EEEEEE',
        height: '40px',
        fontSize: 'md',
        fontWeight: 'bold',
        _focus: {
          borderColor: 'primary.500',
          bg: 'white',
          boxShadow: 'none',
        },
        _hover: {
          borderColor: 'primary.500',
          bg: 'white',
          boxShadow: 'none',
        },
      },
    },
    unstyled: {
      field: {
        bg: 'white',
        height: '36px',
        fontSize: 'md',
        fontWeight: 'bold',
        px: '16px',
        borderRadius: '20px',
      },
    },
  },
}
