import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

function Navbar() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        backgroundColor: "#000",
        borderBottom: "1px solid #1a1a1a",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1100px", // ✅ aligned with rest of layout
          width: "100%",
          mx: "auto",
          px: { xs: 3, md: 4 }, // ✅ responsive padding
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 30, // ✅ slightly balanced with navbar height
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Link>

        {/* Links */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: "40px" }, // ✅ responsive spacing
            alignItems: "center",
          }}
        >
          {["Home", "About", "Projects", "Contact"].map((item) => (
            <Typography
              key={item}
              component={Link}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              sx={{
                fontSize: "14px",
                color: "#aaa",
                textDecoration: "none",
                letterSpacing: "1px",
                transition: "0.3s",
                display: "flex", // ✅ vertical alignment fix
                alignItems: "center",
                height: "100%", // ✅ keeps text centered in navbar
                "&:hover": {
                  color: "#fff",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;