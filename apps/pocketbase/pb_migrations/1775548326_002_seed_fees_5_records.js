/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fees");

  const record0 = new Record(collection);
    record0.set("student_id", "student_001");
    record0.set("amount", 5000);
    record0.set("due_date", "2024-01-15");
    record0.set("status", "Paid");
    record0.set("payment_date", "2024-01-10");
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
    record1.set("student_id", "student_002");
    record1.set("amount", 5000);
    record1.set("due_date", "2024-01-15");
    record1.set("status", "Pending");
    record1.set("payment_date", null);
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
    record2.set("student_id", "student_003");
    record2.set("amount", 5000);
    record2.set("due_date", "2024-01-15");
    record2.set("status", "Paid");
    record2.set("payment_date", "2024-01-12");
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
    record3.set("student_id", "student_001");
    record3.set("amount", 2500);
    record3.set("due_date", "2024-02-15");
    record3.set("status", "Pending");
    record3.set("payment_date", null);
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
    record4.set("student_id", "student_002");
    record4.set("amount", 2500);
    record4.set("due_date", "2024-02-15");
    record4.set("status", "Overdue");
    record4.set("payment_date", null);
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