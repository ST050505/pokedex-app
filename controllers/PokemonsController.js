import context from '../context/AppContext.js';

export function GetIndex(req, res, next) {
    context.PokemonsModel.findAll({ 
        include: [
            { model: context.TypesModel },
            { model: context.RegionsModel }
        ]
    })
    .then((result) => {
        const pokemons = result.map((result) => result.get({ plain: true }));

        res.render("pokemons/index", { 
            pokemonsList: pokemons,
            "page-title": "Pokémon List"
        }); 
    })
    .catch((err) => {
        console.log("Error fetching pokemons", err);
    }); // Promises
}

export function GetCreate(req, res, next) {
    context.TypesModel.findAll()
        .then((typesResult) => {
            const types = typesResult.map((type) => type.dataValues);

            context.RegionsModel.findAll()
                .then((regionsResult) => {
                    const regions = regionsResult.map((region) => region.dataValues);

                    res.render("pokemons/save", {
                        editMode: false,
                        typesList: types,
                        regionsList: regions,
                        "page-title": "New Pokémon",
                    });
                })
                .catch((err) => {
                    console.error("Error fetching regions:", err);
                });
            
        })
        .catch((err) => {
        console.error("Error fetching types:", err);
        }); //promises
}

export function PostCreate(req, res, next) {
    const name = req.body.name;
    const picture = req.body.picture;
    const typeId = req.body.typeId;
    const regionId = req.body.regionId;
    
    context.PokemonsModel.create({
        name: name,
        picture: picture,
        typeId: typeId,
        regionId: regionId,
    })
        .then(() => {
            res.redirect("/pokemons/index");
        }).catch((err) => {
            console.error("Error creating pokemons:", err);
        }); 
}

export function GetEdit(req, res, next) {
    const id = req.params.pokemonsId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {

            if(!result) {
                return res.redirect("/pokemons/index");
            }

            const pokemon = result.dataValues;

            context.TypesModel.findAll()
            .then((typesResult) => {
                const types = typesResult.map((type) => type.dataValues);

                context.RegionsModel.findAll()
                    .then((regionsResult) => {
                        const regions = regionsResult.map((region) => region.dataValues);

                        res.render("pokemons/save", {
                            editMode: true,
                            pokemon: pokemon,
                            typesList: types,
                            regionsList: regions,
                            "page-title": `Edit Pokémon ${pokemon.name}`,
                        });
                    })
                    .catch((err) => {
                        console.error("Error fetching regions:", err);
                    });
            })
            .catch((err) => {
            console.error("Error fetching types:", err);
            }); //promises
        })
        .catch((err) => {
            console.error("Error fetching pokemons:", err);
        }); 
}

export function PostEdit(req, res, next) {
    const id = req.body.PokemonId;
    const name = req.body.name;
    const picture = req.body.picture;
    const typeId = req.body.typeId;
    const regionId = req.body.regionId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {
            
            if(!result) {
                return res.redirect("/pokemons/index");
            }

            context.PokemonsModel.update(
                {
                    name: name,
                    picture: picture,
                    typeId: typeId,
                    regionId: regionId,
                },
                { where: { id: id }}
            )
                .then(() => {
                    res.redirect("/pokemons/index");
                })
                .catch((err) => {
                    console.error("Error updating pokemons", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons:", err);
        });
}

export function Delete(req, res, next) {
    const id = req.body.PokemonId;

    context.PokemonsModel.findOne({ where: { id: id } })
        .then((result) => {
            
            if(!result) {
                return res.redirect("/pokemons/index");
            }

            context.PokemonsModel.destroy({ where: { id: id } })
                .then(() => {
                    return res.redirect("/pokemons/index");
                })
                .catch((err) => {
                    console.error("Error deleting pokemons:", err);
                });
        })
        .catch((err) => {
            console.error("Error fetching pokemons:", err);
        });
}