import React from 'react';
import { Container, Grid, Link, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';


const Footer = () => {
    const theme = useTheme();
  return (
    <Box
        sx={
            {
                // bgcolor: 'black',
                // color: 'white',
                bgcolor: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.4)'
                : 'rgba(0, 0, 0, 0.4)', // Use the primary color from the theme
                color: theme.palette.text, // Use the secondary color from the theme
                py: 5,
                borderRadius: '12px',
                marginTop: '3rem',
                borderTop: '1px solid',
            }
        }
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Liên kết</Typography>
            <Typography variant="body2">
              <Link href="#">Trang chủ</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Phim mới</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Danh sách</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6">Về chúng tôi</Typography>
            <Typography variant="body2">
              <Link href="#">Giới thiệu</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Liên hệ</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Theo dõi chúng tôi</Typography>
            <Typography variant="body2">
              <Link href="#">Facebook</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Twitter</Link>
            </Typography>
            <Typography variant="body2">
              <Link href="#">Instagram</Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
          © {new Date().getFullYear()} Tên Công Ty. Bảo lưu mọi quyền.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
