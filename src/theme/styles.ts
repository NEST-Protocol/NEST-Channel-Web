export const styles = {
  global: {
    '.js-focus-visible :focus:not([data-focus-visible-added])': {
      'outline': 'none',
      'box-shadow': 'none'
    },
    '*': {
      '-webkit-overflow-scrolling': 'touch',
      '-ms-overflow-style': 'none'
    },
    '*::-webkit-scrollbar': {
      'display': 'none'
    },
    'body': {
      'font-family': "Montserrat",
      'background': '#FBEECC',
    },
    'div,a,img': {
      '-webkit-tap-highlight-color': 'transparent',
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      'user-select': 'none',
    },
  },
}
