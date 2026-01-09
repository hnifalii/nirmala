import { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the main app flow
      // Use replace to prevent going back to splash
      router.replace("/(app)");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Decoration (Abstract Curves) */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo - Using splash-icon and tinting it white to match design */}
        <Image
          source={require("../../assets/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
          // Tint color ensures the logo is white if it's a compatible transparent PNG.
          // If the icon is full color, this might need removal, but the design calls for white.
          tintColor="#FFFFFF"
        />

        <Text style={styles.title}>Nirmala</Text>

        <Text style={styles.subtitle}>Kembali Murni, Bebas Adiksi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#749174", // Sage Green matched to design
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  // Top right large curve
  circle1: {
    position: "absolute",
    top: -height * 0.2,
    right: -width * 0.4,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    transform: [{ scaleX: 1.2 }],
  },
  // Middle right curve
  circle2: {
    position: "absolute",
    top: height * 0.1,
    right: -width * 0.5,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  // Bottom curve
  circle3: {
    position: "absolute",
    bottom: -height * 0.1,
    left: -width * 0.2,
    width: width * 1,
    height: width * 1,
    borderRadius: width * 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 0.5,
    // Font family would ideally be set here if a custom font was loaded
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
    fontWeight: "500",
  },
});

export default SplashScreen;
