import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {

Box,
Button,
Step,
StepLabel,
Stepper,
TextField,
Typography,
Paper,
} from "@mui/material";

const steps = ["Account Info", "Personal Details", "Confirmation"];

type FormValues = {
email: string;
password: string;
firstName: string;
lastName: string;
};

export default function Register() {
const [activeStep, setActiveStep] = useState(0);
const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
} = useForm<FormValues>({
    defaultValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    },
});

const onNext = async () => {
    let valid = false;
    if (activeStep === 0) {
        valid = await trigger(["email", "password"]);
    } else if (activeStep === 1) {
        valid = await trigger(["firstName", "lastName"]);
    } else {
        valid = true;
    }
    if (valid) setActiveStep((prev) => prev + 1);
};

const onBack = () => setActiveStep((prev) => prev - 1);

const onSubmit = (data: FormValues) => {
    // handle registration logic here
    alert(JSON.stringify(data, null, 2));
};

return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
            Register
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                label="Email"
                                {...field}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                type="password"
                                {...field}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                fullWidth
                            />
                        )}
                    />
                </Box>
            )}
            {activeStep === 1 && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }}
                        render={({ field }) => (
                            <TextField
                                label="First Name"
                                {...field}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last name is required" }}
                        render={({ field }) => (
                            <TextField
                                label="Last Name"
                                {...field}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                fullWidth
                            />
                        )}
                    />
                </Box>
            )}
            {activeStep === 2 && (
                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Please confirm your details:
                    </Typography>
                    <Typography>Email: {getValues("email")}</Typography>
                    <Typography>First Name: {getValues("firstName")}</Typography>
                    <Typography>Last Name: {getValues("lastName")}</Typography>
                </Box>
            )}
            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                    disabled={activeStep === 0}
                    onClick={onBack}
                    variant="outlined"
                >
                    Back
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button onClick={onNext} variant="contained">
                        Next
                    </Button>
                ) : (
                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                )}
            </Box>
        </form>
    </Paper>
);
}