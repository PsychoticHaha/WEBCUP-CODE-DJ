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
import PageLayout from "@/components/PageLayout/PageLayout";
import SafeFormattedMessage from "@/components/SafeFormattedMessage/SafeFormattedMessage";
import { useIntl } from "react-intl";

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const intl = useIntl();
  const steps = [
    intl.formatMessage({ id: "login.account-infos" }),
    intl.formatMessage({ id: "login.personnal-details" }),
    intl.formatMessage({ id: "login.confirmation" }),
  ];

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

  const onSubmit = async (data: FormValues) => {
    setErrorMsg(null);

    try {
      // Charger bcryptjs dynamiquement
      const bcrypt = (await import("bcryptjs")).default;

      // Hasher le mot de passe avant de commencer la transaction IndexedDB
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Créer un nouvel utilisateur
      const newUser = {
        email: data.email,
        password: hashedPassword,
        name: data.firstName,
        fullname: data.lastName,
        created_at: new Date().toISOString(),
      };

      // Ouvrir la base de données IndexedDB
      const request = indexedDB.open("UserDB", 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" });
        }
      };

      const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
        request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
        request.onerror = () => reject(new Error("Erreur d'ouverture de la base de données"));
      });

      const db = await dbPromise;

      // Vérifier si l'utilisateur existe déjà
      const transactionCheck = db.transaction("users", "readonly");
      const storeCheck = transactionCheck.objectStore("users");

      const existingUser = await new Promise((resolve) => {
        const request = storeCheck.get(data.email);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      });

      if (existingUser) {
        setErrorMsg("Cet email est déjà utilisé");
        return;
      }

      // Ajouter l'utilisateur avec une nouvelle transaction
      const transactionAdd = db.transaction("users", "readwrite");
      const storeAdd = transactionAdd.objectStore("users");

      await new Promise<void>((resolve, reject) => {
        const request = storeAdd.add(newUser);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error("Erreur lors de l'ajout de l'utilisateur"));
      });

      alert("Inscription réussie !");
      setActiveStep(0); // Réinitialiser le formulaire
    } catch (e) {
      setErrorMsg("Erreur lors de l'inscription : " + (e as Error).message);
    }
  };

  return (
    <PageLayout>
      <Box className="flex justify-center items-center wrapper" sx={{ minHeight: "calc(100vh - 74px)" }}>
        <Paper sx={{ p: 4, maxWidth: "fit-content", mx: "auto", marginTop: "74px" }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
            <SafeFormattedMessage id="globals.button.register" />
          </Typography>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {errorMsg && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}
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
                <SafeFormattedMessage id="register.confirm-details" defaultMessage="Please confirm your details:" />
                <Typography>
                  <SafeFormattedMessage id="register.email" defaultMessage={`Email: ${getValues("email")}`} />
                </Typography>
                <Typography>
                  <SafeFormattedMessage id="register.first-name" defaultMessage={`First Name: ${getValues("firstName")}`} />
                </Typography>
                <Typography>
                  <SafeFormattedMessage id="register.last-name" defaultMessage={`Last Name: ${getValues("lastName")}`} />
                </Typography>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button
                disabled={activeStep === 0}
                onClick={onBack}
                variant="outlined"
              >
                <SafeFormattedMessage id="globals.button.back" />
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button onClick={onNext} variant="contained">
                  <SafeFormattedMessage id="globals.button.next" />
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  <SafeFormattedMessage id="globals.button.register" />
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </PageLayout>
  );
}