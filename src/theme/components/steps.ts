import { StepsStyleConfig } from 'chakra-ui-steps';

export const Steps = {
  ...StepsStyleConfig,
  baseStyle: {
    connector: {
      borderColor: "secondary.400",
      transitionProperty: 'border-color',
      transitionDuration: 'normal',
      _highlighted: {
        borderColor: "primary.500",
      },
    },
    stepIconContainer: {
      bg: "white",
      color: "secondary.400",
      borderColor: "secondary.400",
      _activeStep: {
        bg: "primary.500",
        color: "white",
        border: "none",
      },
      _invalid: {
        bg: 'red.500',
        borderColor: 'red.500',
      },
      _highlighted: {
        bg: "primary.500",
        color: "white",
        borderColor: "primary.500",
      },
      '&[data-clickable]:hover': {
        borderColor: "primary.500",
      },
    },
    label: {
      fontFamily: "Montserrat",
    },
    labelContainer: {
      m: "16px",
      fontWeight: "600",
    }
  }
}