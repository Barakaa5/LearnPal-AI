import { Button, Stack, TextInput } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const CredentialsLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the user's input values
    const email = '';
    const password = '';

    // Call signIn with the credentials provider
    signIn('credentials', {
      redirect: true, // Set to true to enable automatic redirection
      email,
      password,
    });
  };
  return (
    <Stack mb={10}>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="standard-email-input"
          label="Email"
          type="email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          id="standard-password-input"
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          type="submit"
          style={{
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
      </form>
    </Stack>
  );
};

export default CredentialsLogin;
