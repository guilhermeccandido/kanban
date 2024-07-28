import { chain } from "./app/middleware/chain";
import { loggingMiddleware } from "./app/middleware/loggingMiddleware";

export default chain([loggingMiddleware]);
