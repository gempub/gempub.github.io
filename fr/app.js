import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getDatabase, ref, push} from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js'

// const auth = getAuth(firebaseApp);
// Detect auth state
/* onAuthStateChanged(auth, User => {
  if (User ≠ null) {
    console.log('logged in!');
  } else {
    console.log('No user!');
  }
}); */

// const db = getFirestore(firebaseApp);
// const todosCol = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

// import { initializeApp } from "/firebase";
// import { getAnalytics } from "/firebase/analytics";
// const analytics = getAnalytics(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//  Web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDBDOHPRPK1DUOlWy1j1wiVOfCoY0hzM2o",
  authDomain: "jlcamilweb.firebaseapp.com",
  projectId: "jlcamilweb",
  storageBucket: "jlcamilweb.appspot.com",
  messagingSenderId: "730451465946",
  appId: "1:730451465946:web:12cb8d2c781e0ce33e37e3"
});

const db = getDatabase(firebaseApp);
const dbref = ref(db, 'messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let reason = document.getElementById("reason").value;
  let message = document.getElementById("message").value;

  // Send values to saveNewMessage function
  saveNewMessage(firstname, lastname, email, reason, message);

  // Display Bootstrap alert box HTML
  var messageText = 'Merci de votre intérêt! Nous vous contacterons dans les plus brefs délais.';
  var alertBox = '<div class="alert alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
  // inject the alert to .messages div in our form
  $('#contactForm').find('.messages').html(alertBox);
  // empty the form ex:document.getElementById("contactForm").reset();
  $('#contactForm')[0].reset();
  
  // Hide alert after 5 seconds
  setTimeout(function(){
    $('#contactForm').find('.messages').html('');
  }, 10000);
};

// Save message to Firebase
function saveNewMessage(firstname, lastname, email, reason, message) {
  const data = ({
    firstname:firstname,
    lastname:lastname,
    email:email,
    reason:reason,
    message:message
  })
  push(dbref, data)
};