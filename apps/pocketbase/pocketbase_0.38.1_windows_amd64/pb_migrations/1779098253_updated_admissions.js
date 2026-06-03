/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "createRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.role = \"student\""
  }, collection)

  return app.save(collection)
})
