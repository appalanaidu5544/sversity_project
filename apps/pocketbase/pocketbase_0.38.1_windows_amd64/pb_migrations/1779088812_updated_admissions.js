/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "listRule": "student_id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1933831191")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
