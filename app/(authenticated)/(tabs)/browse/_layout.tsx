import MoreButton from "@/components/MoreButton";
import { Colors } from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Layout = () => {
	return (
		<Stack screenOptions={{ headerShadowVisible: false, contentStyle: { backgroundColor: Colors.backgroundAlt } }}>
			<Stack.Screen
				name="index"
				options={{
					title: "Browse",
					headerLeft: () => <HeaderLeft />,
					headerRight: () => <HeaderRight />,
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	);
};

const HeaderLeft = () => {
	const { user } = useUser();
	return <Image source={{ uri: user?.imageUrl }} style={{ height: 32, width: 32, borderRadius: 16 }} />;
};
const HeaderRight = () => {
	// ! Need to add Link to route to a page
	return <FontAwesome6 name="gear" size={24} color="black" />;
};

export default Layout;
