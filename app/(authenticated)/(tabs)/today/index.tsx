import Fab from "@/components/Fab";
import { projects, todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { Todo } from "@/types/interface";
import TaskRow from "@/components/TaskRow";
import { Colors } from "@/constants/Colors";

interface Section {
	title: string;
	data: Todo[];
}

const Page = () => {
	const [listData, setListData] = useState<Section[]>([]);
	const db = useSQLiteContext();
	const drizzleDB = drizzle(db);
	useDrizzleStudio(db);

	const { data } = useLiveQuery(
		drizzleDB.select().from(todos).leftJoin(projects, eq(todos.project_id, projects.id)).where(eq(todos.completed, 0)),
	);
	useEffect(() => {
		const formatedData = data.map((item) => ({
			...item.todos,
			project_name: item.projects?.name,
			project_color: item.projects?.color,
		}));
		const groupedByDay = formatedData?.reduce((acc: { [key: string]: Todo[] }, task) => {
			const day = format(new Date(task.due_date || new Date()), "d MMM · eee");
			if (!acc[day]) {
				acc[day] = [];
			}
			acc[day].push(task);
			return acc;
		}, {});

		// Convert grouped data to sections array
		const listData: Section[] = Object.entries(groupedByDay || {}).map(([day, tasks]) => ({
			title: day,
			data: tasks,
		}));

		// Sort sections by date
		listData.sort((a, b) => {
			const dateA = new Date(a.data[0].due_date || new Date());
			const dateB = new Date(b.data[0].due_date || new Date());
			return dateA.getTime() - dateB.getTime();
		});
		setListData(listData);
	}, [data]);

	return (
		<>
			<View style={styles.container}>
				<SectionList
					contentInsetAdjustmentBehavior="automatic"
					renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
					sections={listData}
					renderItem={({ item }) => <TaskRow task={item} />}
				/>
			</View>
			<Fab />
		</>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	header: {
		fontSize: 16,
		backgroundColor: "#fff",
		fontWeight: "bold",
		padding: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.lightBorder,
	},
});

export default Page;
