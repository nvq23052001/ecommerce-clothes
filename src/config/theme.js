import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: '"Mulish", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 45,
          textTransform: 'initial',
        },
        sizeSmall: {
          height: 36,
          fontSize: 13,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '#919eab3d 0px 0px 3px 0px, #919eab3d 0px 15px 30px -4px',
          borderRadius: 12,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 12,
          fontSize: '14px',
          color: 'var(--cl-secondary)',
          fontWeight: 500,
        },
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          tableLayout: 'fixed',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'var(--cl-secondary)',
          fontWeight: 500,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
  },
})
