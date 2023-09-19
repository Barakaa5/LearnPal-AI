import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

import GoogleIcon from '@client/features/login-page/assets/images/Google Logo.svg';

const GoogleButton = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: '#FFFFFF',
        color: 'rgba(0, 0, 0, 0.54)',
        borderRadius: '10px',
        border: 'none',
        width: '370px',
        py: '5px',
        '&:hover': {
          bgcolor: '#FFFFFF',
          border: 'none',
        },
        textTransform: 'none',
      }}
      startIcon={
        <Image src={GoogleIcon} alt="GoogleIcon" width={24} height={24} />
      }
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      size="small"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
