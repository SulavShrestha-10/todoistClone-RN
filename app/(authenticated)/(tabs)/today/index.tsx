import Fab from "@/components/Fab";
import { todos } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
	const db = useSQLiteContext();
	const drizzleDB = drizzle(db);
	useDrizzleStudio(db);

	const { data } = useLiveQuery(drizzleDB.select().from(todos));
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
