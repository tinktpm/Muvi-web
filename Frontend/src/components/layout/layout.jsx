import React, { useState } from 'react';
import Header from './navbar';
import { ThemeProvider } from '@emotion/react';
import getLPTheme from '../../utils/getLPTheme';
import { createTheme } from '@mui/material';
import Footer from './footer';
import { Box } from '@mui/system';

function Layout({ children, mode, toggleColorMode, showCustomTheme}) {
    const defaultTheme = (mode) => ({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? 'rgba(255,0,0,1.0)' : 'rgba(255, 255, 255, 1.0)',
          },
          secondary: {
            main: mode === 'light' ? 'rgba(0,255,0,0.6)' : '#c51162',
          },
          background: {
            default: mode === 'light' ? 'rgba(255,255,255,1.0)' : 'rgba(18,12,40,1.0)',
          },
          text: {
            primary: mode === 'light' ? 'rgba(0,0,0,0.87)' : 'rgba(255,255,255,0.87)',
          }
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: 14,
        },
        
      });
    const defaultTheme2 = createTheme(defaultTheme(mode));
    // const LPtheme = createTheme(getLPTheme(mode));
    return (
        <>
            <ThemeProvider theme={defaultTheme2}>
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        minHeight: '100vh',
                        position: 'relative',
                        transition: 'background-color 0.5s',
                        borderRadius: '12px',
                    }}
                >
                    <Header mode={mode} toggleColorMode={toggleColorMode} />
                        {children}
                    <Footer />
                </Box>
            </ThemeProvider>
        </>
    );
}

export default Layout;