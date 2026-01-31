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

  async getPatternData(period: "week" | "month" = "week"): Promise<PatternData> {
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
        chart: this.processChart(dailyLogs, period),
        insights: this.processInsights(panicLogs),
        stats: await this.processStats(dailyLogs),
      };
    } catch (error) {
      console.error("Error fetching pattern data:", error);
      return this.getDefaultData();
    }
  }

  private processHeatmap(logs: any[]): number[] {
    // 30-day grid representing the current month or last 30 days.
    // For specific requirement "Bulan Ini" (Current Month).
    const days = Array(30).fill(0);
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Filter logs for current month
    logs.forEach(log => {
      const logDate = new Date(log.date); // Assumed YYYY-MM-DD or ISO
      if (logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear) {
         const dayIndex = logDate.getDate() - 1; // 0-indexed
         if (dayIndex >= 0 && dayIndex < 30) {
             // 2 = Success (Hijau Tua), 1 = Relapse/Partial (Hijau Muda)
             // Default to success if not specified, verify logic
             days[dayIndex] = (log.status === "success") ? 2 : 1;
         }
      }
    });

    return days;
  }

  private processChart(logs: any[], period: "week" | "month"): { day: string; value: number }[] {
    const chartData = [];
    
    if (period === "week") {
         // Last 7 days
        const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayLabel = daysOfWeek[d.getDay()];

            const log = logs.find(l => l.date === dateStr);
            const value = log ? (log.moneySaved || 0) : 0; 
            chartData.push({ day: dayLabel, value: value });
        }
    } else {
        // "Bulan": Show last 4 weeks summary
        // Group by week (approx) or show last 30 days?
        // Limited space in chart (7 bars). Let's show last 4 weeks.
        for (let i = 3; i >= 0; i--) {
            const start = new Date();
            start.setDate(start.getDate() - (i * 7 + 6));
            const end = new Date();
            end.setDate(end.getDate() - (i * 7));
            
            const label = `Mg ${4-i}`; // Mg 1, Mg 2, etc.
            
            let weeklyTotal = 0;
            logs.forEach(l => {
                const lDate = new Date(l.date);
                if (lDate >= start && lDate <= end) {
                    weeklyTotal += (l.moneySaved || 0);
                }
            });
             chartData.push({ day: label, value: weeklyTotal });
        }
        // Fill remaining slots to maintain layout if needed, or just return 4 bars works too
    }

    return chartData;
  }

  private processInsights(panicLogs: any[]): { peakHour: string; mainTrigger: string } {
    if (panicLogs.length === 0) {
      return { peakHour: "--:--", mainTrigger: "Belum ada data" };
    }

    // REQUIREMENT: "Waktu Rawan" shows the LAST time panic button was used.
    // panicLogs are ordered by timestamp desc in panicService.ts getUserPanicLogs().
    // So panicLogs[0] is the latest.
    const lastLog = panicLogs[0];
    let lastTimeStr = "--:--";
    
    if (lastLog && lastLog.timestamp) {
        // Handle Firestore Timestamp or Date
        const date = lastLog.timestamp.toDate ? lastLog.timestamp.toDate() : new Date(lastLog.timestamp);
        lastTimeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    }

    // Main Trigger - Dummy Data as requested (since we don't collect actual triggers yet, only scavenger items)
    // "jika menggunakan panic button misal karena terindikasi keinginan untuk merokok"
    const DUMMY_TRIGGERS = [
        "Stres Pekerjaan", 
        "Waktu Senggang", 
        "Setelah Makan", 
        "Bangun Tidur", 
        "Melihat Orang Merokok", 
        "Karena keinginan untuk merokok",
        "Karena stres",
        "Bosan"
    ];
    // Return a random trigger
    const mainTrigger = DUMMY_TRIGGERS[Math.floor(Math.random() * DUMMY_TRIGGERS.length)];

    return { peakHour: lastTimeStr, mainTrigger };
  }

  private async processStats(logs: any[]): Promise<any> {
      // Calculate totals
      const totalMoney = logs.reduce((acc, curr) => acc + (curr.moneySaved || 0), 0);
      const totalCigarettes = logs.reduce((acc, curr) => acc + (curr.cigarettesAvoided || 0), 0);
      
      // Calculate Streak
      // Sort desc
      const sortedLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      let currentStreak = 0;
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const todayStr = today.toISOString().split('T')[0];
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      // Check if streak is active (logged today or yesterday)
      const hasLogToday = sortedLogs.some(l => l.date === todayStr && l.status === 'success');
      const hasLogYesterday = sortedLogs.some(l => l.date === yesterdayStr && l.status === 'success');
      
      if (!hasLogToday && !hasLogYesterday) {
          currentStreak = 0;
      } else {
          // Count backwards
          // Find start date (today or yesterday)
          let checkDate = new Date();
          if (!hasLogToday) {
               checkDate.setDate(checkDate.getDate() - 1); 
          }
          
          while (true) {
              const checkStr = checkDate.toISOString().split('T')[0];
              const log = sortedLogs.find(l => l.date === checkStr);
              
              if (log && log.status === 'success') {
                  currentStreak++;
                  checkDate.setDate(checkDate.getDate() - 1);
              } else {
                  break;
              }
          }
      }

      return {
          currentStreak,
          moneySaved: totalMoney,
          cigarettesAvoided: totalCigarettes
      };
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
