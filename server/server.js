const express =require('express');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');
const  mongoose =require('mongoose');
const e = require('express');
const bcrypt = require('bcrypt');
const salt = 10;

const CONNECTION_URL='mongodb+srv://Kickstart:Kickstart1234@cluster0.zjvof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const db= mongoose.connection;
mongoose.connect(CONNECTION_URL);

const userSchema =new  mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    permission:{
        type: Boolean,
        default: false,
        required: true
    }
})


const User =mongoose.model('users',userSchema);
/*
const someone = new User({'username':'ben bzaz','password':'ben tyaz'})
 someone.save().then(doc =>{
     console.log('success to save\n')
 }).catch(err =>{
     console.error(err)
 });


User.find({
    name:'ben bzaz'
}).then(doc=> {
    console.log(doc[0]._id.toString())
})

*/

const ProjectsSchema =new  mongoose.Schema({
 
    title: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    funded: {
        type:Number,
        required:true
    },
    target: {
        type:Number,
        required:true
    },
    final_date: {
        type:String,
        required:true
    },
    images: {
        type:Array,
        required:true
    }
    ,
    video:{
        type:String
    }

})
const Project =mongoose.model('projects',ProjectsSchema);

const elements = [
    {
        title:'save Ukriane',
        author:'Ben Putin',
        description:'putin is not realted to me, i just love him',
        funded: 30,
        target: 400000,
        final_date: '03/15/2022',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']

    },
    {
        title:'memory game',
        author:'Ben game',
        description:'i have a bad memory, please give me money',
        funded: 2,
        target: 5,
        final_date: '03/15/2023',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']

    },
    {
        title:'save BIBI',
        author:'Ben natanyaho',
        description:'we need more submarine....',
        funded: 450000,
        target: 4000000,
        final_date: '04/15/2022',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']
    },
    {
        title:'Axe for all',
        author:'Simon leviev',
        description:'please give me back my money ',
        funded: 300,
        target: 12000,
        final_date: '04/03/2022',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']

    },
    {
        title:'Google Sunglasses',
        author:'Elon musk',
        description:'by Tesla',
        funded: 4000,
        target: 4000,
        final_date:'3/28/2022',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']

    },
    {
        title:'Shawrma',
        author:'Tomer Graff',
        description:'good Shawarma for oncee',
        funded: 3,
        target: 4000,
        final_date:'02/03/2022',
        images:['https://www.allaboutbirds.org/guide/assets/photo/59954151-720px.jpg']

    }
]

mongoose.connection.on('connected', function () { 
    
    // To List all Collections of a Database
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            names.forEach(function(e,i,a) {
                console.log("----->", e.name);
            });
        }
    });
    
    // To Count Documents of a particular collection
    mongoose.connection.db.collection('projects').count(function(err, count) {
        console.dir(err);
        console.dir(count);
    
        if( count == 0) {
            for(let i = 0; i < elements.length;i++){
                let someone = new Project(elements[i])
             someone.save().then(doc =>{
             }).catch(err =>{
                 console.error(err)
             });
            }
            
        }
        else {
            console.log("Found Records : " + count);
        }
    });

    mongoose.connection.db.collection('users').count(function(err, count) {
        console.dir(err);
        console.dir(count);
    
        if( count == 0) {
         console.log('there is no records')
        }
        else {
            console.log("Found Records : " + count);
        }
    });

    });





app.use(cors());
app.use(express.json());

app.get('/:id',(req,res)=>{
    const { id } = req.params;
    let found = false;

    db.collection('projects').find({_id: ObjectId(id) }).toArray(function(err,docs){
        if(err) throw err;
        console.log('start of getid')
        console.log(docs[0]);
        res.json(docs[0])
       

    });
   

})

app.get('/',(req,res)=>{
    console.log('start of get!')
    const allProjects =  db.collection('projects').find().toArray(function(err,docs){
        if(err) throw err;
        res.json(docs);

    });
    
    console.log('success!')
})

app.post('/Register',(req,res)=>{
    console.log('post req');
    console.log(req.body)
    db.collection('users').find({ username: req.body.username }).toArray(function(err,docs){
    if(docs.length==0)
{
    let user = new User({username:req.body.username,
                             password: bcrypt.hashSync(req.body.password,salt) });


    user.save().then(doc =>{
    })
    res.json(req.body.username);
    
}
else
{
    res.status(404).json('user is already in');
}
});
    

})

app.post('/Login',(req,res)=>{
    console.log('post req loggin');
    db.collection('users').find({ username: req.body.username }).toArray(function(err,docs){
        if(err) throw err;
        console.log('start of username')
        console.log(req.body);
        if(docs.length == 0 )
            return res.json('no username')
        console.log(docs[0].password)
        console.log(bcrypt.hashSync(req.body.password,salt))
        const verify = bcrypt.compareSync(req.body.password,docs[0].password)
        console.log(verify)
        if(verify)
        {
            console.log('success');
            return res.json(req.body.username)
        }
        else
        {
            console.log('fail')
            return res.json(false)
        }
       

    });
})

app.post('/Project',(req,res)=>{
    console.log('post req');
    db.collection('projects').find({ title: req.body.title }).toArray(function(err,docs){
    if(docs.length==0)
{
    let project = new Project(req.body);

    console.log(project)
    project.save().then(doc =>{
    }).catch(err =>{
        res.json('user is already in');
    });
    console.log('here inside')
        res.status(200).json('project added!');
}
else
{
    res.status(404).json('project is already in');
}
});
})


app.delete("/delete", (req,res)=>{
    console.log(req.body.title);
    console.log('delete request')
    mongoose.connection.db.collection('projects').deleteOne({ title: req.body.title }, function(err,data) {
        if (!err) {
            console.log(data);

                console.log("member successfully deleted")
        }
        else {
                console.log("error")
        }
    });
    res.status(200).json("deleted");
});

app.put("/projects", (req,res)=>{
    console.log(req.body._id);
    console.log('pledge request')
    const proj = new Project(req.body);
    mongoose.connection.db.collection('projects').updateOne({ _id: ObjectId(req.body._id) }, proj).then
    ( ()=>{
        res.status(201).json('thanks for your Pledge')
    })
});



app.listen(3001);