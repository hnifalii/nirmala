import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { DailyLog, DailyLogInput, LogData } from "../types/dailyLog";

export class DailyLogService {
  async getTargetData() {
    const user = auth.currentUser;
    if (!user) throw new Error("User tidak terautentikasi");

    const res = await getDoc(doc(db, "users", user.uid, "savingsGoal"));
    if (!res.exists()) throw new Error("Target data tidak ditemukan");

    const data = res.data();

    return {
      item: data.name,
      current: data.current,
      target: data.target,
    };
  }

  async getUserDailyLogs() {
    const user = auth.currentUser;
    if (!user) throw new Error("User tidak terautentikasi");

    const q = query(
      collection(db, "users", user.uid, "daily_logs"),
      orderBy("timestamp", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs;
  }

  async logDailyProgress(input: DailyLogInput) {
    const user = auth.currentUser;
    if (!user) throw new Error("User tidak terautentikasi");

    const todayDate = new Date().toISOString().split("T")[0];
    
    const userRef = doc(db, "users", user.uid);
    const logRef = doc(db, "users", user.uid, "daily_logs", todayDate);

    try {
      const cigarettesAvoided = Math.max(
        0,
        input.targetPerDay - input.cigarettesSmoked,
      );

      const moneySavedToday = cigarettesAvoided * input.costPerCigarette;

      let status = "relapse";
      let title = "Kamu merokok lebih banyak";
      let message = "Tetap berusaha ya.";

      if (input.cigarettesSmoked === 0) {
        status = "success";
        title = "Hebat! Hari ini kamu tidak merokok";
        message = "Pertahankan progresmu!";
      } else if (input.cigarettesSmoked < input.targetPerDay) {
        status = "partial_success";
        title = "Bagus! Hari ini kamu merokok lebih sedikit";
        message = "Sedikit demi sedikit lama-lama menjadi bukit.";
      } else {
        status = "relapse";
        title = "Kamu merokok lebih banyak dari biasanya";
      }

      const logData = {
        date: todayDate,
        timestamp: serverTimestamp(),
        cigarettesSmoked: input.cigarettesSmoked,
        targetPerDay: input.targetPerDay,
        moneySaved: moneySavedToday,
        status: status,
        notes: title,
      };

      await setDoc(logRef, logData, { merge: true });

      const streakUpdate = status === "success" ? increment(1) : 0;

      await updateDoc(userRef, {
        "savingsGoal.currentAmount": increment(moneySavedToday),
        "stats.totalCigarettesAvoided": increment(cigarettesAvoided),
        "stats.totalMoneySaved": increment(moneySavedToday),
        "stats.currentStreak": streakUpdate,
        lastCheckInUpdate: todayDate,
      });

      return {
        success: true,
        moneySaved: moneySavedToday,
        status: status,
        uiTitle: title,
        uiMessage: message,
      };
    } catch (err) {
      console.error("error log daily progress " + err);
      throw err;
    }
  }

  async hasLoggedToday() {
    const user = auth.currentUser;
    if (!user) return false;

    const todayDate = new Date().toISOString().split("T")[0];
    const logRef = doc(db, "users", user.uid, "daily_logs", todayDate);

    const logSnap = await getDoc(logRef);
    return logSnap.exists();
  }
}
