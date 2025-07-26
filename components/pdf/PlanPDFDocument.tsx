"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Plan } from "@/lib/types";

// Register fonts (optional)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // regular
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf",
      fontWeight: 500,
    }, // bold
  ],
});

// Create smaller and more visually appealing styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    padding: 18,
    fontFamily: "Roboto",
    fontSize: 8.5,
    color: "#22223b",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1.2,
    borderBottomColor: "#2563eb",
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1e293b",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 2,
    fontWeight: 400,
  },
  section: {
    marginBottom: 13,
  },
  sectionHeader: {
    fontSize: 10.5,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1e293b",
    backgroundColor: "#e0e7ef",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 2,
    letterSpacing: 0.1,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 6,
  },
  gridItem: {
    width: "48%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    color: "white",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  col1: { width: "60%", fontSize: 8 },
  col2: { width: "20%", textAlign: "center", fontSize: 8 },
  col3: { width: "20%", textAlign: "center", fontSize: 8 },
  mealCard: {
    backgroundColor: "#f3f6fa",
    borderRadius: 3,
    padding: 7,
    marginBottom: 7,
    borderWidth: 0.5,
    borderColor: "#e0e7ef",
  },
  mealTitle: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 9,
    color: "#22223b",
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    textAlign: "center",
    color: "#64748b",
    fontSize: 5.5,
    letterSpacing: 0.2,
  },
});

const PlanPDFDocument = ({ plan }: { plan: Plan }) => {
  // Format creation date
  const creationDate = format(new Date(plan.createdAt!), "MMM dd, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{plan.name}</Text>
            <Text style={styles.subtitle}>Created on {creationDate}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text>Fitness Level: {plan.fitnessLevel}</Text>
            <Text>Goal: {plan.fitnessGoal}</Text>
            <Text>Workout Days: {plan.workoutDays}/week</Text>
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>Age: {plan.age} years</Text>
              <Text>Height: {plan.height} cm</Text>
              <Text>Weight: {plan.weight} kg</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>
                Dietary Restrictions: {plan.dietaryRestrictions || "None"}
              </Text>
              <Text>Injuries: {plan.injuries || "None"}</Text>
              <Text>
                Equipment: {plan.equipmentAccess || "Standard gym equipment"}
              </Text>
            </View>
          </View>
        </View>

        {/* Workout Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Workout Schedule</Text>
          <Text>Workout Days: {plan.workoutPlan.schedule.join(", ")}</Text>

          {plan.workoutPlan.exercises.map((day, index) => (
            <View key={index} style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                {day.day}:
              </Text>

              {/* Exercise Table */}
              <View style={styles.tableHeader}>
                <Text style={styles.col1}>Exercise</Text>
                <Text style={styles.col2}>Sets</Text>
                <Text style={styles.col3}>Reps</Text>
              </View>

              {day.routines.map((exercise, exIndex) => (
                <View key={exIndex} style={styles.tableRow}>
                  <Text style={styles.col1}>{exercise.name}</Text>
                  <Text style={styles.col2}>{exercise.sets}</Text>
                  <Text style={styles.col3}>{exercise.reps}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Diet Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Nutrition Plan</Text>
          <Text style={{ marginBottom: 10 }}>
            Daily Calories: {plan.dietPlan.dailyCalories} kcal | Protein:{" "}
            {plan.dietPlan.macros.protein} | Carbs: {plan.dietPlan.macros.carbs}{" "}
            | Fats: {plan.dietPlan.macros.fats}
          </Text>

          {plan.dietPlan.meals.map((meal, index) => (
            <View key={index} style={styles.mealCard}>
              <Text style={styles.mealTitle}>{meal.name}</Text>
              {meal.foods.map((food, foodIndex) => (
                <Text key={foodIndex}>• {food}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by Fitness App • {creationDate}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PlanPDFDocument;
