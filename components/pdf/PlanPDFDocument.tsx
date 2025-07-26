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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e293b",
    backgroundColor: "#f1f5f9",
    padding: 5,
    borderRadius: 3,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gridItem: {
    width: "48%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  col1: { width: "60%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "20%", textAlign: "center" },
  mealCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  mealTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#64748b",
    fontSize: 6,
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
