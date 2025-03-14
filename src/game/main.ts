import express from "express";
import process from "node:process";
import helmet from "helmet";
import "./plugins/tailwindcss.ts";
import "./utils/database.ts";

import dashboard from "./routes/dashboard.ts";

const PORT = process.env.PORT || 80;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => res.render('index.ejs'))
app.use('/dashboard', dashboard);

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}...`);
});