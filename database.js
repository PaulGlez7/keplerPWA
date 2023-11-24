const firebaseConfig = {
    apiKey: "AIzaSyDYIAeIw_4-w-IuhvbjcU2ew4ICzgPyRas",
    authDomain: "kepler-pwa.firebaseapp.com",
    databaseURL: "https://kepler-pwa-default-rtdb.firebaseio.com",
    projectId: "kepler-pwa",
    storageBucket: "kepler-pwa.appspot.com",
    messagingSenderId: "775124421441",
    appId: "1:775124421441:web:0980bc7f5ddeaaa4c3efc0"
  };

  firebase.initializeApp(firebaseConfig);

  var contactFormDB = firebase.database().ref("contactForm");

  document.getElementById("contactForm").addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var email = getElementVal("email");
  var message = getElementVal("message");

  saveMessages(name, email, message);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("contactForm").reset();

  }
  
  const saveMessages = (name, email, message) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      email: email,
      message: message,
    });
  };

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };