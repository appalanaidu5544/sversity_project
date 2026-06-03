/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("students");

  const record0 = new Record(collection);
    record0.set("user_id", "student_001");
    record0.set("enrollment_number", "ENR001");
    record0.set("program", "Computer Science");
    record0.set("gpa", 3.85);
    record0.set("attendance_percentage", 95);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("user_id", "student_002");
    record1.set("enrollment_number", "ENR002");
    record1.set("program", "Business Administration");
    record1.set("gpa", 3.65);
    record1.set("attendance_percentage", 88);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("user_id", "student_003");
    record2.set("enrollment_number", "ENR003");
    record2.set("program", "Engineering");
    record2.set("gpa", 3.92);
    record2.set("attendance_percentage", 97);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})