const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err)=>{
    if(err){
      console.log('some error occur');
    }
  })
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
//   //next();
// });

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcome: 'Welcome to my website.'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page Detail'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error :'page not found'
  });
});

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle: 'Portfolio'
  });
});

app.listen(port,()=>{
  console.log(`server is on port ${port}`);
});
