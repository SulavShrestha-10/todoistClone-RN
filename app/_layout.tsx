import { Colors } from "@/constants/Colors";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteProvider } from "expo-sqlite";

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
				<ActivityIndicator size="large" color={Colors.primary} />
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
				<Suspense fallback={<Loading />}>
					<SQLiteProvider databaseName="todos" useSuspense>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<InitialLayout />
							<Toaster duration={2000} theme="light" />
						</GestureHandlerRootView>
					</SQLiteProvider>
				</Suspense>
			</ClerkLoaded>
		</ClerkProvider>
	);
};
function Loading() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
}
export default RootLayout;
