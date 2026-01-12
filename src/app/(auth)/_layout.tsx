// import { Slot } from "expo-router";
// import { View } from "react-native";
// import { StatusBar } from "expo-status-bar";

// export default function AuthLayout() {
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar style="light" />
//       <Slot />
//     </View>
//   );
// }

import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
