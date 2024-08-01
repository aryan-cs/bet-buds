function generateCode(length = 6) {
    const generatedCodes = new Set();

    //Load used codes
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

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var joinCode = '';
    const charactersLength = characters.length;

    // Generate codes until unique
    do {
        result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            joinCode += characters[randomIndex];
        }
    } while (generatedCodes.has(result));

    // Add the unique code to the set of generated codes
    generatedCodes.add(result);

    return joinCode;
}

export {generateCode};

// console.log(generateUniqueCode());
// console.log(generateUniqueCode());
// console.log(generateUniqueCode());
