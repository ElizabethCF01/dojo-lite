import type { KnipConfiguration } from "knip";

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreDependencies: ["expo-updates", "expo-system-ui", "@expo/vector-icons"],
  entry: [
    "src/shared/design/elements/index.ts",
    "src/shared/design/foundations/index.ts",
    "src/shared/design/helpers/index.ts",
    "src/features/students/index.ts",
  ],
};

export default config;
