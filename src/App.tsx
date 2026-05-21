import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "./components/Header";
import { StudentCard } from "./components/StudentCard";

type Student = {
  id: string;
  name: string;
  points: number;
};

const INITIAL_STUDENTS: Student[] = [
  { id: "1", name: "Pepito", points: -1 },
  { id: "2", name: "Lola", points: 2 },
  { id: "3", name: "Maripili", points: 5 },
];

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const addPoint = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points: s.points + 1 } : s)),
    );
  };

  return (
    <View style={styles.container}>
      <Header className="Dojo Lite Classroom" studentCount={students.length} />
      <ScrollView contentContainerStyle={styles.list}>
        {students.map((s) => (
          <StudentCard
            key={s.id}
            name={s.name}
            points={s.points}
            onAddPoint={() => addPoint(s.id)}
          />
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  list: {
    padding: 16,
  },
});
