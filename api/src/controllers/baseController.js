//controlador base

function getAll(Model) {
    return async (req, res) => {
      try {
        const items = await Model.findAll();
        res.json(items);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  }
  
  function getOne(Model) {
    return async (req, res) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
          return res.status(404).json({ msg: `${Model.name} not found` });
        }
        res.json(item);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  }
  
  function createOne(Model) {
    return async (req, res) => {
      try {
        const item = await Model.create(req.body);
        res.json(item);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  }
  
  function updateOne(Model) {
    return async (req, res) => {
      try {
        const item = await Model.update(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          return res.status(404).json({ msg: `${Model.name} not found` });
        }
        res.json(item);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  }
  
  function deleteOne(Model) {
    return async (req, res) => {
      try {
        const item = await Model.deleteById(req.params.id);
        if (!item) {
          return res.status(404).json({ msg: `${Model.name} not found` });
        }
        res.json({ msg: `${Model.name} deleted` });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
  }
  
  module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  };