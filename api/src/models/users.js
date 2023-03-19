const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Miguelnell9',
  port: 5432,
});

table = "usuarios"

class User {
  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM ${table}`);
    return rows;
  }

  static async findByPk(id) {
    const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
    return rows[0];
  }

  static async create({ nombre, correo_electronico, password, rol }) {
    const { rows } = await pool.query(
      `INSERT INTO ${table} (nombre, correo_electronico, password, rol) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, correo_electronico, password, rol]
    );
    return rows[0];
  }

  static async update(id, { nombre, correo_electronico, password, rol }) {
    const { rows } = await pool.query(
      `UPDATE ${table} SET nombre = $1, correo_electronico = $2, password = $3, rol = $4 WHERE id = $5 RETURNING *`,
      [nombre, correo_electronico, password, rol, id]
    );
    return rows[0];
  }

  static async deleteById(id) {
    const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return rowCount > 0;
  }
}

module.exports = User;