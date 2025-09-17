const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "chinnu",
  database: "zerowaste"
});

async function createPost(postData) {
  const { name, contact, address, description, imageUrl, latitude, longitude } = postData;

  const sql = `
    INSERT INTO posts (name, contact, address, description, image, latitude, longitude)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    name,
    contact,
    address,
    description,
    imageUrl,
    latitude,
    longitude
  ]);

  return result.insertId;
}

async function getAllPosts() {
  const [rows] = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
  return rows;
}

async function getPostById(id) {
  const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
  return rows[0];
}

async function bookPost(id) {
  const [result] = await pool.query("UPDATE posts SET booked = TRUE WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

async function deleteExpiredPosts() {
  const [result] = await pool.query("DELETE FROM posts WHERE created_at < ?", [expiryDate]);
  return result.affectedRows;
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  bookPost,
  deleteExpiredPosts
};
