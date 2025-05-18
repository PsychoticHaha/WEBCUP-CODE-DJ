import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper, Link } from '@mui/material';
import { styled } from '@mui/system';

type LoginFormInputs = {
    email: string;
    password: string;
};

import { Theme } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: 400, // Increased width for better visual balance
    mx: 'auto',
    mt: theme.spacing(8), // Increased margin top to push it down
    borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5),
    fontSize: '1rem',
}));

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = data => {
        // Implement your login logic here
        console.log('Login data:', data);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensure the container takes at least the full viewport height
                bgcolor: 'grey.100', // Light background color
                justifyContent: 'center', // Center content vertically
                alignItems: 'center', // Center content horizontally
            }}
        >
            <StyledPaper>
                <Typography variant="h4" align="center" gutterBottom color="primary">
                    Welcome Back!
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    Sign in to continue.
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal" // Added margin for better spacing
                        variant="outlined" // Use outlined for a cleaner look
                    />
                    <TextField
                        label="Password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        sx={{ mt: 3 }} // Added margin top for spacing
                    >
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </StyledButton>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link href="#" variant="body2" color="primary">
                        Forgot password?
                    </Link>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Don't have an account? <Link href="#" variant="body2" color="primary">Sign up</Link>
                    </Typography>
                </Box>
            </StyledPaper>
        </Box>
    );
};

export default Login;