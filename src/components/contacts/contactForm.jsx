import {
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_3wgg108",
        "template_wieh09d",
        form,
        "tF2Z9ebsNoKBb13kb"
      )
      .then(() => {
        setSnackbar({
          open: true,
          message: "Message sent successfully. I’ll get back to you soon.",
          severity: "success",
        });

        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Something went wrong. Please try again.",
          severity: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const darkInputStyles = {
    InputLabelProps: {
      sx: {
        color: "#777",
        "&.Mui-focused": { color: "#fff" },
      },
    },
    InputProps: {
      sx: {
        color: "#fff",
        "&:before": { borderBottom: "1px solid #333" },
        "&:after": { borderBottom: "1px solid #fff" },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "1px solid #aaa",
        },
      },
    },
  };

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          px: 6,
          py: 18,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #1a1a1a",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ maxWidth: "800px", mx: "auto", width: "100%" }}
        >
          <Typography sx={{ fontSize: "14px", color: "#777", mb: 2 }}>
            CONTACT
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 600,
              mb: 8,
            }}
          >
            Let’s start a conversation.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { label: "Your Name", name: "name" },
              { label: "Your Email", name: "email", type: "email" },
              { label: "Message", name: "message", multiline: true, rows: 4 },
            ].map((field) => (
              <TextField
                key={field.name}
                variant="standard"
                fullWidth
                required
                {...field}
                value={form[field.name]}
                onChange={handleChange}
                {...darkInputStyles}
              />
            ))}

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: "20px",
            px: 3,
            py: 1.5,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ContactForm;