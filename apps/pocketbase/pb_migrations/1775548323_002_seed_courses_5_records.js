/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("courses");

  const record0 = new Record(collection);
    record0.set("course_code", "CS101");
    record0.set("course_name", "Introduction to Programming");
    record0.set("credits", 3);
    record0.set("instructor_id", "faculty_001");
    record0.set("schedule", "MWF 9:00-10:00 AM");
    record0.set("syllabus", "Basic programming concepts and fundamentals");
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
    record1.set("course_code", "CS201");
    record1.set("course_name", "Data Structures");
    record1.set("credits", 4);
    record1.set("instructor_id", "faculty_002");
    record1.set("schedule", "TTh 10:00-11:30 AM");
    record1.set("syllabus", "Arrays, linked lists, trees, and graphs");
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
    record2.set("course_code", "BUS101");
    record2.set("course_name", "Business Fundamentals");
    record2.set("credits", 3);
    record2.set("instructor_id", "faculty_003");
    record2.set("schedule", "MWF 2:00-3:00 PM");
    record2.set("syllabus", "Introduction to business principles");
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("course_code", "ENG101");
    record3.set("course_name", "Engineering Mechanics");
    record3.set("credits", 4);
    record3.set("instructor_id", "faculty_004");
    record3.set("schedule", "TTh 1:00-2:30 PM");
    record3.set("syllabus", "Forces, motion, and equilibrium");
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("course_code", "MATH201");
    record4.set("course_name", "Calculus II");
    record4.set("credits", 4);
    record4.set("instructor_id", "faculty_005");
    record4.set("schedule", "MWF 11:00 AM-12:00 PM");
    record4.set("syllabus", "Integration, differential equations, and series");
  try {
    app.save(record4);
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