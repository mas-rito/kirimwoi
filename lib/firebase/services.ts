import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function login(data: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    data.role = "regular";
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      callback({ status: true, data: data, message: "Login success" });
    });
  } else {
    data.role = "regular";
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({ status: true, data: data, message: "Login success" });
    });
  }
}

export async function fileUpload(file: any) {
  const metadata = {
    contentType: file.type,
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "files/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on("state_changed", (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  });
}
