// script.js

// Firebase references
const servicesRef = db.collection("services");
const flightsRef = db.collection("flights");

// Auth: سجل الدخول فقط ببريدك
auth.onAuthStateChanged((user) => {
  if(user){
    if(user.email !== "your-email@gmail.com"){
      alert("ليس لديك صلاحية الدخول");
      window.location.href = "index.html";
    } else {
      loadServices();
      loadFlights();
    }
  } else {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
});

// الخدمات
function loadServices(){
  const list = document.getElementById("servicesList");
  const listAdmin = document.getElementById("servicesListAdmin");
  list.innerHTML = "";
  if(listAdmin) listAdmin.innerHTML = "";
  servicesRef.get().then(snapshot => {
    snapshot.forEach(doc=>{
      const li = document.createElement("li");
      li.textContent = doc.data().name;
      list.appendChild(li);
      if(listAdmin){
        const liAdmin = document.createElement("li");
        liAdmin.textContent = doc.data().name;
        listAdmin.appendChild(liAdmin);
      }
    });
  });
}

function addServiceAdmin(){
  const input = document.getElementById("newService");
  const value = input.value.trim();
  if(value){
    servicesRef.add({name:value}).then(()=>{ loadServices(); input.value=""; });
  } else alert("اكتب الخدمة أولاً");
}

// الرحلات
function loadFlights(){
  const table = document.getElementById("flightsTable").getElementsByTagName('tbody')[0];
  table.innerHTML = "";
  flightsRef.get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const data = doc.data();
      const row = table.insertRow();
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
    .then(()=>{ loadFlights(); 
      document.getElementById("flightNum").value="";
      document.getElementById("destination").value="";
      document.getElementById("arrival").value="";
      document.getElementById("departure").value="";
      document.getElementById("status").value="";
    });
  } else alert("املأ جميع الحقول");
}

// بحث جدول الرحلات
function searchTable(){
  const input = document.getElementById("searchInput").value.toUpperCase();
  const table = document.getElementById("flightsTable");
  const tr = table.getElementsByTagName("tr");
  for (let i = 1; i < tr.length; i++) {
    let tdArr = tr[i].getElementsByTagName("td");
    let show = false;
    for(let j=0;j<tdArr.length;j++){
      if(tdArr[j].innerText.toUpperCase().indexOf(input) > -1){
        show = true; break;
      }
    }
    tr[i].style.display = show ? "" : "none";
  }
}
