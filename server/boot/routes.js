module.exports = function (app) {
  var router = app.loopback.Router();

  router.get('/healthcheck', function (req, res) {
    res.send('OK!');
  });

  app.use(router);
};