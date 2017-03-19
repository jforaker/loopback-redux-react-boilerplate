var async = require('async');

module.exports = function (app, cb) {
  var User = app.models.adminUser;
  var postgresql = app.dataSources.postgresql; // 'name' of your mongo connector, you can find it in datasource.json

  User.create({"email": "foo@bar.com", "password": "bar"}, function (err, userInstance) {
    console.log(userInstance);
  });


  // postgresql.automigrate('adminUser', function (err, done) {
  //   if (err) return cb(err);
  //   var adminUser = app.models.adminUser;
  //   adminUser.create({
  //     email: 'foo@bar.com',
  //     password: 'foobar'
  //   }, function (err, clean) {
  //     if (err) return cb(err);
  //     console.log('clean', clean);
  //   });
  // });

  return postgresql.isActual(function (err, actual) {
    if (err) return cb(err);
    console.log('actual', actual);
    if (!actual) {
      postgresql.autoupdate(function (err, result) {
        if (err) return cb(err);
        console.log('result', result);
        cb()
      });
    }
  });
};