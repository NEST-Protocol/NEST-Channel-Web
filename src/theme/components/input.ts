export const Input = {
  baseStyle: {},
  variants: {
    filled: {
      field: {
        fontFamily: 'Montserrat',
        borderRadius: '20px',
        bg: 'secondary.200',
        boxShadow: 'inset 0 0 10px 0 #EEEEEE',
        height: '40px',
        borderWidth: '1px',
        fontSize: '17px',
        fontWeight: '600',
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
        fontFamily: 'Montserrat',
        bg: 'white',
        height: '38px',
        fontSize: '17px',
        fontWeight: '600',
        px: '16px',
        borderRadius: '20px',
      },
    },
  },
}
