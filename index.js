const express = require("express")
const app = express()
const PORT = 8000;
var fs = require('fs');
const bcrypt = require('bcrypt')

const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }))
app.use(express.static(__dirname));

app.use(cookieParser());

// a variable to save a session
var session;
// for session
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:false,
  cookie: { maxAge: oneDay },
  resave: false
}));
// for logout
app.post('/logout',(req,res) => {
  req.session.destroy();
  console.log("session ended")
  res.json({session:false})
});


// getting users


app.get('/users', async(req, res) => {
  const userFile= await fs.readFileSync('./users.json','utf8')
       const users = await JSON.parse(userFile)
    res.json(users)
  })
// handling user signup
  app.post('/users', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      console.log(hashedPassword)
      // const _password = req.body.password; 
      const userFile= await fs.readFileSync('./users.json','utf8')
       const users = await JSON.parse(userFile)
      const user = { name: req.body.username, password: hashedPassword }
      
      users.push(user)

      fs.writeFileSync('./users.json',JSON.stringify(users));

      res.send()
    } catch {
      res.status(500).send()
    }
  })


  //handling user login
  app.post('/users/login', async (req, res) => {
    const userFile= await fs.readFileSync('./users.json','utf8')
    const users = await JSON.parse(userFile)
    const user = users.find(u => u.name === req.body.username)//for postman-> req.body.name
    console.log(user)
    
    if (user == null) {
      return res.status(400).json('Cannot find user')

    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {

        session=req.session;
        session.userid=req.body.username;
        console.log(session.userid);
        
         
       
      res.json({uid:session.userid})
      } else {
        res.json('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })


//max id
function GetMaxIdFromNotes(main_data_array) {
  let id = 0;
  for (let i = 0; i < main_data_array.length; i++) {
      id = main_data_array[i].id > id ? main_data_array[i].id : id;
  }
  return id;
}



// for adding notes
app.post('/',async(req,res)=>{
    // console.log(req.body);
    session=req.session;
    const noteFile = await fs.readFileSync('./config.json','utf8')
    const notes = await JSON.parse(noteFile)

    const userFile= await fs.readFileSync('./users.json','utf8')
    const users = await JSON.parse(userFile)
    Title=req.body.title;
    Body = req.body._content;
    id = GetMaxIdFromNotes(notes) + 1;
    const note = {
        "user":session.userid,
        "id": id,
        "title": Title,
        "_Content": Body,
        "date": new Date().toLocaleString() 
      }
      notes.push(note);
      
    if(note){

        
    
    fs.writeFileSync('./config.json',JSON.stringify(notes));
    res.json({session:session.userid})
    }
})
//for showing notes
app.get('/api',async(req,res)=>{
    const noteFile = await fs.readFileSync('./config.json','utf8')
    const notes = await JSON.parse(noteFile)

    // const userFile= await fs.readFileSync('./users.json','utf8')
    // const users = await JSON.parse(userFile)
      
    session = req.session;
    const newNotes = notes.filter(note=>note.user==session.userid)

    // console.log(session.userid);
    
    
    res.json(newNotes)
    
    res.end()
    
})
//for deleting notes
app.delete('/:id',async(req,res)=>{
    const noteFile = await fs.readFileSync('./config.json','utf8')
    const notes = await JSON.parse(noteFile)
    
    const delNote = notes.filter(note=>note.id!=req.params.id)
    
    fs.writeFileSync('./config.json',JSON.stringify(delNote))
})
//for updating notes
app.put('/:id/:t/:b',async(req,res)=>{
    const noteFile = await fs.readFileSync('./config.json','utf8')
    const notes = await JSON.parse(noteFile)
    Title=req.params.t;
    Body = req.params.b;

    // console.log(Title);
    // console.log(Body);
    const existing = notes.find(note=>note.id==req.params.id)

    if (existing) {
        existing.title = Title;
        existing._Content = Body;
        existing.date = new Date().toLocaleString();
    }
    
    fs.writeFileSync('./config.json',JSON.stringify(notes))
})



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

