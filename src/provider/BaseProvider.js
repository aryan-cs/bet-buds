// BaseProvider.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, addDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, collection, getCountFromServer, deleteDoc, arrayRemove  } from 'firebase/firestore';
import getEnvVars from '../../config';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { generateCode } from "../scripts/GenerateJoinCode"

// Get Firebase configuration based on environment
const { firebaseConfig } = getEnvVars();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const saveNewEvent = async (admin, name, startTime, expiration, type, size, code) => {
  try {
    await setDoc(doc(firestore, "events", (code)), {
      name: name,
      startTime: startTime, // Save the start time
      expiration: expiration,
      type: type,
      size: size,
      admin: admin,
      members: [],
    });

    await updateDoc(doc(firestore, "users", admin), {
      currentEvents: arrayUnion(code)
    }).catch((error) => {
      setDoc(doc(firestore, "users", admin), {
        currentEvents: arrayUnion(code)
      });
    });
    console.log('Data written successfully');
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    // Reference to the event document
    const eventDocRef = doc(firestore, "events", eventId);

    // Retrieve the event document to get the members and admin
    const eventDoc = await getDoc(eventDocRef);

    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const members = eventData.members || [];

      // Add the admin to the members list if not already included
      if (eventData.admin && !members.includes(eventData.admin)) {
        members.push(eventData.admin);
      }

      // Remove the event ID from each user's 'currentEvents' list
      await Promise.all(members.map(async (memberId) => {
        const userDocRef = doc(firestore, "users", memberId);
        await updateDoc(userDocRef, {
          currentEvents: arrayRemove(eventId)
        });
      }));

      // Now delete the event document
      await deleteDoc(eventDocRef);

      console.log('Event deleted successfully');
    } else {
      console.log('Event does not exist');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error; // Rethrow to handle in the caller
  }
};

const removeEvent = async (userId, eventId) => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      currentEvents: arrayRemove(eventId),
    });
  } catch (error) {
    console.error('Error removing event from user:', error);
    throw error;
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
      console.log(id)
      console.log('Event not found.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

const getNumEvents = async () => {
  try {
    const docRef = doc(firestore, "events", "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().eventsCreated;
    } else {
      console.log('Event history data not found');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

const incrementNumEvents = async () => {
  try {
    const docRef = doc(firestore, "events", "info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      count =  parseInt(docSnap.data().eventsCreated) + 1;
      await setDoc(doc(firestore, "events", "info"), {
        eventsCreated: count
      }); 
    } else {
      console.log('Event history data not found');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}


async function addNewMember(eventID, memberID) {
  console.log(eventID)
  try {
    const docRef = doc(firestore, "events", eventID.toUpperCase());
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(doc(firestore, "events", eventID), {
        members: arrayUnion(memberID),
      }).then(
        await updateDoc(doc(firestore, "users", memberID), {
          currentEvents: arrayUnion(eventID)
        }).catch((error) => {
          setDoc(doc(firestore, "users", memberID), {
            currentEvents: arrayUnion(eventID)
          });
        }),
        console.log('Data written successfully'));
    } else {
      console.log('Unable to add user to event.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

const getDisplayName = async (admin) => {
  try {
    const docRef = doc(firestore, "users", admin);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().displayName;
    } else {
      console.log('No display name saved.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

const saveDisplayName = async (userId, displayName) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) { await updateDoc(userRef, { displayName: displayName }); }
    else { await setDoc(userRef, { displayName: displayName });
    }
    console.log("Display name saved successfully.");
  } catch (error) {
    console.error("Error saving display name:", error);
  }
};

const observeAuthState = (callback) => {
  auth.onAuthStateChanged(user => {
    callback(user);
  });
};

const loadEventEntries = async (eventid) => {
  try {
    const docRef = doc(firestore, "events", eventid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      members = docSnap.data().members;
      members.push(docSnap.data().admin);
      return members;
    } else {
      console.log('Event entry data not found');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
}

const loadSpecificEntry = async (id) => {
  try {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('Entries not found.');
      return null;
    }
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

const loadBetEntries = async (id) => {
  try {
   
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

const saveNewBet = async (memberId, name, difficulty, eventId) => {
  console.log(eventId);
  try {
    const docRef = doc(firestore, "events", eventId.toUpperCase());
    const docSnap = await getDoc(docRef);

    const docRef2 = doc(firestore, "users", memberId);
    const docSnap2 = await getDoc(docRef2);

    var storedId = "";

    if(docSnap.exists()){
      await addDoc(collection(firestore, "events", eventId, "bets"), { //edit this path
        betName: name,
        difficulty: difficulty
      }).then(docRef => {
        storedId = docRef.id;
      })
    } else {
        console.log('Unable to add bet to event.');
        return null;
      }

    if(docSnap2.exists()) {
      await setDoc(doc(firestore, "users", memberId), { 
        bets: arrayUnion(doc(firestore, "events", eventId, "bets", storedId)),
      });
    } else {
      console.log('Unable to add bet to member.');
      return null;
    }
    
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// Export the functions
export {
  saveNewEvent,
  loadUsersEvents,
  loadSpecificEvent,
  getNumEvents,
  incrementNumEvents,
  addNewMember,
  getDisplayName,
  saveDisplayName,
  loadEventEntries,
  loadSpecificEntry,
  loadBetEntries,
  deleteEvent,
  removeEvent,
  saveNewBet
};
