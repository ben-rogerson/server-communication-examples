import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  // watch: true,
  generates: {
    "./src/generated/resolvers-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-apollo",
      ],
      config: {
        useIndexSignature: true,
      },
    },
  },
};

export default config;
