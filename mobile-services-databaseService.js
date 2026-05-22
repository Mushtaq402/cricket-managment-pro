import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATABASE_NAME = 'cricketpro.db';
let db = null;

const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db;
};

export const databaseService = {
  async initializeDatabase() {
    try {
      const database = await getDatabase();

      // Create tables
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS matches (
          id TEXT PRIMARY KEY,
          title TEXT,
          description TEXT,
          status TEXT,
          startTime TEXT,
          endTime TEXT,
          team1 TEXT,
          team2 TEXT,
          venue TEXT,
          tournament_id TEXT,
          data JSON,
          created_at TEXT,
          updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS tournaments (
          id TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          status TEXT,
          startDate TEXT,
          endDate TEXT,
          location TEXT,
          data JSON,
          created_at TEXT,
          updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS players (
          id TEXT PRIMARY KEY,
          name TEXT,
          role TEXT,
          team TEXT,
          statistics JSON,
          data JSON,
          created_at TEXT,
          updated_at TEXT
        );

        CREATE TABLE IF NOT EXISTS cache (
          key TEXT PRIMARY KEY,
          value TEXT,
          expires_at TEXT
        );
      `);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  },

  async insertMatch(match) {
    try {
      const db = await getDatabase();
      const result = await db.runAsync(
        `INSERT INTO matches (id, title, description, status, startTime, endTime, team1, team2, venue, tournament_id, data, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          match.id,
          match.title,
          match.description,
          match.status,
          match.startTime,
          match.endTime,
          match.team1,
          match.team2,
          match.venue,
          match.tournament_id,
          JSON.stringify(match),
          new Date().toISOString(),
          new Date().toISOString(),
        ]
      );
      return result;
    } catch (error) {
      console.error('Error inserting match:', error);
      throw error;
    }
  },

  async getMatches(limit = 50) {
    try {
      const db = await getDatabase();
      const result = await db.allAsync(
        `SELECT * FROM matches ORDER BY startTime DESC LIMIT ?`,
        [limit]
      );
      return result;
    } catch (error) {
      console.error('Error getting matches:', error);
      return [];
    }
  },

  async getMatchById(matchId) {
    try {
      const db = await getDatabase();
      const result = await db.getFirstAsync(
        `SELECT * FROM matches WHERE id = ?`,
        [matchId]
      );
      return result;
    } catch (error) {
      console.error('Error getting match:', error);
      return null;
    }
  },

  async updateMatch(matchId, updateData) {
    try {
      const db = await getDatabase();
      const result = await db.runAsync(
        `UPDATE matches SET data = ?, updated_at = ? WHERE id = ?`,
        [JSON.stringify(updateData), new Date().toISOString(), matchId]
      );
      return result;
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  },

  async cacheData(key, value, ttl = 3600) {
    try {
      const db = await getDatabase();
      const expiresAt = new Date(Date.now() + ttl * 1000).toISOString();

      await db.runAsync(
        `INSERT OR REPLACE INTO cache (key, value, expires_at) VALUES (?, ?, ?)`,
        [key, JSON.stringify(value), expiresAt]
      );
    } catch (error) {
      console.error('Error caching data:', error);
    }
  },

  async getCachedData(key) {
    try {
      const db = await getDatabase();
      const result = await db.getFirstAsync(
        `SELECT value, expires_at FROM cache WHERE key = ?`,
        [key]
      );

      if (!result) return null;

      if (new Date(result.expires_at) < new Date()) {
        await db.runAsync(`DELETE FROM cache WHERE key = ?`, [key]);
        return null;
      }

      return JSON.parse(result.value);
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  },

  async clearCache() {
    try {
      const db = await getDatabase();
      await db.execAsync(`DELETE FROM cache`);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  async closeDatabase() {
    try {
      if (db) {
        await db.closeAsync();
        db = null;
      }
    } catch (error) {
      console.error('Error closing database:', error);
    }
  },
};

export default databaseService;
