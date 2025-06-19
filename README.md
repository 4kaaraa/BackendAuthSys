<h1 align="center">
  <br>
  Backend Auth System
  <br>
</h1>

<h4 align="center">Javascript Authentificator</h4>

<p align="center">
  <a href="#overview">Presentation</a>
  •
  <a href="#Feature">Feature</a>
  •
  <a href="#Documentation">Documentation</a>
  •
</p>

# Overview

I just couldn't buy KeyAuth, so I created a simple system for creating keys and a similar verification system.
- This system has been developed solely for educational purposes.
- This project has been created with good intentions and is intended for personal use only.
- By choosing to use this repo, you acknowledge and accept full responsibility for any consequences that may result from your actions.

- Required:
  [MongoDB](https://www.mongodb.com/try/download/community)

**Feature**
- [x] Create License
- [x] Create User
- [x] Register
- [x] Login
- [x] Dashboard
- [x] Api
- [x] User Panel
- [ ] Hwid Checker
- [ ] Hwid Update
- [ ] Website [Port: 80]
- [ ] Auto Update

# Documentation

- Key Check | `/api/information/key/check` (req = keys)
- Key Create | `/api/information/key/create` (req = type)
- Key Edit | `/api/information/key/edit` (req = keys) (fild you want to edit: type, take, hwid, valid)
- All Keys | `/api/information/key/all` (no req)

- Register | `/api/information/user/register` (req = username, password, keys)
- Login | `/api/information/user/login` (req = username & password)
- Delete User | `/api/information/user/delete-user` (req = username)
- All User | `/api/information/user/all` (no req)

- Status | `/api/information/status` (no req)
