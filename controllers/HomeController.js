import context from '../context/AppContext.js';

export function GetHome(req, res, next) {
    const search = req.query.search || "";
    const regionFilter = req.query.region || "";

    // Relaciona con tipo y región
    context.PokemonsModel.findAll({
        include: [
            { model: context.TypesModel },
            { model: context.RegionsModel }
        ]
    })
    .then((pokemonsResult) => {
        let pokemons = pokemonsResult.map(p => p.get({ plain: true }));

        if (search.trim()) {
            pokemons = pokemons.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (regionFilter.trim()) {
            pokemons = pokemons.filter(p =>
                String(p.regionId) === regionFilter
            );
        }

        context.RegionsModel.findAll()
            .then((regionsResult) => {
                const regions = regionsResult.map(r => r.dataValues);
                res.render("home/home", {
                    pokemonsList: pokemons,
                    regionsList: regions,
                    search,
                    selectedRegion: regionFilter,
                    "page-title": "Home"
                });
            });
    })
    .catch((err) => {
        console.error("Error loading pokemons:", err);
    });
}