'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        p: { xs: 2, sm: 3, md: 4 }, 
        mt: 'auto', 
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.875rem' }, 
          mb: { xs: 0.5, sm: 1 }, 
        }}
      >
        &copy; {new Date().getFullYear()} Bassecool. All rights reserved.
      </Typography>
      <Box
        sx={{
          mt: { xs: 0.5, sm: 1 }, 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'center',
          gap: { xs: 0.5, sm: 1, md: 2 }, 
        }}
      >
        <MuiLink
          component={Link}
          href="/contact"
          color="inherit"
          sx={{
            textDecoration: 'none', 
            '&:hover': {
              textDecoration: 'underline', 
            },
            fontSize: { xs: '0.8rem', sm: '0.9rem' }, 
            py: { xs: 0.25, sm: 0 }, 
          }}
        >
          Contact Us
        </MuiLink>
        <MuiLink
          component={Link}
          href="/inquiry"
          color="inherit"
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            py: { xs: 0.25, sm: 0 },
          }}
        >
          Get a Quote
        </MuiLink>
      </Box>
    </Box>
  );
}