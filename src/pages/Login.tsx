import { Button, Input } from '@nextui-org/react';
import { useState } from 'react';
import { loginApi } from '../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentails] = useState<{
    email: string;
    password: string;
  }>({
    email: 'ashKetchum@pokemon.com',
    password: 'GottaCatchEmAll',
  });

  const [formValidationError, setFormValidationError] = useState<string>('');

  const onValueChange = (value: string, type: 'email' | 'password') => {
    const newCredentials = { ...credentials, [type]: value };
    setCredentails(newCredentials);
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      setFormValidationError('Both email and password are required.');
      return;
    }
    setFormValidationError('');
    loginApi(email, password)
      .then((data) => {
        localStorage.setItem('auth', JSON.stringify(data));
        navigate('/', { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full flex justify-center items-center h-[80svh] gap-4">
      <div className="bg-default-50 p-8">
        <h2 className="mb-8">Login</h2>
        <form
          className=" flex justify-center flex-col gap-4 rounded-md"
          onSubmit={submitForm}
        >
          <Input
            name="email"
            type="email"
            value={credentials.email}
            label="Email"
            onChange={(event) => {
              const value = event.target.value;
              onValueChange(value, 'email');
            }}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={credentials.password}
            onChange={(event) => onValueChange(event.target.value, 'password')}
          />
          <Button color="primary" type="submit">
            Login
          </Button>
        </form>
        {formValidationError ? <small>{formValidationError}</small> : null}
      </div>
    </div>
  );
};
