export const Select = {
  baseStyle: {},
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
          bg: 'secondary.200',
        },
        _hover: 'none',
      },
    },
  },
}
