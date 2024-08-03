// BaseProvider.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, addDoc, updateDoc, arrayUnion, collection } from 'firebase/firestore';
import getEnvVars from '../../config';

// Get Firebase configuration based on environment
const { firebaseConfig } = getEnvVars();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const saveNewEvent = async (admin, name, expiration, type, size) => {
  try {
    // Reference to the "events" collection
    const eventsCollectionRef = collection(firestore, "events");
    // Add a new document with an auto-generated ID
    const eventDocRef = await addDoc(eventsCollectionRef, {
      name: name,
      expiration: expiration,
      type: type,
      size: size,
      admin: admin,
    });
    const eventID = eventDocRef.id;

    // Update the user's document with the new event ID
    await updateDoc(doc(firestore, "users", admin), {
      currentEvents: arrayUnion(eventID)
    }).catch(async (error) => {
      // Handle the case where the user document does not exist
      await setDoc(doc(firestore, "users", admin), {
        currentEvents: arrayUnion(eventID)
      });
    });

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
      return docSnap.data().currentEvents || []; // Return the list of event IDs or an empty array
    } else {
      console.log('No events.');
      return [];
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

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
    return null;
  }
};

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
  loadSpecificEvent
};
