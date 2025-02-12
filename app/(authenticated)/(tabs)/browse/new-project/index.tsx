import { Colors, DEFAULT_PROJECT_COLOR } from "@/constants/Colors";
import { projects } from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColor } from "@/context/ColorContext";

const Page = () => {
	const [projectName, setProjectName] = useState("");
	const router = useRouter();
	const db = useSQLiteContext();
	const drizzleDB = drizzle(db);
	const { selectedColor } = useColor();
	const headerHeight = useHeaderHeight();

	const onCreateProject = async () => {
		await drizzleDB.insert(projects).values({
			name: projectName,
			color: selectedColor,
		});
		router.dismiss();
	};
	return (
		<View style={{ marginTop: headerHeight }}>
			<Stack.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity onPress={onCreateProject} disabled={projectName.length === 0}>
							<Text style={[styles.btnText, { color: projectName.length === 0 ? Colors.dark : Colors.primary }]}>
								Create
							</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.container}>
				<TextInput
					autoFocus
					placeholder="Project Name"
					value={projectName}
					onChangeText={setProjectName}
					style={styles.input}
				/>
				<Link href="/browse/new-project/color-select" asChild>
					<TouchableOpacity style={styles.colorBtn}>
						<Ionicons name="color-palette-outline" size={24} color={Colors.dark} />
						<Text style={styles.colorBtnText}>Color</Text>
						<View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
						<Ionicons name="chevron-forward" size={24} color={Colors.dark} />
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		borderRadius: 12,
		backgroundColor: Colors.background,
	},
	btnText: {
		fontSize: 16,
	},
	input: {
		borderWidth: StyleSheet.hairlineWidth,
		padding: 12,
		borderColor: Colors.lightBorder,
		fontSize: 16,
	},
	colorBtn: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		gap: 12,
	},
	colorBtnText: {
		fontSize: 16,
		flex: 1,
	},
	colorPreview: {
		width: 24,
		height: 24,
		borderRadius: 12,
	},
});
export default Page;
