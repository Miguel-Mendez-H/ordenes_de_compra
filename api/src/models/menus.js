const { Pool } = require('pg');

const db =  require('../db.js')

const table = "menus"

class Menus {
  static async findAll() {
    const { rows } = await db.query(`SELECT * FROM ${table}`);
    return rows;
  }

  static async findByPk(id) {
    const { rows } = await db.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
    return rows[0];
  }

  static async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    const columnsString = keys.join(', ');
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
  
    const { rows } = await db.query(`INSERT INTO ${table} (${columnsString}) VALUES (${placeholders}) RETURNING *`, values);
  
    return rows[0];
  }

  static async update(id, values) {
    const keys = Object.keys(values);
    const setValues = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
    const query = `UPDATE ${table} SET ${setValues} WHERE id = $${keys.length + 1} RETURNING *`;
    const { rows } = await db.query(query, [...Object.values(values), id]);
    return rows[0];
  }

  static async deleteById(id) {
    const { rowCount } = await db.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return rowCount > 0;
  }
}

module.exports = Menus;