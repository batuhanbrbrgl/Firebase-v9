import {initializeApp} from 'firebase/app'
import{getFirestore,collection,getDocs,addDoc,deleteDoc,doc} from 'firebase/firestore'
import{getAuth,createUserWithEmailAndPassword} from 'Firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCofpFUWNW5Ht7REUKbiXw8P5RM9BbVW-c",
    authDomain: "fir-v9-3050d.firebaseapp.com",
    projectId: "fir-v9-3050d",
    storageBucket: "fir-v9-3050d.appspot.com",
    messagingSenderId: "164016998760",
    appId: "1:164016998760:web:b5bbfed45132db401f6edd"
  };

  initializeApp(firebaseConfig);

  const db=getFirestore();
  const auth=getAuth();



  const colRef=collection(db,'notlar');
  getDocs(colRef)
  .then(snapshot=>{
    // console.log(snapshot.docs);
    let notlar=[];
    snapshot.docs.forEach(doc=>{
        notlar.push({...doc.data(),id:doc.id})
    })
    console.log(notlar);
  })
  .catch(err=>{
    console.log(err.message);
  })



  const notEkleForm=document.querySelector('.add');
  notEkleForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addDoc(colRef,{
        notBaslik:notEkleForm.title.value,
        notAciklama:notEkleForm.info.value,
        oncelikDurum:notEkleForm.state.value
    })
    .then(()=>{
        notEkleForm.reset()
    })
  })


  const signupForm=document.querySelector('.signup')
  signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=signupForm.email.value;
    const parola=signupForm.parola.value;

    createUserWithEmailAndPassword(auth,email,parola)
    .then(cred=>{
        console.log("Üye Oluşturuldu",cred.user);
        signupForm.reset()
    })
    .catch(err=>{
        console.log(err.message)
    })
  })
