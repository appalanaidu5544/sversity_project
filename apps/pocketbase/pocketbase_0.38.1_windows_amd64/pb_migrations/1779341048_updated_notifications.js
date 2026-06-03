/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2301922722")

  // remove field
  collection.fields.removeById("text2363381545")

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 0,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "info",
      "success",
      "warning",
      "error"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2301922722")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2363381545",
    "max": 0,
    "min": 0,
    "name": "type",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select2363381545")

  return app.save(collection)
})
