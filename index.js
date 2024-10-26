import express from "express";
import apiRoutes from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import connectDB from "./src/configs/dbConfig.js";
import errorHandler from "./src/middlewares/errHandlerMiddlewares/errorHandlerMiddleware.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
connectDB()
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/api", apiRoutes)
app.use(errorHandler);

app.listen(3000, () => {
    console.log(`App listening on port ${3000}`);
    // swaggerDocs(app, PORT);
  });
