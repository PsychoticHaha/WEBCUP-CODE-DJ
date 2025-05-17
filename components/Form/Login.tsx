import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        
        console.log(data);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, mx: 'auto', mt: 4 }}
        >
            <TextField
                label="Email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Login
            </Button>
        </Box>
    );
};

export default Login;