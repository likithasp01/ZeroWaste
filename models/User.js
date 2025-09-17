const db = require('../db');

class User {
  static async create(name, email, passwordHash) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
      [name, email, passwordHash]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async setOtp(email, otpHash, expiresAt) {
    await db.execute(
      'UPDATE users SET otp_hash = ?, otp_expires_at = ? WHERE email = ?',
      [otpHash, expiresAt, email]
    );
  }

  static async markVerified(email) {
    await db.execute(
      'UPDATE users SET is_verified = 1, otp_hash = NULL, otp_expires_at = NULL WHERE email = ?',
      [email]
    );
  }
}

module.exports = User;
