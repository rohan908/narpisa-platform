"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Link from "next/link";

type GlassButtonProps = ButtonProps & {
  /** When provided, renders as a next/link anchor */
  href?: string;
};

export default function GlassButton({
  children = "glass button",
  href,
  sx,
  ...props
}: GlassButtonProps) {
  const linkProps = href ? { component: Link, href } : {};

  return (
    <Button
      disableRipple
      variant="text"
      {...linkProps}
      sx={[
        (theme) => ({
          position: "relative",
          display: "inline-flex",
          width: "fit-content",
          maxWidth: "100%",
          boxSizing: "border-box",
          borderRadius: "9999px",
          paddingInline: "0.85em",
          paddingBlock: "0.28em",
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.button.fontSize,
          fontWeight: 400,
          lineHeight: 1,
          textDecoration: "none",
          bgcolor: alpha("#a1a1a1", 0.2),
          border: `1px solid ${alpha(theme.palette.common.white, 0.14)}`,
          boxShadow: `inset 0 1px 0 0 ${alpha(theme.palette.common.white, 0.1)}, inset 0 -1px 0 0 ${alpha(theme.palette.common.white, 0.1)}`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "transform"],
            { duration: theme.transitions.duration.short },
          ),
          "&:hover": {
            bgcolor: alpha("#a1a1a1", 0.16),
            borderColor: alpha(theme.palette.common.white, 0.4),
            strokeWidth: 1,
          },
          "&:active": {
            bgcolor: alpha(theme.palette.primary.main, 0.3),
            transform: "scale(0.99)",
          },
          "&.Mui-focusVisible": {
            outline: `2px solid ${alpha(theme.palette.primary.main, 0.55)}`,
            outlineOffset: 3,
          },
        }),
        ...(sx === undefined || sx === null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Button>
  );
}
