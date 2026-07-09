import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCo-CYydpivABwE3NFJOaM45yT-nO1f4OY",
    authDomain: "wngr-project.firebaseapp.com",
    databaseURL: "https://wngr-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wngr-project",
    storageBucket: "wngr-project.firebasestorage.app",
    messagingSenderId: "914234632159",
    appId: "1:914234632159:web:787cdddbfb6490650fc66a",
    measurementId: "G-CETR8CFN2R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  console.log("Fetching jrp-jobj-boq docs...");
  const q = collection(db, "jrp-jobj-boq");
  const snap = await getDocs(q);
  console.log("Total docs:", snap.size);
  if (snap.size > 0) {
    snap.docs.slice(0, 3).forEach((doc) => {
      console.log(`Doc ID: ${doc.id}`);
      console.log("Data:", JSON.stringify(doc.data(), null, 2));
    });
  } else {
    console.log("No documents in collection jrp-jobj-boq.");
  }
}

check()
  .then(() => {
    console.log("Done checking.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
