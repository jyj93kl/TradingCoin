module.exports = (function (app){
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/moblie', function(req, res) {
    res.render('moblie_main.html');
  });
});
