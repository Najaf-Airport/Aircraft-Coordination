=== script.js ===
// Firebase references
const servicesRef = db.collection("services");
const flightsRef = db.collection("flights");

// التحقق من تسجيل الدخول
auth.onAuthStateChanged((user) => {
  if (user) {
    if (user.email !== "94.m.94.mn@gmail.com") {
      alert("ليس لديك صلاحية الدخول إلى لوحة التحكم.");
      auth.signOut().then(() => window.location.href="index.html");
      return;
    }
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminContent").classList.add("show");
    loadServices();
    loadFlights();
  } else {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("adminContent").classList.remove("show");
  }
});

function loginWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      if(result.user.email !== "94.m.94.mn@gmail.com"){
        alert("ليس لديك صلاحية الدخول إلى لوحة التحكم.");
        auth.signOut();
      } else {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("adminContent").classList.add("show");
        loadServices();
        loadFlights();
      }
    }).catch(err=>console.error("خطأ في تسجيل الدخول:", err));
}

function logout(){
  auth.signOut().then(()=>{
    document.getElementById("adminContent").classList.remove("show");
    document.getElementById("loginSection").style.display = "block";
  });
}

// الخدمات
function loadServices(){
  const listAdmin = document.getElementById("servicesListAdmin");
  if(!listAdmin) return;
  listAdmin.innerHTML = "";
  servicesRef.get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const li = document.createElement("li");
      li.textContent = doc.data().name;
      listAdmin.appendChild(li);
    });
  }).catch(err=>console.error("خطأ في تحميل الخدمات:", err));
}

function addServiceAdmin(){
  const input = document.getElementById("newService");
  const value = input.value.trim();
  if(value){
    servicesRef.add({name:value}).then(()=>{
      loadServices();
      input.value="";
    });
  } else alert("اكتب اسم الخدمة أولاً");
}

// الرحلات
function loadFlights(){
  const list = document.getElementById("flightsList");
  if(!list) return;
  list.innerHTML="";
  flightsRef.get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const data = doc.data();
      const item = document.createElement("li");
      item.textContent = `${data.flightNum} - ${data.destination} - ${data.status}`;
      list.appendChild(item);
    });
  }).catch(err=>console.error("خطأ في تحميل الرحلات:", err));
}

function addFlightAdmin(){
  const flightNum = document.getElementById("flightNum").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const arrival = document.getElementById("arrival").value.trim();
  const departure = document.getElementById("departure").value.trim();
  const status = document.getElementById("status").value.trim();
  if(flightNum && destination && arrival && departure && status){
    flightsRef.add({flightNum,destination,arrival,departure,status}).then(()=>{
      loadFlights();
      document.getElementById("flightNum").value="";
      document.getElementById("destination").value="";
      document.getElementById("arrival").value="";
      document.getElementById("departure").value="";
      document.getElementById("status").value="";
    });
  } else alert("املأ جميع الحقول قبل الإضافة");
}
