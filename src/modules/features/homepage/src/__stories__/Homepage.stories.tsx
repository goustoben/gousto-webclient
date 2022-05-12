import { Meta } from "@storybook/react";
import React from "react";

import { Homepage } from "..";

export default {
  component: Homepage,
  title: "Components/Homepage",
} as Meta;

export const HomepageExample: React.FC = () => <Homepage />;
