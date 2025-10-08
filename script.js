// script.js

// مراجع قواعد البيانات
const servicesRef = db.collection("services");
const flightsRef = db.collection("flights");

// ✅ مراقبة حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
  if (user) {
    const allowedEmail = "94.m.94.mn@gmail.com"; // البريد المصرح له بالدخول
    if (user.email !== allowedEmail) {
      alert("⚠️ ليس لديك صلاحية الدخول إلى لوحة التحكم.");
      auth.signOut().then(() => window.location.href = "index.html");
      return;
    }

    // المستخدم مصرح له ✅
    document.getElementById('adminContent').classList.add('show');
    loadServices();
    loadFlights();

  } else {
    // تسجيل الدخول عبر Google
    loginWithGoogle();
  }
});

// ✅ تسجيل الدخول
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => console.log("تم تسجيل الدخول:", result.user.email))
    .catch(err => {
      console.error("خطأ في تسجيل الدخول:", err);
      alert("حدث خطأ أثناء تسجيل الدخول، حاول مجددًا.");
    });
}

// ✅ تسجيل الخروج
function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

// ✅ تحميل الخدمات
function loadServices() {
  const listAdmin = document.getElementById("servicesListAdmin");
  if (!listAdmin) return;
  listAdmin.innerHTML = "";
  servicesRef.get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;
      listAdmin.appendChild(li);
    });
  });
}

// ✅ إضافة خدمة جديدة
function addServiceAdmin() {
  const input = document.getElementById("newService");
  const value = input.value.trim();
  if (value) {
    servicesRef.add({ name: value }).then(() => {
      loadServices();
      input.value = "";
    });
  } else {
    alert("🟡 اكتب اسم الخدمة أولاً");
  }
}

// ✅ تحميل الرحلات
function loadFlights() {
  const table = document.getElementById("flightsTable");
  if (!table) return;
  const tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = "";
  flightsRef.get().then(snapshot => {
    snapshot.forEach(doc => {
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

// ✅ إضافة رحلة جديدة
function addFlightAdmin() {
  const flightNum = document.getElementById("flightNum").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const arrival = document.getElementById("arrival").value.trim();
  const departure = document.getElementById("departure").value.trim();
  const status = document.getElementById("status").value.trim();

  if (flightNum && destination && arrival && departure && status) {
    flightsRef.add({ flightNum, destination, arrival, departure, status })
      .then(() => {
        loadFlights();
        document.getElementById("flightNum").value = "";
        document.getElementById("destination").value = "";
        document.getElementById("arrival").value = "";
        document.getElementById("departure").value = "";
        document.getElementById("status").value = "";
      });
  } else {
    alert("🟡 املأ جميع الحقول قبل الإضافة");
  }
}
