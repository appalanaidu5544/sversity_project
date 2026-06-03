/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n\n<p>\n  Thank you for joining us at {APP_NAME}.\n</p>\n\n<p>\n  Click on the button below to verify your email address.\n</p>\n\n<p>\n  <a\n    class=\"btn\"\n    href=\"http://localhost:3000/verify-email?token={TOKEN}\"\n    target=\"_blank\"\n    rel=\"noopener\"\n  >\n    Verify Email\n  </a>\n</p>\n\n<p>\n  Thanks,<br />\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
})
