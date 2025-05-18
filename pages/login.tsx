import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Typography, Paper, Link } from "@mui/material";
import { styled } from "@mui/system";
import PageLayout from "@/components/PageLayout/PageLayout";
import SafeFormattedMessage from "@/components/SafeFormattedMessage/SafeFormattedMessage";

type LoginFormInputs = {
  email: string;
  password: string;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: 400,
  mx: "auto",
  mt: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "1rem",
}));

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setErrorMsg(null);

    try {
      // Charger bcryptjs dynamiquement pour éviter des problèmes SSR
      const bcrypt = (await import("bcryptjs")).default;

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

      // Vérifier si l'utilisateur existe
      const transaction = db.transaction("users", "readonly");
      const store = transaction.objectStore("users");

      const user = await new Promise<any>((resolve) => {
        const request = store.get(data.email);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      });

      if (!user) {
        setErrorMsg("Email ou mot de passe incorrect");
        return;
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        setErrorMsg("Email ou mot de passe incorrect");
        return;
      }

      // Connexion réussie
      alert("Connexion réussie !");
      // Ici, tu peux rediriger l'utilisateur (par exemple, avec useRouter de next/navigation)
      // Exemple : router.push("/dashboard");
    } catch (e) {
      setErrorMsg("Erreur lors de la connexion : " + (e as Error).message);
    }
  };

  return (
    <PageLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "grey.100",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledPaper>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            <SafeFormattedMessage id="globals.welcome-back" />
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
            <SafeFormattedMessage id="globals.connect-first" />
          </Typography>
          {errorMsg && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errorMsg}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
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
              sx={{ mt: 3 }}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </StyledButton>
          </Box>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              <SafeFormattedMessage id="globals.have.not-account" />
              <Link href="/register" variant="body2" color="primary">
                <SafeFormattedMessage id="globals.button.register" />
              </Link>
            </Typography>
          </Box>
        </StyledPaper>
      </Box>
    </PageLayout>
  );
};

export default Login;