# Nodejs Demo crud project
## Installation and Run Project

rename `config.env.example` to `config.env`
<pre>
npm install
npm run dev
</pre>

app will start at 4000 port as default

## API Routes
- /api/v1
  - /message
    - POST /send (anonymous)
    - GET /getall (anonymous, anonymous)
  - /user
    - /patient
      - POST /register (anonymous)
      - POST /login (anonymous)
      - GET /find (anonymous)
      - GET /all/:page (anonymous)
      - GET /logout (anonymous)
    - /admin
      - POST /new (anonymous, anonymous)
      - GET /me (anonymous, anonymous)
      - GET /logout (anonymous, anonymous)
    - /doctor
      - POST /addnew (anonymous, anonymous)
  - /appointment
    - POST /post (anonymous, anonymous)
    - GET /getall (anonymous, anonymous)
    - PUT /update/:id (anonymous, anonymous)
    - DELETE /delete/:id (anonymous, anonymous)


| Index | Method   | Path                              | Middleware             |
|-------|----------|-----------------------------------|------------------------|
| 0     | POST     | `/api/v1/message/send`            | `anonymous`            |
| 1     | GET      | `/api/v1/message/getall`          | `anonymous, anonymous` |
| 2     | POST     | `/api/v1/user/patient/register`   | `anonymous`            |
| 3     | POST     | `/api/v1/user/patient/login`      | `anonymous`            |
| 4     | POST     | `/api/v1/user/admin/new`          | `anonymous, anonymous` |
| 5     | GET      | `/api/v1/user/doctors`            | `anonymous`            |
| 6     | GET      | `/api/v1/user/admin/me`           | `anonymous, anonymous` |
| 7     | GET      | `/api/v1/user/admin/logout`       | `anonymous, anonymous` |
| 8     | GET      | `/api/v1/user/patient/logout`     | `anonymous, anonymous` |
| 9     | POST     | `/api/v1/user/doctor/addnew`      | `anonymous, anonymous` |
| 10    | GET      | `/api/v1/user/patient/find`       | `anonymous`            |
| 11    | GET      | `/api/v1/user/patient/all/:page`  | `anonymous`            |
| 12    | POST     | `/api/v1/appointment/post`        | `anonymous, anonymous` |
| 13    | GET      | `/api/v1/appointment/getall`      | `anonymous, anonymous` |
| 14    | PUT      | `/api/v1/appointment/update/:id`  | `anonymous, anonymous` |
| 15    | DELETE   | `/api/v1/appointment/delete/:id`  | `anonymous, anonymous` |

### Notes:
- **Index**: Indicates the order of the routes for easier reference.
- **Method**: The HTTP method (e.g., GET, POST, PUT, DELETE).
- **Path**: The API endpoint.
- **Middleware**: Middleware applied to the route (e.g., `anonymous`).

Feel free to customize this based on your project's requirements!
