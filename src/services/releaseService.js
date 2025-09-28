import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';

const RELEASES_COLLECTION = 'releases';

// Get all releases
export const getAllReleases = async () => {
  try {
    const q = query(collection(db, RELEASES_COLLECTION), orderBy('releaseDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
};

// Get featured releases
export const getFeaturedReleases = async () => {
  try {
    const q = query(
      collection(db, RELEASES_COLLECTION), 
      where('featured', '==', true),
      orderBy('releaseDate', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching featured releases:', error);
    throw error;
  }
};

// Get most recent release
export const getMostRecentRelease = async () => {
  try {
    const q = query(collection(db, RELEASES_COLLECTION), orderBy('releaseDate', 'desc'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching most recent release:', error);
    throw error;
  }
};

// Add new release
export const addRelease = async (releaseData, albumArtFile) => {
  try {
    let albumArtUrl = '';
    
    // Upload album art if provided
    if (albumArtFile) {
      const storageRef = ref(storage, `album-art/${Date.now()}_${albumArtFile.name}`);
      const snapshot = await uploadBytes(storageRef, albumArtFile);
      albumArtUrl = await getDownloadURL(snapshot.ref);
    }

    const docRef = await addDoc(collection(db, RELEASES_COLLECTION), {
      ...releaseData,
      albumArt: albumArtUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding release:', error);
    throw error;
  }
};

// Update release
export const updateRelease = async (releaseId, releaseData, albumArtFile) => {
  try {
    let updateData = {
      ...releaseData,
      updatedAt: new Date()
    };

    // Upload new album art if provided
    if (albumArtFile) {
      const storageRef = ref(storage, `album-art/${Date.now()}_${albumArtFile.name}`);
      const snapshot = await uploadBytes(storageRef, albumArtFile);
      const albumArtUrl = await getDownloadURL(snapshot.ref);
      updateData.albumArt = albumArtUrl;
    }

    const docRef = doc(db, RELEASES_COLLECTION, releaseId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating release:', error);
    throw error;
  }
};

// Delete release
export const deleteRelease = async (releaseId) => {
  try {
    await deleteDoc(doc(db, RELEASES_COLLECTION, releaseId));
  } catch (error) {
    console.error('Error deleting release:', error);
    throw error;
  }
};
