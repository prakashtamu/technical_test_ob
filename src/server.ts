import app from "./app";
import { initializeDatabase } from "./utils/database";
import Env from "./utils/env";

app.listen(Env.PORT, () => {
  console.log(`Server is running on port ${Env.PORT}`);
});
