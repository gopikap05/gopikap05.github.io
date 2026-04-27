import { Box } from "@mui/material";
import Breadcrumbs from "../components/common/breadcrumbs";
import ContactHero from "../components/contacts/ContactHero";
import ContactForm from "../components/contacts/contactForm";
import ThanksNote from "../components/contacts/thanksnote";
import Social from "../components/contacts/Social";

function Contact() {
  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
        ]}
      />

      <ContactHero />
      <ContactForm />
      <Social />
      <ThanksNote />
    </Box>
  );
}

export default Contact;