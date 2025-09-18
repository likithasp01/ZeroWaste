const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');
const fs = require("fs");
require('dotenv').config();
const session = require('express-session');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error(" Database connection failed:", err);
  }
})();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use(authRoutes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

function isAuth(req, res, next) {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  res.render('intro');
});

app.get('/home', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts ORDER BY created_at DESC");

    const posts = rows.map(post => ({
      ...post,
      createdAt: new Date(post.created_at)
    }));

    res.render('home', { posts });
  } catch (err) {
    console.error("Error loading posts:", err);
    res.status(500).send("Failed to load posts");
  }
});

app.get('/post', isAuth, (req, res) => {
  res.render('post');
});

app.post('/upload', isAuth, upload.single('image'), async (req, res) => {
  try {
    const userId = req.session.user.id;

    await db.query(
      `INSERT INTO posts (name, contact, address, description, image, latitude, longitude, created_at, booked, user_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        req.body.name,
        req.body.contact,
        req.body.address,
        req.body.description,
        '/uploads/' + req.file.filename,
        req.body.latitude || null,
        req.body.longitude || null,
        false,
        userId
      ]
    );

    res.redirect('/home');
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Failed to upload post");
  }
});

app.get('/book/:id', isAuth, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [req.params.id]);

    if (rows.length === 0) return res.status(404).send("Post not found");

    const post = {
      ...rows[0],
      createdAt: new Date(rows[0].created_at)
    };

    res.render("book", { post, index: req.params.id });
  } catch (err) {
    console.error("Error loading book page:", err);
    res.status(500).send("Error loading book page");
  }
});

app.post('/book/:id', isAuth, async (req, res) => {
  try {
    await db.query("UPDATE posts SET booked = true WHERE id = ?", [req.params.id]);
    res.redirect('/home');
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).send("Failed to book post");
  }
});

app.get('/my-posts', isAuth, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    const posts = rows.map(post => ({ ...post, createdAt: new Date(post.created_at) }));
    res.render('my-posts', { posts });
  } catch (err) {
    console.error("Error loading user posts:", err);
    res.status(500).send("Failed to load your posts");
  }
});


app.get('/booked', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM posts WHERE booked = 1 ORDER BY created_at DESC");

    const posts = rows.map(post => ({
      ...post,
      createdAt: new Date(post.created_at)
    }));

    res.render('booked', { posts });
  } catch (err) {
    console.error("Error loading booked posts:", err);
    res.status(500).send("Failed to load booked posts");
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
    res.redirect('/my-posts');
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).send('Error deleting post');
  }
});

app.post("/cancel/:id", async (req, res) => {
  try {
    await db.query("UPDATE posts SET booked = false WHERE id = ?", [req.params.id]);
    res.redirect("/booked");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cancelling booking");
  }
});

setInterval(async () => {
  try {
    const [expiredPosts] = await db.query("SELECT * FROM posts WHERE created_at < NOW() - INTERVAL 24 HOUR");

    for (const post of expiredPosts) {
      const filePath = path.join(__dirname, "public", post.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
        else console.log("Image deleted:", filePath);
      });

      await db.query("DELETE FROM posts WHERE id = ?", [post.id]);
      console.log(`Post deleted: ${post.id}`);
    }
  } catch (err) {
    console.error("Error deleting expired posts:", err);
  }
}, 10 * 1000);

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/about", (req, res) => {
  res.render("about");
});

const getUserProfile = () => ({
  name: 'likitha',
  email: 'likitha@example.com',
  role: 'Frontend Developer',
  joined: 'Jan 2025'
});

app.get('/profile', (req, res) => {
  const user = getUserProfile();
  res.render('profile', { user });
});

const adminRoutes = require("./routes/admin");

app.use("/admin", adminRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});










