import MoreButton from "@/components/MoreButton";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
	return (
		<Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: Colors.background } }}>
			<Stack.Screen
				name="index"
				options={{
					title: "Search",
					headerTitleStyle: {
						fontSize: 36,
						fontWeight: "bold",
					},
					headerSearchBarOptions: { placeholder: "Tasks, Projects and More", tintColor: Colors.primary },
				}}
			/>
		</Stack>
	);
};

export default Layout;
