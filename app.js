import './utils/LoadEnvConfig.js';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { projectRoot } from './utils/Paths.js';
import homeRoutes from './routes/home.js';
import pokemonsRoutes from './routes/pokemons-router.js';
import typesRoutes from './routes/types-router.js';
import regionsRoutes from './routes/regions-router.js';
import context from './context/AppContext.js';
import { GetSection } from './utils/helpers/Hbs/Section.js';
import { Equals, Or, Not } from './utils/helpers/Hbs/Compare.js';

const app = express();

// Render engine
app.engine('hbs', engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
        eq: Equals,
        or: Or,
        not: Not,
        section: GetSection,
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoot, 'public')));

// Routes 
app.use(homeRoutes);
app.use("/pokemons", pokemonsRoutes);
app.use("/types", typesRoutes);
app.use("/regions", regionsRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('404', { "page-title": 'Page Not Found' });
});

context.Sequelize
    .sync() // { alter: true }
    .then(() => {
        app.listen(process.env.PORT || 5050);
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });