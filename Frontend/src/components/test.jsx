import Button from '@mui/material/Button';

function LoginButton() {
  const authenticateWithGoogle = () => {
    window.location.href = 'http://localhost:5001/api/v1/auth/google';
  };

  return (
    <Button variant="contained" color="primary" onClick={authenticateWithGoogle}>
      Login with Google
    </Button>
  );
}

export default LoginButton;