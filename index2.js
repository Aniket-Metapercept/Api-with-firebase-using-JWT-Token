const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./basicapi-567f7-268f006dafe7.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// const docRef =  db.collection('users').doc('alovelace');

// docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

// const aTuringRef = db.collection('users').doc('aturing');

//  aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });


const create = async (obj,documents)=>{
    const mydata = await db.collection('users').doc(documents);
   mydata.set(obj)
   
}

obj = {
    'first': 'aniket',
    'middle': 'anil',
    'last': 'chavan',
    'born': 2001
}

create(obj,"sgrhjihgn")

obj2 = {
    'first': 'sam',
    'middle': 'jgeioh',
    'last': 'eaghie',
    'born': 9040
}
create(obj2,"jleahguiasehg")

const read = async ()=>{
    const snapshot = await db.collection('users').get();

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
    
    

    const oneData = await db.collection('users').doc('aturing').get();
    console.log(oneData.data())
} 

read()
// const users = db.collection('users').get();
// console.log(users)

const update = async ()=>{

    const liam = await
    db.collection('users').doc('aturing').update({
        born: 2012
    });

    const oneData = await db.collection('users').doc('aturing').get();
    console.log(oneData.data())

}

update()

const deleted = async ()=>{

    await db.collection('users').doc('alovelace').delete(); 
    console.log("Delete Successfully...")
}

deleted()