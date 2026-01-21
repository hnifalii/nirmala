import { Tabs } from "expo-router";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import NirmalaIcon from "../../../assets/icons/nirmala-icon.svg";
import HomeIcon from "../../../assets/icons/streamline-plump_home-1-solid.svg";
import HomeOutlineIcon from "../../../assets/icons/streamline-plump_home-1-outline.svg";
import CelenganIcon from "../../../assets/icons/bottom-celengan.svg";
import CelenganOutlineIcon from "../../../assets/icons/bottom-celengan-outline.svg";
import PolaIcon from "../../../assets/icons/bottom-pola.svg";
import ProfilIcon from "../../../assets/icons/bottom-profile.svg";
import ProfilOutlineIcon from "../../../assets/icons/bottom-profile-outline.svg";
import MainIcon from "../../../assets/icons/bottom-main.svg";

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -60, // Move it higher to match the design (floating)
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 80, // Slightly larger
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FBA359",
        justifyContent: "center",
        alignItems: "center",
        // Glow effect
        shadowColor: "#FBA359",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 15,
      }}
    >
      <MainIcon width={50} height={50} color="white" />
    </View>
  </TouchableOpacity>
);

const TabIconContainer = ({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) => (
  <View
    style={{
      backgroundColor: focused ? "#E3EAD3" : "transparent",
      padding: 10,
      borderRadius: 30,
      marginBottom: 15,
    }}
  >
    {children}
  </View>
);

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#363B43", // dark (text color)
        tabBarInactiveTintColor: "#363B43", // dark (text color)
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 100,
          paddingTop: 25,
          paddingBottom: 40, // push labels up slightly
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontFamily: "Gilroy-Bold",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Hari Ini",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <TabIconContainer focused={true}>
                <HomeIcon width={size} height={size} color="#587B56" />
              </TabIconContainer>
            ) : (
              <TabIconContainer focused={false}>
                <HomeOutlineIcon
                  width={size}
                  height={size}
                  color="#587B56" // Green outline
                />
              </TabIconContainer>
            ),
        }}
      />
      <Tabs.Screen
        name="celengan"
        options={{
          tabBarLabel: "Celengan",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <TabIconContainer focused={focused}>
                <CelenganIcon width={size} height={size} color="#587B56" />
              </TabIconContainer>
            ) : (
              <TabIconContainer focused={focused}>
                <CelenganOutlineIcon
                  width={size}
                  height={size}
                  color="#587B56"
                />
              </TabIconContainer>
            ),
        }}
      />
      <Tabs.Screen
        name="panic_button"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="plus" size={30} color="#FFF" />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarLabel: () => null, // No label for middle button
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent navigation
            // TODO: Open modal or action
            console.log("Central button pressed");
          },
        })}
      />
      <Tabs.Screen
        name="pola"
        options={{
          tabBarLabel: "Pola",
          tabBarIcon: ({ size, focused }) => (
            <TabIconContainer focused={focused}>
              <PolaIcon width={size} height={size} color="#587B56" />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="kamu"
        options={{
          tabBarLabel: "Kamu",
          tabBarIcon: ({ size, focused }) =>
            focused ? (
              <TabIconContainer focused={true}>
                <ProfilOutlineIcon width={size} height={size} color="#587B56" />
              </TabIconContainer>
            ) : (
              <TabIconContainer focused={false}>
                <ProfilIcon width={size} height={size} color="#587B56" />
              </TabIconContainer>
            ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
