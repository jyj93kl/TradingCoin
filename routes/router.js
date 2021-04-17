module.exports = (function (app){
  app.get('/', function(req, res) {
    res.render('index.html');
  });
  app.get('/m/wallet', function(req, res) {
    res.render('mobile_main.html');
  });
  app.get('/m/diary', function(req, res) {
    res.render('mobile_diary.html');
  });

  app.get('/w/wallet', function(req, res) {
    res.render('web_main.html');
  });
});
