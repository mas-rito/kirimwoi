import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { generateRandomString } from "../generateRandomString";

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

export async function fileUpload(
  file: any,
  user: any,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setFileUrl: React.Dispatch<React.SetStateAction<string>>
) {
  const metadata = {
    contentType: file.type,
  };

  // Upload file and metadata to the object 'files/' + file.name
  const storageRef = ref(storage, `files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  try {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);

      if (progress === 100) {
        const docId = generateRandomString(6);
        const data = {
          id: docId,
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: "",
          userName: user?.name,
          userEmail: user?.email,
          password: "",
          shortUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/${docId}`,
        };

        console.log(data);

        // Get download URL and set data in Firestore
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFileUrl(downloadURL);
            data.url = downloadURL;

            // Set data in Firestore
            setDoc(doc(firestore, "files", docId), data)
              .then(() => {
                console.log("Data saved successfully");
              })
              .catch((error) => {
                console.error("Error saving data to Firestore:", error);
              });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    });
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}

export async function saveDataFile(file: any, user: any, fileUrl: string) {
  console.log(user);

  const docId = generateRandomString(6);
  const data = {
    id: docId,
    name: file?.name,
    size: file?.size,
    type: file?.type,
    // url: fileUrl,
    userName: user?.name,
    userEmail: user?.email,
    password: "",
    // shortUrl: process.env.NEXT_PUBLIC_DOMAIN + "/" + docId,
  };

  await setDoc(doc(firestore, "files", docId), data)
    .then(() => {
      console.log("data saved");
    })
    .catch((error) => {
      console.log(error);
    });
}
