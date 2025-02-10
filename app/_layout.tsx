import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import { Colors } from "@/constants/Colors";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
	throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}
const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const pathName = usePathname();
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
				<InitialLayout />
			</ClerkLoaded>
		</ClerkProvider>
	);
};

export default RootLayout;
