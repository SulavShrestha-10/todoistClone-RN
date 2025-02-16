import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="task/new" options={{ presentation: "modal" }} />
			<Stack.Screen name="task/[id]" options={{ presentation: "modal" }} />
		</Stack>
	);
};

export default Layout;
