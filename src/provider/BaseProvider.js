// BaseProvider.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, collection, getCountFromServer } from 'firebase/firestore';
import getEnvVars from '../../config';

// Get Firebase configuration based on environment
const { firebaseConfig } = getEnvVars();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const saveNewEvent = async (admin, name, expiration, type, size, code) => {
  try {
    await setDoc(doc(firestore, "events", (code)), {
      name: name,
      expiration: expiration,
      type: type,
      size: size,
      admin: admin,
      code: code
    });

    await updateDoc(doc(firestore, "users", admin), {
      currentEvents: arrayUnion(code)
    }).catch((error) => {
      setDoc(doc(firestore, "users", admin), {
        currentEvents: arrayUnion(code)
      })
    })
    console.log('Data written successfully');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

const loadUsersEvents = async (admin) => {

  try {
    const docRef = doc(firestore, "users", admin);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No events.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }

}

const loadSpecificEvent = async (id) => {

  try {
    const docRef = doc(firestore, "events", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('Event not found.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }

}

const getNumEvents = async () => {

  try {
    const collectionRef = collection(firestore, "events");
    const snapshot = await getCountFromServer(collectionRef);
    var count = snapshot.data().count;
    return parseInt(count);
  } catch (error) {
    console.error('Error reading data:', error);
  }

}
// // Function to write data to Firestore
// const writeData = async (collection, document, data) => {
//   try {
//     await setDoc(doc(firestore, collection, document), data);
//     console.log('Data written successfully');
//   } catch (error) {
//     console.error('Error writing data:', error);
//   }
// };

// // Function to read data from Firestore
// const readData = async (collection, document) => {
  // try {
  //   const docRef = doc(firestore, collection, document);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     return docSnap.data();
  //   } else {
  //     console.log('No data available');
  //     return null;
  //   }
  // } catch (error) {
  //   console.error('Error reading data:', error);
  // }
// };

// Example usage of auth state observer
const observeAuthState = (callback) => {
  auth.onAuthStateChanged(user => {
    callback(user);
  });
};

// Export the functions
export {
  saveNewEvent,
  loadUsersEvents,
  loadSpecificEvent,
  getNumEvents
};
