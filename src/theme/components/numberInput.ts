export const NumberInput = {
  baseStyle: {},
  variants: {
    filled: {
      field: {
        fontFamily: 'Montserrat',
        borderRadius: '20px',
        bg: 'secondary.200',
        boxShadow: 'inset 0 0 10px 0 #EEEEEE',
        height: '40px',
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
        height: '36px',
        fontSize: '17px',
        fontWeight: '600',
        px: '16px',
        borderRadius: '20px',
      },
    },
  },
}
