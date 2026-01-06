import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(app)/index" options={{ title: 'Home' }} />
      </Stack>
    </>
  );
};

export default RootLayout;
