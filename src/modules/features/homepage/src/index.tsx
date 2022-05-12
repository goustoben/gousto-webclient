import React from "react";
import { Heading1, ThemeProvider, Reset } from "@gousto-internal/citrus-react";
import { CSSInterpolation } from "@emotion/serialize";

// Feature modules can depend on media images
// const webclientMediaImage = require('media/images/box-prices/best-value.png')

const fontStyles: CSSInterpolation = [
  {
    "@font-face": {
      fontFamily: "AxiformaBook",
      src: `url('./src/m') format('woff2')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "AxiformaSemiBold",
      src: `url('../src/fonts/Axiforma-SemiBold.woff2') format('woff2')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "AxiformaBold",
      src: `url('../src/fonts/Axiforma-Bold.woff2') format('woff2')`,
    },
  },
];

export function Homepage() {
  return (
    <ThemeProvider>
      <Reset styles={fontStyles} />
      <Heading1>Hello</Heading1>
    </ThemeProvider>
  );
}
