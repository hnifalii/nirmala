import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ActivityLog } from "../types/activityLog";

export const ActivityService = {
  logCompletedActivity: async (activity: ActivityLog) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum terautentikasi");

    try {
      // 1. Simpan ke History (Sub-collection)
      // Path: users/{uid}/activity_logs/{autoId}
      const logRef = collection(db, 'users', user.uid, 'activity_logs');
      
      await addDoc(logRef, {
        ...activity,
        completedAt: serverTimestamp(),
        date: new Date().toISOString().split('T')[0] // Untuk filtering per hari
      });

      // 2. Tambah Poin / XP ke Profil User (Gamification)
      const userRef = doc(db, 'users', user.uid);
      
      await updateDoc(userRef, {
        'stats.totalActivitiesCompleted': increment(1)
      });

      return true;

    } catch (error) {
      console.error("Gagal menyimpan aktivitas:", error);
      throw error;
    }
  },
};
