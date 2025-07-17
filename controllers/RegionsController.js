import context from '../context/AppContext.js';

export function GetIndex(req, res, next) {
    context.RegionsModel.findAll()
    .then((result) => {
        const regions = result.map((result) => result.dataValues);

        res.render("regions/index", { 
            regionsList: regions,
            "page-title": "Regions List"
        }); 
    })
    .catch((err) => {
        console.log("Error fetching regions", err);
    }); // Promises
}

export function GetCreate(req, res, next) {
    res.render("regions/save", {
        editMode: false,
        "page-title": "New Region"
    });
}

export function PostCreate(req, res, next) {
    const name = req.body.name;

    context.RegionsModel.create({
        name: name,
    })
        .then(() => {
            return res.redirect("/regions/index");
        })
        .catch((err) => {
            console.error("Error creating region:", err);
        });
}

export function GetEdit(req, res, next) {
    const id = req.params.regionsId;

    context.RegionsModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regions/index");
      }

      const region = result.dataValues;

      res.render("regions/save", {
        editMode: true,
        region: region,
        "page-title": `Edit Region ${region.name}`,
      });
    })
    .catch((err) => {
      console.error("Error fetching regions:", err);
    });
}

export function PostEdit(req, res, next) {
    const id = req.body.RegionId;
    const name = req.body.name;

    context.RegionsModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regions/index");
      }

      context.RegionsModel.update(
        { name: name },
        { where: { id: id } }
      )
        .then(() => {
          return res.redirect("/regions/index");
        })
        .catch((err) => {
          console.error("Error updating region:", err);
        });
    })
    .catch((err) => {
      console.error("Error fetching regions:", err);
    });
}

export function Delete(req, res, next) {
    const id = req.body.RegionId;

    context.RegionsModel.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        return res.redirect("/regions/index");
      }

      context.RegionsModel.destroy({ where: { id: id } })
        .then(() => {
          return res.redirect("/regions/index");
        })
        .catch((err) => {
          console.error("Error deleting region:", err);
        });
        
    })
    .catch((err) => {
      console.error("Error fetching regions:", err);
    });
}