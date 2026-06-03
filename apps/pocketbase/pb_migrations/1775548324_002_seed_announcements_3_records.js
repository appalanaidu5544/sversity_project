/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("announcements");

  const record0 = new Record(collection);
    record0.set("title", "Spring Semester Registration Open");
    record0.set("content", "Registration for the Spring 2024 semester is now open. Students must register by January 15, 2024. Please visit the registrar's office for more information.");
    record0.set("created_by", "admin_001");
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
    record1.set("title", "Campus Maintenance Notice");
    record1.set("content", "The library will be closed for maintenance from January 20-22, 2024. All other facilities remain open. We apologize for any inconvenience.");
    record1.set("created_by", "admin_002");
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
    record2.set("title", "Scholarship Opportunities Available");
    record2.set("content", "The university is offering several merit-based scholarships for the 2024-2025 academic year. Applications are due by March 1, 2024. Visit the financial aid office for details.");
    record2.set("created_by", "admin_001");
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