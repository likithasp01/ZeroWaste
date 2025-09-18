#  ZeroWaste

ZeroWaste is a web application that connects people who want to donate excess food with those in need.  
It aims to reduce food waste and build a community of sharing.

##  Features

-  **User Authentication**
  Register with email verification (OTP-based), login, and logout.

-  **Food Posting**  
  Donors can post food details with description, image, contact, and pickup location.

-  **Location Integration**  
  Uses Google Maps/Geoapify for embedding and pin-dropping pickup location.

-  **Food Availability**  
  Home page shows all available food posts with status (Available / Booked).

-  **Booking System**  
  Users can book food items. Once booked, posts are marked as unavailable.

-  **Auto Expiry**  
  Posts automatically get deleted after 24 hours (configurable).

-  **Image Upload**  
  Supports uploading food images via Multer.

-  **My Posts & Booked Posts**  
  Users can manage posts they created or view food they have booked.

-  **Admin Dashboard** 
  Manage users and posts.

---

##  Tech Stack

- *Frontend:* EJS, Bootstrap, CSS, JavaScript  
- *Backend:* Node.js, Express.js  
- *Database:* MySQL  
- *Authentication:*  OTP Email Verification  
- *File Uploads:* Multer  
- *Other:*  Google Maps API

---

##  Project Folder Structure
```
ZeroWaste/
|
│-- models/ 
| ├── Post.js
| ├── User.js
│-- public/ 
│ ├── images/
│ ├── uploads/
│ ├── post.css
│ ├── script.js
│ └── style.css
│-- routes/ 
│ ├── admin.js
│ ├── auth.js
│-- utils/ 
│ ├── mailer.js
│-- views/ 
│ |-- partials/
|   ├── navbar.ejs
│ ├── about.ejs
│ ├── admin-users.ejs
│ ├── book.ejs
│ └── booked.ejs
│ ├── home.ejs
│ ├── intro.ejs
│ ├── login.ejs
│ ├── my-posts.ejs
│ ├── post.ejs
│ ├── register.ejs
│ └── terms.ejs
│-- .env 
│-- .gitignore
│-- app.js   # Main server file
│-- db.js 
│-- package-lock.json
│-- package.json
│-- testmail.js

```

**Install dependencies :**

npm install

**Configure environment variables :**


Create a .env file in the root directory:


code:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=zerowasteproject
OTP_EXP_MINUTES=10
SESSION_SECRET=secret 
```
 **Run the server :**

 
node app.js


 **Server runs at :** http://localhost:3000

# Screenshots

## Welcome Page
![WhatsApp Image 2025-07-24 at 21 09 06_ff6c763b](https://github.com/user-attachments/assets/a5352e24-b777-42a2-8fdb-b5080833adeb)

## Home Page
![WhatsApp Image 2025-09-18 at 22 13 30_b2f5ca9a](https://github.com/user-attachments/assets/b1873cbf-69e6-418e-aedf-c137dcae353b)


## The food i shared
![WhatsApp Image 2025-09-18 at 22 14 02_29cec620](https://github.com/user-attachments/assets/09889629-9c16-40cf-9942-ca2f85b61b7a)


## The food booked by me
![WhatsApp Image 2025-09-18 at 22 13 04_b8238ac4](https://github.com/user-attachments/assets/db1bc9ee-c1c3-4cc0-8e30-7a6f43fb27de)

## To post the food
![WhatsApp Image 2025-07-24 at 21 07 17_c3ff4249](https://github.com/user-attachments/assets/f9b1f744-84f1-43ed-ae5b-f8016c170a29)


## Login page
![WhatsApp Image 2025-09-18 at 20 36 00_0f6e08ab](https://github.com/user-attachments/assets/1c6f38e4-6319-4ad6-b6c6-ac143aa80048)


## Register page
![WhatsApp Image 2025-09-18 at 20 36 43_487cd015](https://github.com/user-attachments/assets/f70b478f-a25c-4f3d-850d-0fe6043a2df2)


## OTP Verification
![WhatsApp Image 2025-09-18 at 20 37 28_8de8ff12](https://github.com/user-attachments/assets/c5cf79fe-bdff-47ec-8fa8-4e761eb5cb48)

![WhatsApp Image 2025-09-18 at 23 31 25_9f616be0](https://github.com/user-attachments/assets/a7da854c-0b30-4145-b3c0-17400c530d7d)



## Future Improvements

- Notifications (email/SMS when food is booked)
- Progressive Web App (PWA) support
- Search & filter food by location or type
- Multi-language support

 ## Description 
 ZeroWaste is a food-sharing platform designed to reduce food waste and help people in need. The platform allows individuals or organizations with excess food to share it, while those in need can browse and book available food items.
 

This project is built with the help of open-source code and customized according to my own assumptions, design, and requirements. It is intended as a prototype/concept to demonstrate how technology can connect communities and minimize food waste.

## Note 
This project is created for learning and demonstration purposes. It uses open-source code as the base, modified and extended with my own design and assumptions to build the ZeroWaste platform.


## Author
Likitha S P
