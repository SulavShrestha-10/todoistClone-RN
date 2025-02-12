import { Colors } from "@/constants/Colors";
import migrations from "@/drizzle/migrations";
import { tokenCache } from "@/utils/cache";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack, useRouter, useSegments } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { addDummyData } from "@/utils/addDummyData";
import { Toaster } from "sonner-native";
import { ColorProvider } from "@/context/ColorContext";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
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
	const expoDB = openDatabaseSync("todos");
	const db = drizzle(expoDB);
	const { success, error } = useMigrations(db, migrations);
	console.log("🚀 ~ RootLayout ~ success:", success);
	console.log("🚀 ~ RootLayout ~ error:", error);

	useEffect(() => {
		if (!success) return;
		addDummyData(db);
	}, [success]);

	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<ClerkLoaded>
				<Suspense fallback={<Loading />}>
					<SQLiteProvider databaseName="todos" useSuspense options={{ enableChangeListener: true }}>
						<ColorProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<InitialLayout />
								<Toaster duration={2000} theme="light" />
							</GestureHandlerRootView>
						</ColorProvider>
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
