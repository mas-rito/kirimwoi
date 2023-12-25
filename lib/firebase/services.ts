import {
  addDoc,
  collection,
  doc,
  getDoc,
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
  setError: (error: string) => void,
  setModal: ({
    isOpen: { status, url },
  }: {
    isOpen: { status: boolean; url: string };
  }) => void
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
        };

        // Get download URL and set data in Firestore
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            data.url = downloadURL;

            // Set data in Firestore
            setDoc(doc(firestore, "files", docId), data)
              .then(() => {
                setModal({
                  isOpen: {
                    status: true,
                    url: docId,
                  },
                });
              })
              .catch((error) => {
                setError(error);
              });
          })
          .catch((error) => {
            setError("Error during file upload: " + error);
          });
      }
    });
  } catch (error) {
    setError("Error during file upload: " + error);
  }
}

export async function savePassword({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  const docRef = doc(firestore, "files", id);
  await updateDoc(docRef, { password: password });
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveData(
  collectionName: string,
  email: string | null
) {
  const q = query(
    collection(firestore, collectionName),
    where("userEmail", "==", email)
  );

  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
