![React](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff) ![TailwinCSS](https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=fff) ![Static Badge](https://img.shields.io/badge/Build-In_Progress-yellow?style=for-the-badge&logo=github)

![noQ](https://noq.nu/wp-content/uploads/2024/04/Logotyp_PNG-300x169.png)

# noQ Frontend (Vite & React)

### Prerequisites for Running the Project

**Node.js**: Ensure that you have Node.js installed. You can download and install it from [the official Node.js website](https://nodejs.org/).

### Set up developer environment

To get started with the development environment, follow these steps:

with terminal open root of repo, Type these commands

```
      npm install
      npm run dev -- --mode mockapi
```

to run without mock api use

```
      npm run dev
```

This will install the necessary dependencies and start the development server.
You can access the client at http://localhost:5173/.

### Static test users for login

These users shall not be used in production

```
User:
email: user.user@test.nu
Password: P4ssw0rd_for_Te5t+User

Host:
email: user.host@test.nu
Password: P4ssw0rd_for_Te5t+User

Caseworker:
email: user.caseworker@test.nu
Password: P4ssw0rd_for_Te5t+User

Volunteer:
email: user.volunteer@test.nu
Password: P4ssw0rd_for_Te5t+User
```

## Wiki

[Frontend wiki](https://github.com/noQ-sweden/noQ-Frontend/wiki)

### Troubleshooting

## Contributors

<a href="https://github.com/noQ-sweden/noQ-Frontend/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=noQ-sweden/noQ-Frontend" />
</a>

Made with [contrib.rocks](https://contrib.rocks). .

# Local Dev Tip

If you're getting proxy errors (ECONNREFUSED ::1:8000), edit your `vite.config.js` like this:

```js
server: {
  host: "127.0.0.1",
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8000",
    },
  },
}
```

## 🔐 Accessing the Volunteer Dashboard

To access the Volunteer Management Dashboard at [http://localhost:5173/admin/volunteers], ensure you're logged in as a user belonging to the `admin` or `host` group.

You can create a superuser or assign a user to the correct group:

```bash
# Create superuser
python manage.py createsuperuser

# Open Django shell to assign group
python manage.py shell
```

```python
from django.contrib.auth.models import User, Group

# Get the user you want to assign to a group
user = User.objects.get(username="your_username")

# Get the group (either 'admin' or 'host')
group = Group.objects.get(name="admin")  # or "host"

# Add the user to that group
user.groups.add(group)
```
