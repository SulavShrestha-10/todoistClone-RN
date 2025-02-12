import Fab from "@/components/Fab";
import { Colors } from "@/constants/Colors";
import { projects } from "@/db/schema";
import { useAuth } from "@clerk/clerk-expo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ContextMenu from "zeego/context-menu";

const Page = () => {
	const { signOut } = useAuth();
	const router = useRouter();
	const db = useSQLiteContext();
	const drizzleDB = drizzle(db);
	const { data } = useLiveQuery(drizzleDB.select().from(projects), []);
	const onDeleteProject = async (id: number) => {
		await drizzleDB.delete(projects).where(eq(projects.id, id));
	};

	const onNewProject = async () => {
		router.push("/browse/new-project");
	};
	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>My Projects</Text>
					<TouchableOpacity onPress={onNewProject}>
						<FontAwesome6 name="add" size={24} color={Colors.dark} />
					</TouchableOpacity>
				</View>
				<FlatList
					data={data}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<ContextMenu.Root key={item.id}>
							<ContextMenu.Trigger>
								<TouchableOpacity style={styles.projectBtn}>
									<Text style={{ color: item.color }}>#</Text>
									<Text style={styles.projectBtnName}>{item.name}</Text>
								</TouchableOpacity>
							</ContextMenu.Trigger>
							<ContextMenu.Content>
								<ContextMenu.Item key="delete" onSelect={() => onDeleteProject(item.id)}>
									<ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
								</ContextMenu.Item>
							</ContextMenu.Content>
						</ContextMenu.Root>
					)}
					ItemSeparatorComponent={() => <View style={styles.seperator} />}
					ListFooterComponent={
						<TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
							<Text style={styles.signOutText}>Sign Out</Text>
						</TouchableOpacity>
					}
				/>
			</View>
			<Fab />
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 16,
		gap: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	signOutBtn: {
		padding: 12,
		backgroundColor: Colors.background,
		borderRadius: 8,
		marginTop: 12,
		alignItems: "center",
	},
	signOutText: {
		color: Colors.primary,
		fontSize: 16,
	},
	seperator: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.lightBorder,
	},
	projectBtn: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		gap: 12,
		backgroundColor: Colors.background,
	},
	projectBtnName: {
		fontSize: 16,
	},
});

export default Page;
