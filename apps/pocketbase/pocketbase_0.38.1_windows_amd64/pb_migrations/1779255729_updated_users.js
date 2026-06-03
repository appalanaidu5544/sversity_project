/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "<p>Hello,</p>\n\n<p>\n  Click on the button below to reset your password.\n</p>\n\n<p>\n  <a\n    class=\"btn\"\n    href=\"http://localhost:3000/reset-password?token={TOKEN}\"\n    target=\"_blank\"\n    rel=\"noopener\"\n  >\n    Reset password\n  </a>\n</p>\n\n<p>\n  <i>\n    If you didn't ask to reset your password,\n    you can ignore this email.\n  </i>\n</p>\n\n<p>\n  Thanks,<br />\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
})
