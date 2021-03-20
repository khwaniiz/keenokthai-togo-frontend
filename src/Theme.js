import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#14213d';
const arcOrange = '#fca311'

export default createMuiTheme({
    palette: {
        common: {
            blue: `${arcBlue}`,
            orange: `${arcOrange}`
        },
        primary: {
            main: `${arcBlue}`
        },
        secondary: {
            main: `${arcOrange}`
        },
        action: {
            disabledBackground: '#efefef',
            disabled: '#fff'
        },
    },
    typography: {
        h1: {
            fontFamily: 'Imprima',
            letterSpacing: '3px',
            fontSize: '4rem',
            fontWeight: 700

        },

        h2: {
            fontFamily: 'Imprima',
            fontSize: '3.5rem',
            letterSpacing: '3px',

        },

        h4: {
            fontFamily: 'Imprima',
            letterSpacing: '1px',
            fontSize: '3rem',
            fontWeight: 700,

        },
        h5: {
            fontFamily: 'Nunito',
           
        },

        h6: {
            fontFamily: 'Nunito',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1.5rem',
        },

        subtitle1: {
            fontFamily: 'Nunito',
            fontSize: '1.25rem',
            letterSpacing: '3px',
            fontWeight: 300
        },
        subtitle2: {
            fontFamily: 'Nunito',
            fontSize: '1rem',
            fontWeight: 300
        }
    },

    button: {
        fontFamily: 'Nunito',
        textTransform: 'none',
        backgroundColor: 'transparent',
        borderRadius: '200px',
        border: '1px #fff solid',
        transition: 'all .2s ease',
        "&:hover": {
            backgroundColor: 'rgb(255, 255, 255, .2)'
        },
    }
})
