module.exports = (function (app){
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/admin', function(req, res) {
    res.render('admin.html');
  });
});
