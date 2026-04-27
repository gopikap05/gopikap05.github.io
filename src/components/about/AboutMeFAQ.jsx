import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    number: "01",
    title: "Performance Optimization",
    desc: "I optimize images to WebP format with compression, minify CSS/JS files, enable caching through server/CDN like Cloudflare, and implement lazy loading for images and videos to ensure lightning-fast load times.",
    tags: ["WebP", "Minify", "Caching", "Lazy Load"],
  },
  {
    number: "02",
    title: "SEO & Metadata",
    desc: "I implement proper title tags and meta descriptions, maintain correct heading structure (H1 → H2 → H3), add descriptive alt text to all images, and create & submit sitemaps via Google Search Console for better search visibility.",
    tags: ["SEO", "Meta Tags", "Sitemap", "Alt Text"],
  },
  {
    number: "03",
    title: "Responsive Design",
    desc: "I thoroughly test websites on mobile, tablet, and desktop devices, fix spacing issues, adjust font sizes for optimal readability, and resolve any overflow problems to ensure perfect display across all screen sizes.",
    tags: ["Mobile", "Tablet", "Desktop", "Responsive"],
  },
  {
    number: "04",
    title: "Security Hardening",
    desc: "I install SSL certificates for HTTPS encryption, keep all plugins and themes updated regularly, implement security plugins like Wordfence for WordPress sites, and apply security best practices to protect against threats.",
    tags: ["SSL", "HTTPS", "Wordfence", "Updates"],
  },
  {
    number: "05",
    title: "Analytics & Tracking",
    desc: "I set up Google Analytics for comprehensive visitor tracking, implement conversion tracking for forms and clicks, monitor user behavior, and provide actionable insights to improve website performance.",
    tags: ["Analytics", "Conversions", "Tracking", "Insights"],
  },
  {
    number: "06",
    title: "Cross-Browser Testing",
    desc: "I test forms to ensure emails send correctly, verify all links are functional, and perform cross-browser testing on Chrome, Safari, Edge, and Firefox to guarantee consistent user experience.",
    tags: ["Testing", "Forms", "Links", "Cross-Browser"],
  },
  {
    number: "07",
    title: "UX & UI Sanity Check",
    desc: "I ensure clear and compelling CTA buttons, maintain clutter-free layouts, create intuitive navigation paths, and verify that all design elements enhance the user journey.",
    tags: ["UX", "UI", "CTAs", "Navigation"],
  },
  {
    number: "08",
    title: "Backup & Recovery",
    desc: "I configure automatic backup systems, ensure regular backup schedules, verify that restore functionality works correctly, and implement disaster recovery procedures for ultimate data protection.",
    tags: ["Backups", "Recovery", "Automation", "Security"],
  },
  {
    number: "09",
    title: "Domain & Hosting",
    desc: "I ensure domains are properly connected, configure DNS settings correctly, monitor hosting uptime and reliability, and optimize server configurations for peak performance.",
    tags: ["Domain", "DNS", "Hosting", "Uptime"],
  },
  {
    number: "10",
    title: "Legal Compliance",
    desc: "I implement Privacy Policy and Terms & Conditions pages, set up cookie consent banners for EU visitors, ensure GDPR compliance, and help protect your website legally.",
    tags: ["Privacy", "Terms", "Cookie Consent", "GDPR"],
  },
];

function AboutMeFAQ() {
  const [activeIndex, setActiveIndex] = useState(0); // Changed from null to 0

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── FAQ tag chips ── */
        .faq-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--theme-text-muted);
          border: 1px solid var(--theme-border-hover);
          padding: 3px 10px;
          border-radius: 999px;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .faq-tag:hover {
          border-color: var(--theme-primary);
          color: var(--theme-text-secondary);
        }

        /* ── FAQ row hover ── */
        .faq-row {
          cursor: pointer;
          transition: background 0.3s ease;
          position: relative;
        }
        .faq-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 2px; height: 0%;
          background: #ff3b3b;
          transition: height 0.4s ease;
        }
        .faq-row:hover::before,
        .faq-row.active::before {
          height: 100%;
        }
        .faq-row:hover {
          background: var(--theme-overlay);
        }

        /* Light theme specific adjustments */
        [data-theme="light"] .faq-tag {
          border-color: var(--theme-border);
        }
        [data-theme="light"] .faq-row:hover {
          background: rgba(122, 63, 145, 0.03);
        }
      `}</style>

      {/* ── FAQ SECTION ── */}
      <Box sx={{
        width: "100%",
        backgroundColor: "var(--theme-bg-primary)",
        color: "var(--theme-text-primary)",
        borderBottom: "1px solid var(--theme-border)",
      }}>
        <Box sx={{
          maxWidth: "1440px",
          width: "100%",
          mx: "auto",
          px: "clamp(16px, 5%, 96px)",
          py: { xs: "60px", sm: "70px", md: "80px" },
        }}>
          <Box sx={{
            display: "flex",
            gap: { xs: 4, md: 10 },
            flexDirection: { xs: "column", md: "row" },
          }}>

            {/* Left: sticky label */}
            <Box sx={{
              flex: { md: "0 0 220px" },
              pt: { md: "16px" },
            }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {/* Tag */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 12px",
                  border: "1px solid var(--theme-border-hover)",
                  borderRadius: "999px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--theme-text-muted)",
                  marginBottom: "20px",
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff3b3b", display: "inline-block" }} />
                  Quality Checklist
                </div>

                <Typography sx={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  letterSpacing: "3px",
                  lineHeight: 1.2,
                  color: "var(--theme-text-primary)",
                }}>
                  What I<br />Check Before<br />Launching<br />Your Site
                </Typography>
              </motion.div>
            </Box>

            {/* Right: accordion list */}
            <Box sx={{ flex: 1 }}>
              {faqs.map((item, index) => {
                const isOpen = activeIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.6 }}
                  >
                    <Box
                      className={`faq-row ${isOpen ? "active" : ""}`}
                      onClick={() => handleToggle(index)}
                      sx={{
                        py: { xs: "20px", md: "24px" },
                        px: "16px",
                        borderTop: index === 0 ? `1px solid var(--theme-border)` : "none",
                        borderBottom: `1px solid var(--theme-border)`,
                      }}
                    >
                      {/* Header row */}
                      <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}>
                        {/* Number */}
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "12px",
                          letterSpacing: "2px",
                          color: isOpen ? "rgba(255,59,59,0.7)" : "var(--theme-text-muted)",
                          minWidth: "28px",
                          transition: "color 0.3s ease",
                        }}>
                          {item.number}
                        </span>

                        {/* Title */}
                        <Typography sx={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                          color: isOpen ? "var(--theme-text-primary)" : "var(--theme-text-secondary)",
                          fontWeight: isOpen ? 500 : 400,
                          flex: 1,
                          transition: "color 0.3s ease",
                          letterSpacing: "0.5px",
                        }}>
                          {item.title}
                        </Typography>

                        {/* Plus / X */}
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            fontSize: "20px",
                            color: isOpen ? "var(--theme-text-primary)" : "var(--theme-text-muted)",
                            display: "inline-block",
                            lineHeight: 1,
                            transition: "color 0.3s ease",
                          }}
                        >
                          +
                        </motion.span>
                      </Box>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            style={{ overflow: "hidden" }}
                          >
                            <Box sx={{
                              pt: "16px",
                              pl: { xs: "28px", md: "36px" },
                              pr: "8px",
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { sm: "flex-end" },
                              justifyContent: "space-between",
                              gap: "16px",
                            }}>
                              <Typography sx={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: { xs: "0.82rem", md: "0.88rem" },
                                color: "var(--theme-text-secondary)",
                                lineHeight: 1.8,
                                maxWidth: "560px",
                              }}>
                                {item.desc}
                              </Typography>

                              {/* Tag chips */}
                              <Box sx={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                                justifyContent: { sm: "flex-end" },
                                flexShrink: 0,
                              }}>
                                {item.tags.map((tag) => (
                                  <span key={tag} className="faq-tag">{tag}</span>
                                ))}
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AboutMeFAQ;