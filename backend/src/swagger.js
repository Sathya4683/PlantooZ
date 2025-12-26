import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yamljs";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(
  path.join(__dirname, "../docs/openapi.yaml")
);

export { swaggerDocument, swaggerUi };

