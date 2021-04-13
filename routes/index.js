module.exports = (function (app){
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/mobile', function(req, res) {
    res.render('mobile_main.html');
  });
});
