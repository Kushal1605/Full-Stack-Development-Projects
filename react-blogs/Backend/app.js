import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import routes from "./routes/routes.js";
import cors from 'cors'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    
  })
);

app.use(
  session({
    secret: "this_is_a_secret.",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(express.static("public"));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Live at localhost:${port}`);
});

export default app;
