import express from "express";
import apiRoutes from "./src/routes/index.js";
const app = express();

app.use(express.json());
app.use(cookieParser());


app.get("/api", apiRoutes)

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
    // swaggerDocs(app, PORT);
  });
