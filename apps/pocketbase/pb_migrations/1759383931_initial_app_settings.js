/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    let settings = app.settings()

    settings.meta.appName = "ab98a221-4cef-403f-a384-84eb26761e2f.app-preview.com"
    settings.meta.appURL = "https://ab98a221-4cef-403f-a384-84eb26761e2f.app-preview.com/hcgi/platform"
    settings.meta.hideControls = true

    settings.logs.maxDays = 7
    settings.logs.minLevel = 8
    settings.logs.logIP = true
    
    settings.trustedProxy.headers = [
        "X-Real-IP",
        "X-Forwarded-For",
        "CF-Connecting-IP",
    ]

    app.save(settings)
})
