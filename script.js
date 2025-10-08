// script.js

// Firebase references
const servicesRef = db.collection("services");
const flightsRef = db.collection("flights");

// Auth: تسجيل الدخول فقط ببريدك
auth.onAuthStateChanged((user) => {
  if(user){
    if(user.email !== "94.m.94.mn@gmail.com"){
      alert("ليس لديك صلاحية الدخول");
      window.location.href = "index.html"; // إعادة التوجيه للصفحة الرئيسية
    } else {
      loadServices();
      loadFlights();
    }
  } else {
    // تسجيل الدخول باستخدام نافذة Google
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
});

// تسجيل الخروج
function logout(){
  auth.signOut().then(()=> window.location.href="index.html");
}

// الخدمات
function loadServices(){
  const listAdmin = document.getElementById("servicesListAdmin");
  if(listAdmin) listAdmin.innerHTML = "";
  servicesRef.get().then(snapshot => {
    snapshot.forEach(doc=>{
      const liAdmin = document.createElement("li");
      liAdmin.textContent = doc.data().name;
      listAdmin.appendChild(liAdmin);
    });
  });
}

function addServiceAdmin(){
  const input = document.getElementById("newService");
  const value = input.value.trim();
  if(value){
    servicesRef.add({name:value}).then(()=>{ 
      loadServices(); 
      input.value=""; 
    });
  } else alert("اكتب الخدمة أولاً");
}

// الرحلات
function loadFlights(){
  const table = document.getElementById("flightsTable");
  if(!table) return;
  const tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";
  flightsRef.get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const data = doc.data();
      const row = tbody.insertRow();
      row.insertCell(0).textContent = data.flightNum;
      row.insertCell(1).textContent = data.destination;
      row.insertCell(2).textContent = data.arrival;
      row.insertCell(3).textContent = data.departure;
      row.insertCell(4).textContent = data.status;
    });
  });
}

function addFlightAdmin(){
  const flightNum = document.getElementById("flightNum").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const arrival = document.getElementById("arrival").value.trim();
  const departure = document.getElementById("departure").value.trim();
  const status = document.getElementById("status").value.trim();
  if(flightNum && destination && arrival && departure && status){
    flightsRef.add({flightNum,destination,arrival,departure,status})
    .then(()=>{
      loadFlights(); 
      document.getElementById("flightNum").value="";
      document.getElementById("destination").value="";
      document.getElementById("arrival").value="";
      document.getElementById("departure").value="";
      document.getElementById("status").value="";
    });
  } else alert("املأ جميع الحقول");
}
