import { View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import React from "react";
import { Todo } from "@/types/interface";
import { Link } from "expo-router";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
interface TaskRowProps {
	task: Todo;
}

const TaskRow = ({ task }: TaskRowProps) => {
	const db = useSQLiteContext();
	const drizzleDB = drizzle(db);
	const markAsCompleted = async () => {
		await drizzleDB.update(todos).set({ completed: 1, date_completed: Date.now() }).where(eq(todos.id, task.id));
	};
	return (
		<View>
			<Link style={styles.container} href={{ pathname: `/task/[id]`, params: { id: task.id } }} asChild>
				<TouchableOpacity>
					<View style={styles.row}>
						<TouchableWithoutFeedback>
							<BouncyCheckbox
								textContainerStyle={{ display: "none" }}
								size={25}
								fillColor={task.project_color}
								unFillColor="#fff"
								isChecked={task.completed === 1}
								onPress={markAsCompleted}
							/>
						</TouchableWithoutFeedback>
						<Text>{task.name}</Text>
					</View>
					<Text style={styles.projectName}>{task.project_name}</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 12,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.lightBorder,
		backgroundColor: "#fff",
	},
	row: { flexDirection: "row", alignItems: "center", gap: 12 },
	projectName: { fontSize: 12, color: Colors.dark, alignSelf: "flex-end", marginTop: 4 },
});
export default TaskRow;
