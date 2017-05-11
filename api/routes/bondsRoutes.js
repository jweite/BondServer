'use strict';

module.exports = function(app) {
  var articleController = require('../controllers/bondsController');

  // Define the REST routes (to controller methods) for article entity
  app.route('/bonds')
    .get(articleController.list_all_bonds)
    .post(articleController.create_a_bond);

  app.route('/bonds/:id')
    .get(articleController.read_a_bond)
    .put(articleController.update_a_bond)
    .delete(articleController.delete_a_bond);
};
