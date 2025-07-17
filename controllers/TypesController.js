import context from '../context/AppContext.js';

export function GetIndex(req, res, next) {
    context.TypesModel.findAll()
    .then((result) => {
        const types = result.map((result) => result.dataValues);

        res.render("types/index", { 
            typesList: types,
            "page-title": "Types List"
        }); 
    })
    .catch((err) => {
        console.log("Error fetching types", err);
    }); // Promises
}

export function GetCreate(req, res, next) {
    res.render("types/save", {
        editMode: false,
        "page-title": "New Type"
    });
}

export function PostCreate(req, res, next) {
    const name = req.body.name;

    context.TypesModel.create({
        name: name,
    })
        .then(() => {
            return res.redirect("/types/index");
        })
        .catch((err) => {
            console.error("Error creating type:", err);
        });
}

export function GetEdit(req, res, next) {
    const id = req.params.typesId;

    context.TypesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/types/index");
      }

      const type = result.dataValues;

      res.render("types/save", {
        editMode: true,
        type: type,
        "page-title": `Edit Type ${type.name}`,
      });
    })
    .catch((err) => {
      console.error("Error fetching types:", err);
    });
}

export function PostEdit(req, res, next) {
    const id = req.body.TypesId;
    const name = req.body.name;

    context.TypesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/types/index");
      }

      context.TypesModel.update(
        { name: name },
        { where: { id: id } }
      )
        .then(() => {
          return res.redirect("/types/index");
        })
        .catch((err) => {
          console.error("Error updating type:", err);
        });
    })
    .catch((err) => {
      console.error("Error fetching types:", err);
    });
}

export function Delete(req, res, next) {
    const id = req.body.TypeId;

    context.TypesModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/types/index");
      }

      context.TypesModel.destroy({ where: { id: id } })
        .then(() => {
          return res.redirect("/types/index");
        })
        .catch((err) => {
          console.error("Error deleting type:", err);
        });
        
    })
    .catch((err) => {
      console.error("Error fetching types:", err);
    });
}