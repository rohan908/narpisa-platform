export const appConfig = {
  name: "NaRPISA Platform",
  tagline: "Natural resources intelligence for value addition and mineral trading",
  primaryRegion: "Namibia",
  sourcePolicy: {
    maxPdfBytes: 10 * 1024 * 1024,
    allowedSchemes: ["https"],
  },
} as const;

export const teamPrinciples = [
  "Prefer source URLs plus attribution over file uploads.",
  "Keep parsing stateless and reproducible.",
  "Protect data quality with typed contracts and tests.",
] as const;
