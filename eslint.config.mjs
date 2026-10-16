import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [...compat.extends("next/core-web-vitals"), globalIgnores([".next/**", ".netlify/**", "out/**", "build/**", "next-env.d.ts"])];

export default eslintConfig;
