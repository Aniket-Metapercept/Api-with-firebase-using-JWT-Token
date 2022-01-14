const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../basicapi-567f7-268f006dafe7.json');
const sendMail = require('../email');

const jwt = require('jsonwebtoken')


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



getAllUser = async (req,res)=>{

    const snapshot = await db.collection('users').get();
    let data = []

    snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data());
      data.push(doc.data()) 
    });
    user = req.user.username

    res.json({data,user})
 
}

createUser = async (req,res)=>{  /// id required...
    const mydata = await db.collection('users').doc(req.body.id);
    mydata.set({
        'first': req.body.first,
        'middle': req.body.middle,
        'last': req.body.last,
        'born': req.body.born,
        'email':req.body.email,
        'password':req.body.password
    })
    await sendMail(req.body.email)
    
    const token = jwt.sign({username:req.body.first},process.env.SECRET_KEY,{expiresIn:"3d"})

    res.json({msg:"Data created Successfull just check you mail ..!",token})
   
}

const login = async (req,res)=>{  // where
    const {email, password} = req.body

    if(!email || !password){
        res.send("Please provide email password")
        return
    }

    data = []
    const user = await db.collection('users').where('email', '==',email).where('password','==',password).get(); // it will find user by email and password
    user.forEach((doc) => {
        //   console.log(doc.id, '=>', doc.data());
          data.push(doc.data()) 
        });
    // console.log(data[0].first)
    console.log(req.body.id)
    const token = jwt.sign({username:data[0].first},process.env.SECRET_KEY,{expiresIn:"3d"}) // creating a token 
    res.json({msg:"You login Successfully ..!",token})
}



getUserById = async (req,res)=>{
    
    const oneData = await db.collection('users').doc(req.params.id).get();

    res.send(oneData.data())
}


updateUserById = async (req,res)=>{

    await db.collection('users').doc(req.params.id).update({
        'first': req.body.first,
        'middle': req.body.middle,
        'last': req.body.last,
        'born': req.body.born,
        'email':req.body.email || "",
        'password':req.body.password || ""
    });

    res.send("Data Updated Successfully ..!")
} 


deleteUserById = async (req,res)=>{

    await db.collection('users').doc(req.params.id).delete(); 
    res.send("Delete Successfully...")
}


module.exports = {
    getAllUser,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById,
    login
}