var express = require('express');

var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const axios = require("axios")
//var fetch = require('node-fetch');
var request  = require('request');
var cheerio = require('cheerio');
let fetch = require('node-fetch')
const cors=require('cors');
const { response } = require('express');
const chrome = require('get-chrome-tabs');
const { stripVTControlCharacters } = require('util');







app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

app.post('/get', function (req, res, next) {
  var data;
  var js;
  console.log("from sever", req.body.URL);
  const URL = req.body.URL;

  
  
  //console.log(ur);
  //const URL = "https://www.wordstream.com/meta-tags#:~:text=If%20you%20want%20to%20find,the%20meta%20tags%20would%20be.";
  
  request(URL, function (error, response, html) {
    var c = 0, c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0, h1, h2, h3, links, data;
    //var c=0;
    
        
    const $ = cheerio.load(html);
    var title = $("meta[property='og:title']").attr("content");
    var d = $("meta[property='og:description']").attr("content");
    var url = $("meta[property='og:url']").attr("content");
    var canonical = $("link[rel='canonical']").attr("href")
    var robots = $('meta[name="robots"]').attr("content");
    var h1 = $('meta[name="robots"]').attr("content");
    var h2= $('meta[name="robots"]').attr("content");
    var h3 = $('meta[name="robots"]').attr("content");
    var links = $('meta[name="robots"]').attr("content");
    h1 = $('h1')
    $(h1).each(function(i, h11){
        c1++;
    });
    h2 = $('h2')
      $(h2).each(function(i, h22){
          c2++;
      });
    h3 = $('h3')
    $(h3).each(function(i, h33){
          c3++;
    });

    links = $('a'); //jquery get all hyperlinks
      $(links).each(function(i, link){
          c++;
      });
    
     
axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='+url)
.then(resp => {
  //var j = resp.data;
  if (resp) {
    js = JSON.stringify(resp.data);
    js = JSON.parse(js);
    if (js)
    {
      console.log("id", js['loadingExperience'])
      data = {
        title: title, d: d, url: url, canonical: canonical, robots: robots, c1: c1,
        c2: c2, c3: c3, c: c, j: js
      };
        res.send({"data":data});
        
      
      
      
    }
    
    
  }
  
  
 
  
  
})
.catch(err => {
    // Handle Error Here
    console.error(err);
});
    
    
	    
      
      
      
     
  

	
  });
  //res.send({"data":data});

  
  
  
})




app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 9999;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
