"use client";

import Box, { type BoxProps } from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

/**
 * Glass-style label chip from Figma (node 204:578).
 * Size scales with text: padding and corner radius use `em` units.
 */
export default function GlassLabel({
  children = "label",
  sx,
  component = "span",
  ...props
}: BoxProps) {
  return (
    <Box
      component={component}
      sx={[
        (theme) => ({
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          maxWidth: "100%",
          boxSizing: "border-box",
          borderRadius: "0.16em",
          paddingInline: "0em",
          paddingX: "0.8em",
          color: theme.palette.common.white,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.button.fontSize,
          fontWeight: 400,
          lineHeight: 0.8,
          textAlign: "center",
          bgcolor: alpha("#a1a1a1", 0.09),
          border: `1px solid ${alpha(theme.palette.common.white, 0.14)}`,
          boxShadow: `inset 0 1px 0 0 ${alpha(theme.palette.common.white, 0.18)}, inset 0 -1px 0 0 ${alpha(theme.palette.common.white, 0.08)}`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }),
        ...(sx === undefined || sx === null ? [] : Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}
