
![Logo](./public//Logo/logo.png)


#   ACUSA 
## Ajayi Crowther University Student Assembly

###  ACUSA is a student-led organization, the Ajayi Crowther University Student Assembly (ACUSA) is committed to promoting the welfare, rights, and interests of all students at the university.

## Acknowledgements

 - [Ajayi Crowther University, Oyo Oyo State ](https://acu.edu.ng)
 

## Authors - Contributors

- [@ifeoluwa02](https://www.github.com/ifeoluwa02)
- [@Timmy-Tee](https://www.github.com/Timmy-Tee)
- [@theNubiadev](https://www.github.com/theNubiadev)

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |



# ADMIN SECTION Auth, Publications etc
###  Register/Signup
``` Signup with Name, Email, Password
 localhost:3000/api/admin/auth/register
```
``` Then proceed to auth signup to admin 
```
``` Login with Email, and Password
localhost:3000/api/admin/auth/login
```


### Publications 


npx prisma studio

Complete Test Flow:

Register Admin → Get user ID
Login → Get session token
Create 5 Events → Get event IDs
Get All Events (Admin) → Verify all 5 appear
Get Public Events → Verify only published ones appear
Get Single Event → Verify details
Update Event → Change title or toggle published
Get Event Again → Verify changes
Delete Event → Remove test event
Get All Events → Verify deletion


{
  "eventDate": "2025-02-15",
  "time": "14:00",
  "title": "Student Assembly General Meeting",
  "location": "Main Hall, Building A",
  "description": "Monthly general assembly meeting to discuss student affairs and upcoming events.",
  "published": true
}


[![Made with Prisma](http://made-with.prisma.io/dark.svg)](https://prisma.io)


