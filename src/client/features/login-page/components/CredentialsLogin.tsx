import { Button, FormControl, Stack, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';

const CredentialsLogin = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the user's input values
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Call signIn with the credentials provider
    signIn('credentials', {
      redirect: true, // Set to true to enable automatic redirection
      email,
      password,
    });
  };
  return (
    <Stack sx={{ mb: '10px' }}>
      <FormControl sx={{ mb: '48px' }} onSubmit={handleSubmit}>
        <TextField
          id="standard-email-input"
          label="Email"
          type="email"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          variant="standard"
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            bgcolor: '#9C6FE4',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            width: '370px',
            py: '5px',
            '&:hover': {
              bgcolor: '#9C6FE4',
              border: 'none',
            },
            textTransform: 'none',
          }}
          size="small"
        >
          Login
        </Button>
      </FormControl>
    </Stack>
  );
};

export default CredentialsLogin;
