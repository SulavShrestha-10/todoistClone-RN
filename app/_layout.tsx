import { Colors } from "@/constants/Colors";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
import { Toaster } from "sonner-native";
if (!publishableKey) {
	throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}
const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();
	useEffect(() => {
		if (!isLoaded) return;
		const inAuthGroup = segments[0] === "(authenticated)";
		if (isSignedIn && !inAuthGroup) {
			router.replace("/(authenticated)/(tabs)/today");
		} else if (!isSignedIn && inAuthGroup) {
			router.replace("/");
		}
	}, [isLoaded, isSignedIn]);

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}
	return (
		<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
			<Stack.Screen name="index" />
		</Stack>
	);
};

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<InitialLayout />
					<Toaster duration={2000} theme="light" />
				</GestureHandlerRootView>
			</ClerkLoaded>
		</ClerkProvider>
	);
};

export default RootLayout;
