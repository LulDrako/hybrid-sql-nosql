const pool = require("../config/db.postgres");

class Book {
  static async findAll() {
    const result = await pool.query("SELECT * FROM books ORDER BY id");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  static async create({ title, author, available = true }) {
    const result = await pool.query(
      "INSERT INTO books (title, author, available) VALUES ($1, $2, $3) RETURNING *",
      [title, author, available]
    );
    return result.rows[0];
  }

  static async update(id, { title, author, available }) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (author !== undefined) {
      fields.push(`author = $${paramCount++}`);
      values.push(author);
    }
    if (available !== undefined) {
      fields.push(`available = $${paramCount++}`);
      values.push(available);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `UPDATE books SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Book;

