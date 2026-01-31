import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    withDelay, 
    withSpring, 
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { DailyLogService } from '../services/DailyLogService';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Components
import { AppText, Title } from '../components/Typography';

// Icons
import ToplesIcon from '../../assets/icons/toples.svg';
import KoinIcon from '../../assets/icons/koin.svg';
import Partikel1Icon from '../../assets/icons/partikel1.svg';
import Partikel2Icon from '../../assets/icons/partikel2.svg';
import MerokokLebihSedikitIcon from '../../assets/icons/merokok_lebih_sedikit.svg';
import MerokokLebihBanyakIcon from '../../assets/icons/merokok_lebih_banyak.svg';
import TidakMerokokIcon from '../../assets/icons/tidak_merokok.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';

const { width } = Dimensions.get('window');

const DAILY_LOG_SERVICE = new DailyLogService();

export default function CheckInScreen() {
    const router = useRouter();
    const [step, setStep] = useState<'ASK' | 'COUNT' | 'RESULT'>('ASK');
    const [didSmoke, setDidSmoke] = useState<boolean | null>(null);
    const [cigaretteCount, setCigaretteCount] = useState(0);
    const [loading, setLoading] = useState(false);
    
    // Result Data
    const [resultData, setResultData] = useState<{
        status: string;
        title: string;
        message: string;
        moneySaved: number;
    } | null>(null);

    // User Settings (fetched)
    const [userSettings, setUserSettings] = useState({
        targetPerDay: 10,
        costPerCigarette: 2000,
    });


    const [userName, setUserName] = useState('Alvin');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;
                
                // Fetch User Name & Settings
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const target = data.targetPerDay || 10;
                    const cost = data.costPerCigarette || 2000;
                    // Try to get name
                    const name = data.fullName || data.name || user.displayName || 'Alvin';
                    
                    setUserSettings({ targetPerDay: target, costPerCigarette: cost });
                    setUserName(name);
                }
            } catch (e) {
                console.error("Failed to fetch user settings", e);
            }
        };
        fetchUserData();
    }, []);

    const handleAnswerSmoke = (answer: boolean) => {
        setDidSmoke(answer);
        if (answer) {
            setStep('COUNT');
        } else {
            setCigaretteCount(0);
            handleSubmit(0);
        }
    };

    const handleSubmit = async (count: number) => {
        setLoading(true);
        try {
            const result = await DAILY_LOG_SERVICE.logDailyProgress({
                cigarettesSmoked: count,
                targetPerDay: userSettings.targetPerDay,
                costPerCigarette: userSettings.costPerCigarette,
            });
            
            setResultData({
                status: result.status,
                title: result.uiTitle,
                message: result.uiMessage,
                moneySaved: result.moneySaved,
            });
            setStep('RESULT');
        } catch (error) {
            console.error("Error logging daily progress", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#728C69]">
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="px-5 py-4 flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full border border-white justify-center items-center">
                         <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center mr-10">
                        <AppText weight="bold" className="text-white text-lg">Catatan Hari Ini</AppText>
                    </View>
                </View>

                {/* Content */}
                <View className="flex-1 justify-center items-center px-6">
                    {step === 'ASK' && (
                        <View className="items-center w-full">
                            <Title className="text-white text-center text-3xl mb-12 leading-tight">
                                Apakah hari ini kamu{'\n'}merokok?
                            </Title>
                            
                            <View className="flex-row items-center w-full border border-white rounded-[30px] h-16 relative">
                                {/* Divider */}
                                <View className="absolute left-1/2 w-[1px] h-6 bg-white top-5" />
                                
                                <TouchableOpacity 
                                    className="flex-1 h-full justify-center items-center"
                                    onPress={() => handleAnswerSmoke(true)}
                                >
                                    <AppText weight="bold" className="text-white text-lg">Ya</AppText>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    className="flex-1 h-full justify-center items-center"
                                    onPress={() => handleAnswerSmoke(false)}
                                >
                                    <AppText weight="bold" className="text-white text-lg">Tidak</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {step === 'COUNT' && (
                        <View className="items-center w-full">
                            <Title className="text-white text-center text-3xl mb-12 leading-tight">
                                Berapa batang rokok{'\n'}hari ini?
                            </Title>

                            <View className="flex-row items-center justify-center space-x-10 mb-20">
                                <TouchableOpacity 
                                    onPress={() => setCigaretteCount(Math.max(0, cigaretteCount - 1))}
                                >
                                    <AppText weight="bold" className="text-white text-4xl">-</AppText>
                                </TouchableOpacity>
                                
                                <AppText weight="bold" className="text-white text-6xl">
                                    {cigaretteCount}
                                </AppText>

                                <TouchableOpacity 
                                    onPress={() => setCigaretteCount(cigaretteCount + 1)}
                                >
                                    <AppText weight="bold" className="text-white text-4xl">+</AppText>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                disabled={loading}
                                onPress={() => handleSubmit(cigaretteCount)}
                                className="bg-white px-10 py-3 rounded-full"
                            >
                                <AppText weight="bold" className="text-[#728C69] text-lg">
                                    {loading ? "Menyimpan..." : "Lanjut"}
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 'RESULT' && resultData && (
                        <ResultView result={resultData} userName={userName} />
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}



function ResultView({ result, userName }: { result: { status: string, title: string, message: string, moneySaved: number }, userName: string }) {
    const router = useRouter();
    const [phase, setPhase] = useState<'STATUS' | 'SAVINGS' | 'MOTIVATION'>('STATUS');

    // Animation Values specific to Jar view
    const jarScale = useSharedValue(0.5);
    const jarOpacity = useSharedValue(0);
    const coinTranslateY = useSharedValue(0);
    const coinOpacity = useSharedValue(0);
    const particle1TranslateY = useSharedValue(0);
    const particle1TranslateX = useSharedValue(0); 
    const particle1Opacity = useSharedValue(0);
    const particle2TranslateY = useSharedValue(0);
    const particle2TranslateX = useSharedValue(0);
    const particle2Opacity = useSharedValue(0);

    useEffect(() => {
        let timeout1: NodeJS.Timeout;
        let timeout2: NodeJS.Timeout;

        if (phase === 'STATUS') {
            // Show Status for 3 seconds then go to Savings
            timeout1 = setTimeout(() => {
                setPhase('SAVINGS');
            }, 3000);
        } else if (phase === 'SAVINGS') {
            // Trigger Animation
            jarOpacity.value = withTiming(1, { duration: 500 });
            jarScale.value = withSpring(1);
            
            const delay = 600;
            // Coin moves Up from behind
            coinOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
            // Start from 0 (behind center) to -100 (Up)
            coinTranslateY.value = withDelay(delay, withSpring(-100, { damping: 10 }));

            // Particles
            particle1Opacity.value = withDelay(delay + 100, withTiming(1, { duration: 300 }));
            particle1TranslateY.value = withDelay(delay + 100, withSpring(-60));
            particle1TranslateX.value = withDelay(delay + 100, withSpring(-40));

            particle2Opacity.value = withDelay(delay + 100, withTiming(1, { duration: 300 }));
            particle2TranslateY.value = withDelay(delay + 100, withSpring(-50));
            particle2TranslateX.value = withDelay(delay + 100, withSpring(50));

            // After 4 seconds, go to Motivation
            timeout2 = setTimeout(() => {
                setPhase('MOTIVATION');
            }, 4000);
        } else if (phase === 'MOTIVATION') {
            // Final screen, maybe auto close or button
             setTimeout(() => {
                router.back();
            }, 3000);
        }

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [phase]);

    // Styles
    const jarStyle = useAnimatedStyle(() => ({
        transform: [{ scale: jarScale.value }],
        opacity: jarOpacity.value
    }));
    const coinStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: coinTranslateY.value }],
        opacity: coinOpacity.value,
        zIndex: -1 
    }));
    const particle1Style = useAnimatedStyle(() => ({
        transform: [{ translateX: particle1TranslateX.value }, { translateY: particle1TranslateY.value }],
        opacity: particle1Opacity.value
    }));
    const particle2Style = useAnimatedStyle(() => ({
        transform: [{ translateX: particle2TranslateX.value }, { translateY: particle2TranslateY.value }],
        opacity: particle2Opacity.value
    }));

    // Choose Icon for Status
    let StatusIcon = TidakMerokokIcon;
    if (result.status === 'relapse') {
        StatusIcon = MerokokLebihBanyakIcon;
    } else if (result.status === 'partial_success') {
        StatusIcon = MerokokLebihSedikitIcon;
    } else {
        StatusIcon = TidakMerokokIcon;
    }

    // Render Content based on Phase
    if (phase === 'STATUS') {
        return (
            <View className="items-center justify-center flex-1 w-full">
                <View className="mb-10 p-4 rounded-full bg-[#FFE05B] w-40 h-40 justify-center items-center">
                    <StatusIcon width={40} height={40} />
                </View>
                <Title className="text-white text-3xl text-center px-4 leading-tight mb-2">
                    {result.title}
                </Title>
                <AppText className="text-white text-lg text-center opacity-90">
                    {result.message}
                </AppText>
            </View>
        );
    }

    if (phase === 'SAVINGS') {
        return (
             <View className="items-center justify-center flex-1 w-full">
                 <View className="items-center justify-center mb-16 h-72 w-72 relative">
                    {/* Elements behind Jar */}
                    <Animated.View style={[particle1Style, { position: 'absolute' }]}>
                        <Partikel1Icon width={24} height={24} />
                    </Animated.View>
                    <Animated.View style={[particle2Style, { position: 'absolute' }]}>
                        <Partikel2Icon width={24} height={24} />
                    </Animated.View>
                     <Animated.View style={[coinStyle, { position: 'absolute' }]}>
                        <KoinIcon width={50} height={50} />
                    </Animated.View>

                    {/* JAR */}
                    <Animated.View style={[jarStyle, { zIndex: 10 }]}>
                        <ToplesIcon width={160} height={160} />
                    </Animated.View>
                 </View>

                <Title className="text-white text-5xl font-bold mb-3">
                    +Rp {result.moneySaved.toLocaleString('id-ID')}
                </Title>
                <AppText className="text-white text-base opacity-80">
                    {result.moneySaved > 0 ? "Tabunganmu bertambah!" : "Belum ada tambahan tabungan"}
                </AppText>
            </View>
        );
    }

    if (phase === 'MOTIVATION') {
        return (
            <View className="items-center justify-center flex-1 w-full">
                <Title className="text-white text-4xl text-center font-bold px-5">
                    Tidak apa-apa, {userName}
                </Title>
            </View>
        );
    }

    return null;
}

