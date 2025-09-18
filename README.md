#  ZeroWaste

ZeroWaste is a web application that connects people who want to donate excess food with those in need.  
It aims to reduce food waste and build a community of sharing.

##  Features

-  *User Authentication*  
  Register with email verification (OTP-based), login, and logout.

-  *Food Posting*  
  Donors can post food details with description, image, contact, and pickup location.

-  *Location Integration*  
  Uses Google Maps/Geoapify for embedding and pin-dropping pickup location.

-  *Food Availability*  
  Home page shows all available food posts with status (Available / Booked).

-  *Booking System*  
  Users can book food items. Once booked, posts are marked as unavailable.

-  *Auto Expiry*  
  Posts automatically get deleted after 24 hours (configurable).

-  *Image Upload*  
  Supports uploading food images via Multer.

-  *My Posts & Booked Posts*  
  Users can manage posts they created or view food they have booked.

-  *Admin Dashboard* (optional if enabled)  
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



*Install dependencies :*


npm install

*Configure environment variables*


Create a .env file in the root directory:


code:

DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=zerowasteproject
OTP_EXP_MINUTES=10
SESSION_SECRET=secret 

 *Run the server :*

 
node app.js


 *Server runs at: http://localhost:3000*

# Screenshots

## Welcome Page
![WhatsApp Image 2025-07-24 at 21 09 06_e8136bcd](https://github.com/user-attachments/assets/63677299-c3c6-46bc-8948-da5edeffd193)

## Home Page
![WhatsApp Image 2025-09-18 at 22 13 30_bca283cb](https://github.com/user-attachments/assets/b4eaa811-5f53-4cc3-9cde-ba01b8bd1bf4)

## The food i shared
![WhatsApp Image 2025-09-18 at 22 14 02_590bdcba](https://github.com/user-attachments/assets/8d315776-ae50-433e-ab10-99458d07a166)

## The food booked by me
![WhatsApp Image 2025-09-18 at 22 14 46_9363f6b4](https://github.com/user-attachments/assets/3b71f285-219a-4924-9fcd-206a1a4d7114)

![WhatsApp Image 2025-09-18 at 22 13 04_18c8a5a9](https://github.com/user-attachments/assets/c7c56203-c505-421a-9848-a4614f470cbb)

## To post the food
![WhatsApp Image 2025-07-24 at 21 07 17_0525ac55](https://github.com/user-attachments/assets/56b0bf9f-0ce9-4069-9974-77296909e388)

## Login page
![WhatsApp Image 2025-09-18 at 20 36 00_10f91399](https://github.com/user-attachments/assets/ebb4d1f5-3df4-4f8d-9356-bf7522402309)

## Register page
![WhatsApp Image 2025-09-18 at 20 36 43_f7c094e9](https://github.com/user-attachments/assets/20012cac-e223-40ff-b065-9dec44e6ae13)

## OTP Verification
![WhatsApp Image 2025-09-18 at 20 37 28_3592f3c3](https://github.com/user-attachments/assets/b0938cbc-3eb7-4457-a004-d94a55ca07ca)
![WhatsApp Image 2025-09-18 at 22 47 49_de06b596](https://github.com/user-attachments/assets/6a2f61e6-1f8c-4100-933e-579475642ebc)


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
