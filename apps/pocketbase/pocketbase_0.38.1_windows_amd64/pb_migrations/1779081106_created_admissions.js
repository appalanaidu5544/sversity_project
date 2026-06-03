/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text3687080900",
        "max": 0,
        "min": 0,
        "name": "full_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "exceptDomains": null,
        "help": "",
        "hidden": false,
        "id": "email3885137012",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "email"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text1146066909",
        "max": 0,
        "min": 0,
        "name": "phone",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text2465036164",
        "max": 0,
        "min": 0,
        "name": "program",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number2807245967",
        "max": null,
        "min": null,
        "name": "gpa",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "select2063623452",
        "maxSelect": 0,
        "name": "status",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Pending",
          "Under Review",
          "Accepted",
          "Rejected"
        ]
      },
      {
        "help": "",
        "hidden": false,
        "id": "file2729472648",
        "maxSelect": 0,
        "maxSize": 0,
        "mimeTypes": null,
        "name": "documents",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": null,
        "type": "file"
      }
    ],
    "id": "pbc_1933831191",
    "indexes": [],
    "listRule": null,
    "name": "admissions",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191");

  return app.delete(collection);
})
