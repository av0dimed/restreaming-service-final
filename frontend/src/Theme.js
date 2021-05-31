import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#9575cd',
            main: '#7e57c2',
            dark: '#68518f',
            contrastText: '#fff',
        },
        secondary: {
            light: '#c7f7d4',
            main: '#b9f6ca', //complimentary #f6b9e5
            dark: '#81ac8d',
            contrastText: '#fff',
        },
        complimentary: {
            main: '#f6b9e5',
        },
        background: {
            paper: '#222222cc',
        },
    },
})

export default theme
