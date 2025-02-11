import Fab from "@/components/Fab";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
	return (
		<>
			<View style={styles.container}>
				<Text>Page</Text>
			</View>
			<Fab />
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
});

export default Page;
