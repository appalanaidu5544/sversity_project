/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "createRule": null,
    "listRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "createRule": "",
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
