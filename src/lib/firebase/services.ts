import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore"
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"

import { generateRandomString } from "../generateRandomString"
import app from "./init"

interface DataItem {
  id: string
  fileRef: string
}

const firestore = getFirestore(app)
const storage = getStorage(app)

export async function login(data: any, callback: Function) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  )

  const querySnapshot = await getDocs(q)
  const user = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  if (user.length > 0) {
    data.role = "regular"
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      callback({ status: true, data: data, message: "Login success" })
    })
  } else {
    data.role = "regular"
    await addDoc(collection(firestore, "users"), data).then(() => {
      callback({ status: true, data: data, message: "Login success" })
    })
  }
}

export async function fileUpload(
  file: any,
  user: any,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setError: (error: string) => void,
  setModal: Function
) {
  const metadata = {
    contentType: file.type,
  }

  // Upload file and metadata to the object 'files/' + file.name
  const storageRef = ref(storage, `files/${file.name}`)
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  try {
    const docId = generateRandomString(6)
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed", (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(progress)

      if (progress === 100) {
        const data = {
          id: docId,
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: "",
          fileRef: file?.name,
          userName: user?.name,
          userEmail: user?.email,
          password: "",
        }

        // Get download URL and set data in Firestore
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          data.url = downloadURL
          console.log(data)

          // Set data in Firestore
          setDoc(doc(firestore, "files", docId), data)
          setModal()
        })
      }
    })
    return docId
  } catch (error) {
    setError("Error during file upload, please try again")
  }
}

export async function savePassword({
  id,
  password,
  setIsLoading,
}: {
  id: string
  password: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const docRef = doc(firestore, "files", id)
  try {
    await updateDoc(docRef, { password: password })
    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
  }
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id))
  const data = snapshot.data()
  return data
}

export async function retrieveData(
  collectionName: string,
  email: string | null
) {
  const q = query(
    collection(firestore, collectionName),
    where("userEmail", "==", email)
  )

  const snapshot = await getDocs(q)

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return data
}

export async function deleteData(collectionName: string, item: DataItem[]) {
  const deletePromises: Promise<any>[] = []

  item.forEach((item) => {
    const storageRef = ref(storage, `files/${item.fileRef}`)
    const docRef = doc(firestore, collectionName, item.id)

    const storageDeletePromise = deleteObject(storageRef)
    const docDeletePromise = deleteDoc(docRef)
    deletePromises.push(storageDeletePromise, docDeletePromise)
  })

  try {
    await Promise.all(deletePromises)
    console.log("Data deleted successfully")
  } catch (error) {
    console.error("Error deleting data:", error)
  }
}
