'use strict';

module.exports = function(app) {
  var bondsController = require('../controllers/bondsController');

  app.route('/bonds')
    .get(bondsController.list_all_bonds)
    .post(bondsController.create_a_bond);

  app.route('/bonds/:id')
    .get(bondsController.read_a_bond)
    .put(bondsController.update_a_bond)
    .delete(bondsController.delete_a_bond);
	
  var bondMetricsController = require('../controllers/bondMetricsController');

  app.route('/bondMetrics')
    .get(bondMetricsController.list_all_bondMetrics)
    .post(bondMetricsController.create_a_bondMetric);

  app.route('/bondMetrics/:id')
    .get(bondMetricsController.read_a_bondMetric)
    .put(bondMetricsController.update_a_bondMetric)
    .delete(bondMetricsController.delete_a_bondMetric);
	
};
