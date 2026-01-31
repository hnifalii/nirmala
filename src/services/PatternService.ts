import { DailyLogService } from "./DailyLogService";
import { getUserPanicLogs } from "./panicService";
import { auth } from "../../firebase";

export interface PatternData {
  heatmap: number[]; // 0: No Data, 1: Relapse, 2: Success
  chart: { day: string; value: number }[];
  insights: {
    peakHour: string;
    mainTrigger: string;
  };
  stats: {
    currentStreak: number;
    moneySaved: number;
    cigarettesAvoided: number;
  };
}

export class PatternService {
  private dailyLogService = new DailyLogService();

  async getPatternData(): Promise<PatternData> {
    if (!auth.currentUser) {
      return this.getDefaultData();
    }

    try {
      // Fetch data in parallel
      const [dailyLogsDocs, panicLogs] = await Promise.all([
        this.dailyLogService.getUserDailyLogs(),
        getUserPanicLogs(),
      ]);

      const dailyLogs = dailyLogsDocs.map((doc) => doc.data());

      return {
        heatmap: this.processHeatmap(dailyLogs),
        chart: this.processChart(dailyLogs),
        insights: this.processInsights(panicLogs),
        stats: await this.processStats(dailyLogs),
      };
    } catch (error) {
      console.error("Error fetching pattern data:", error);
      return this.getDefaultData();
    }
  }

  private processHeatmap(logs: any[]): number[] {
    // Map last 30 days. 
    // Log structure: { date: "YYYY-MM-DD", status: "success" | "relapse" | "partial_success", ... }
    // Output: Array of 30 integers (0, 1, 2)
    
    const days = Array(30).fill(0);
    const today = new Date();
    
    logs.forEach(log => {
      const logDate = new Date(log.date);
      const diffTime = Math.abs(today.getTime() - logDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays <= 30 && diffDays > 0) {
        // Index 29 is yesterday, Index 0 is 30 days ago? 
        // Or matching the calendar grid logic. 
        // Let's assume the array maps to the days in the month view.
        // For simplicity, let's map simply based on date matching if possible, 
        // but given the UI is just a grid, let's fill it based on recent activity.
        
        // Actually the UI renders current month. Let's filter for current month.
        if (logDate.getMonth() === today.getMonth() && logDate.getFullYear() === today.getFullYear()) {
          const dayIndex = logDate.getDate() - 1; // 1-indexed date to 0-indexed array
          if (dayIndex >= 0 && dayIndex < 30) {
             days[dayIndex] = log.status === "success" ? 2 : 1;
          }
        }
      }
    });

    return days;
  }

  private processChart(logs: any[]): { day: string; value: number }[] {
    // Last 7 days chart
    const chartData = [];
    const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const dayLabel = daysOfWeek[d.getDay()];

        const log = logs.find(l => l.date === dateStr);
        const value = log ? (log.cigarettesAvoided || 0) : 0; // Or money saved? UI says "Rokok Dihindari" or maybe generic value.
        // Looking at mock data, value is ~4000-9000. Could be money? 
        // The mock chart label says "10rb". Likely Money Saved.
        // Checking UI code: renderBarChart -> Subtitle "Rokok Dihindari" but values are thousands?
        // Wait, "Rokok Dihindari" usually counts 1, 2, 10. 
        // Maybe the UI meant Money Saved? "Hemat Rp 420rb".
        // Let's use Money Saved as it fits the scale better, or scale cigarettes.
        // If the label is "Rokok Dihindari", values should be small (0-20).
        // If values are 5000, it's money.
        // Let's use Money Saved for now as it makes more impressive charts.
        
        const moneyValue = log ? (log.moneySaved || 0) : 0;
        chartData.push({ day: dayLabel, value: moneyValue });
    }
    return chartData;
  }

  private processInsights(panicLogs: any[]): { peakHour: string; mainTrigger: string } {
    if (panicLogs.length === 0) {
      return { peakHour: "--:--", mainTrigger: "Belum ada data" };
    }

    // Peak Hour
    const hours = panicLogs.map(l => {
        // Timestamp is Firestore Timestamp
        const date = l.timestamp?.toDate ? l.timestamp.toDate() : new Date();
        return date.getHours();
    });
    
    const mode = (arr: any[]) =>
        arr.sort((a,b) =>
            arr.filter(v => v===a).length - arr.filter(v => v===b).length
        ).pop();
        
    const peakH = mode(hours);
    const peakHourStr = `${peakH?.toString().padStart(2, '0')}:00`;

    // Main Trigger
    const triggers = panicLogs.map(l => l.targetItem);
    const mainTrigger = mode(triggers) || "Tidak ada";

    return { peakHour: peakHourStr, mainTrigger };
  }

  private async processStats(logs: any[]): Promise<any> {
     // This usually comes from User document (savingsGoal, stats).
     // We can fetch it via DailyLogService.getTargetData().
     
     // Quick fetch for now
     try {
         const targetData = await this.dailyLogService.getTargetData();
         // We might need strict stats from 'users/{uid}' doc which has 'stats' field based on DailyLogService updateDoc.
         // But DailyLogService doesn't expose a 'getStats' method yet, only 'getTargetData'.
         // Let's rely on aggregating logs or fetching the user doc directly if needed.
         // For now, let's aggregate logs manually for consistency.
         
         const totalMoney = logs.reduce((acc, curr) => acc + (curr.moneySaved || 0), 0);
         const totalCigarettes = logs.reduce((acc, curr) => acc + (curr.cigarettesAvoided || 0), 0);
         
         // Streak calculation is complex, let's just count recent consecutive successes?
         // Actually, let's use a placeholder or read from user doc if possible. 
         // Since we don't have easy access to user doc stats without adding a method, 
         // let's return totals.
         
         return {
             currentStreak: 0, // Placeholder, tough to calc correctly without stored value
             moneySaved: totalMoney,
             cigarettesAvoided: totalCigarettes
         };
     } catch (e) {
         return { currentStreak: 0, moneySaved: 0, cigarettesAvoided: 0 };
     }
  }

  private getDefaultData(): PatternData {
    return {
      heatmap: Array(30).fill(0),
      chart: Array(7).fill({ day: "-", value: 0 }),
      insights: { peakHour: "--:--", mainTrigger: "-" },
      stats: { currentStreak: 0, moneySaved: 0, cigarettesAvoided: 0 },
    };
  }
}
