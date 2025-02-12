import { Colors } from "@/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Layout = () => {
	const router = useRouter();

	return (
		<Stack screenOptions={{ headerShadowVisible: false }}>
			<Stack.Screen
				name="index"
				options={{
					title: "New Project",
					headerTitleAlign: "center",
					headerTransparent: true,
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.dismiss()} style={{ padding: 8 }}>
							<Text style={{ color: Colors.primary, fontSize: 16 }}>Cancel</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen name="color-select" options={{ title: "Color", headerTransparent: true }} />
		</Stack>
	);
};

export default Layout;
