import React, {useState} from 'react'
import classNames from 'classnames';
import { makeStyles } from "@material-ui/core/styles";
import { Box, ClickAwayListener, Tooltip   } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SmartphoneIcon from '@material-ui/icons/Smartphone';



const useStyles = makeStyles(theme => ({
    footer: {
        width: '100%',
        zIndex: 1302,
        backgroundColor: '#252525',
        height: 'auto',
        marginTop: '3rem',
        fontFamily: 'Nunito',
        textTransform: 'none',
        fontSize: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        bottom:0,
      
    },

    gridItem: {
        marginTop: '.5rem',
        marginBottom: '.5rem',

    },
    mainContainer: {
        textAlign: 'center'
    },

    link: {
        color: 'hsl(212, 33%, 89%)',
        '&:hover': {
            color: 'rgb(170, 169, 169)'
        }
    },
    boxContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerBox: {
        margin: '1rem'
    },
    outerBox: {
        margin: '1rem',
    },
    logo: {
        height: '2.5em'
      },
      logoContainer: {
        padding: '10px',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        marginRight: 'auto'
      },

}))

export default function Footer() {
    const classes = useStyles()
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <footer className={classes.footer}>
                <Box justify="center" className={classes.mainContainer}>
                <Box className={classes.outerBox}>
                        <Box component={'a'}
                            href="https://goo.gl/maps/mz4LYJZBaQoAtvJX9"
                            target='_blank'
                            rel="noopener noreferrer"
                            className={classNames(classes.innerBox, classes.link)} 
                        >
                            Logan Square, Chicago
                        </Box>
                    </Box>
                    <Box className={classNames(classes.boxContainer, classes.outerBox)}>
                        <Box   
                            className={classes.link}
                            component={'a'}
                            href="https://www.instagram.com/keenokthai/"
                            target='_blank'
                            rel="noopener noreferrer"
                            style={{marginRight: '1rem'}}>
                                <InstagramIcon />
                        </Box>
                        <Box
                            className={classes.link}
                            component={'a'}
                            href="mailto:keenokthai@gmail.com"
                            target='_blank'
                            rel="noopener noreferrer"
                            style={{marginRight: '1rem'}}
                            >
                                <MailOutlineIcon />   
                        </Box>
                        <Box
                            className={classes.link}
                            component={'span'}
                            style={{cursor: 'pointer'}}
                           >
                                  <ClickAwayListener onClickAway={handleTooltipClose}>
                                    <div>
                                <Tooltip
                                    PopperProps={{
                                    disablePortal: true,
                                    }}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    onClose={handleTooltipClose}
                                    open={open}
                                    title="912-658-6723"
                                >
                                <SmartphoneIcon onClick={handleTooltipOpen}/>
                                </Tooltip>
                                </div>
                                </ClickAwayListener>
                        </Box>
                    </Box>
                    <Box className={classes.outerBox}>
                        <Box
                        component={'a'}
                        href="https://www.chalermkhwan.com/"
                        target='_blank'
                        rel="noopener noreferrer"
                        className={classNames(classes.innerBox, classes.link)} 
                        >
                            Created by Chalermkhwan Nasritha
                        </Box>
                    </Box>
                </Box>
            </footer>
        </>
    )
}