# Diff Details

Date : 2025-07-01 15:47:21

Directory c:\\Users\\rohin\\Desktop\\mailer\\frontend

Total : 51 files,  3154 codes, 21 comments, 250 blanks, all 3425 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/.env](/backend/.env) | Properties | -5 | 0 | 0 | -5 |
| [backend/config/db.js](/backend/config/db.js) | JavaScript | -10 | 0 | 0 | -10 |
| [backend/controller/dashboard.js](/backend/controller/dashboard.js) | JavaScript | -21 | -4 | -1 | -26 |
| [backend/controller/login.js](/backend/controller/login.js) | JavaScript | -10 | 0 | -2 | -12 |
| [backend/controller/notification.js](/backend/controller/notification.js) | JavaScript | -17 | 0 | 0 | -17 |
| [backend/index.js](/backend/index.js) | JavaScript | -42 | -1 | -7 | -50 |
| [backend/mailer.js](/backend/mailer.js) | JavaScript | -30 | -1 | -5 | -36 |
| [backend/models/student.js](/backend/models/student.js) | JavaScript | -19 | 0 | 0 | -19 |
| [backend/models/studentLogin.js](/backend/models/studentLogin.js) | JavaScript | -16 | 0 | -2 | -18 |
| [backend/package-lock.json](/backend/package-lock.json) | JSON | -1,393 | 0 | -1 | -1,394 |
| [backend/package.json](/backend/package.json) | JSON | -25 | 0 | -1 | -26 |
| [backend/routes/dashboard.js](/backend/routes/dashboard.js) | JavaScript | -9 | -1 | -2 | -12 |
| [backend/routes/login.js](/backend/routes/login.js) | JavaScript | -5 | 0 | -1 | -6 |
| [backend/routes/notification.js](/backend/routes/notification.js) | JavaScript | -8 | 0 | -2 | -10 |
| [backend/services/dashboard.js](/backend/services/dashboard.js) | JavaScript | -152 | 0 | -12 | -164 |
| [backend/services/login.js](/backend/services/login.js) | JavaScript | -51 | 0 | -5 | -56 |
| [backend/services/notification.js](/backend/services/notification.js) | JavaScript | -78 | -1 | -14 | -93 |
| [backend/utils/generatePassword.js](/backend/utils/generatePassword.js) | JavaScript | -8 | 0 | -1 | -9 |
| [backend/utils/multerConfig.js](/backend/utils/multerConfig.js) | JavaScript | -19 | -2 | -5 | -26 |
| [frontend/README.md](/frontend/README.md) | Markdown | 7 | 0 | 6 | 13 |
| [frontend/eslint.config.js](/frontend/eslint.config.js) | JavaScript | 32 | 0 | 2 | 34 |
| [frontend/index.html](/frontend/index.html) | HTML | 13 | 0 | 1 | 14 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 3,097 | 0 | 1 | 3,098 |
| [frontend/package.json](/frontend/package.json) | JSON | 37 | 0 | 1 | 38 |
| [frontend/public/vite.svg](/frontend/public/vite.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/App.css](/frontend/src/App.css) | PostCSS | 4 | 0 | 1 | 5 |
| [frontend/src/App.jsx](/frontend/src/App.jsx) | JavaScript JSX | 48 | 1 | 4 | 53 |
| [frontend/src/Components/CCPD.jsx](/frontend/src/Components/CCPD.jsx) | JavaScript JSX | 44 | 0 | 7 | 51 |
| [frontend/src/Components/CCPD2.jsx](/frontend/src/Components/CCPD2.jsx) | JavaScript JSX | 73 | 0 | 8 | 81 |
| [frontend/src/Components/Dashboard.css](/frontend/src/Components/Dashboard.css) | PostCSS | 40 | 0 | 7 | 47 |
| [frontend/src/Components/Dashboard.jsx](/frontend/src/Components/Dashboard.jsx) | JavaScript JSX | 47 | 1 | 8 | 56 |
| [frontend/src/Components/Dashboard2.css](/frontend/src/Components/Dashboard2.css) | PostCSS | 158 | 10 | 27 | 195 |
| [frontend/src/Components/Dashboard2.jsx](/frontend/src/Components/Dashboard2.jsx) | JavaScript JSX | 122 | 1 | 19 | 142 |
| [frontend/src/Components/Footer.jsx](/frontend/src/Components/Footer.jsx) | JavaScript JSX | 11 | 0 | 2 | 13 |
| [frontend/src/Components/HODDashboard.jsx](/frontend/src/Components/HODDashboard.jsx) | JavaScript JSX | 94 | 0 | 14 | 108 |
| [frontend/src/Components/Header.css](/frontend/src/Components/Header.css) | PostCSS | 133 | 0 | 21 | 154 |
| [frontend/src/Components/Header.jsx](/frontend/src/Components/Header.jsx) | JavaScript JSX | 82 | 0 | 8 | 90 |
| [frontend/src/Components/Login.css](/frontend/src/Components/Login.css) | PostCSS | 163 | 7 | 26 | 196 |
| [frontend/src/Components/Login.jsx](/frontend/src/Components/Login.jsx) | JavaScript JSX | 127 | 2 | 16 | 145 |
| [frontend/src/Components/Main.css](/frontend/src/Components/Main.css) | PostCSS | 69 | 0 | 10 | 79 |
| [frontend/src/Components/Main.jsx](/frontend/src/Components/Main.jsx) | JavaScript JSX | 131 | 3 | 30 | 164 |
| [frontend/src/Components/Notification.css](/frontend/src/Components/Notification.css) | PostCSS | 174 | 3 | 31 | 208 |
| [frontend/src/Components/Notification.jsx](/frontend/src/Components/Notification.jsx) | JavaScript JSX | 129 | 2 | 22 | 153 |
| [frontend/src/Components/ProtectedRoute.jsx](/frontend/src/Components/ProtectedRoute.jsx) | JavaScript JSX | 15 | 0 | 6 | 21 |
| [frontend/src/Components/SendIDPass.jsx](/frontend/src/Components/SendIDPass.jsx) | JavaScript JSX | 57 | 0 | 9 | 66 |
| [frontend/src/Components/Support.css](/frontend/src/Components/Support.css) | PostCSS | 60 | 0 | 6 | 66 |
| [frontend/src/Components/Support.jsx](/frontend/src/Components/Support.jsx) | JavaScript JSX | 83 | 0 | 13 | 96 |
| [frontend/src/assets/react.svg](/frontend/src/assets/react.svg) | XML | 1 | 0 | 0 | 1 |
| [frontend/src/main.jsx](/frontend/src/main.jsx) | JavaScript JSX | 8 | 0 | 2 | 10 |
| [frontend/src/utils/getUserInfo.js](/frontend/src/utils/getUserInfo.js) | JavaScript | 7 | 0 | 1 | 8 |
| [frontend/vite.config.js](/frontend/vite.config.js) | JavaScript | 5 | 1 | 2 | 8 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details