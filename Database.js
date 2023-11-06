import * as SQLite from "expo-sqlite";

const database_name = "database.db";
const database_version = "1.0";
const database_displayname = "My App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,   
        location TEXT,     
        date TEXT,         
        parking TEXT,      
        length TEXT,       
        weatherForecast TEXT,       
        estimatedTime TEXT,       
        difficulty TEXT ,      
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikerInformation = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHikeInformation = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteAllHikeInformation = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addNewHike = (name, location, date, parking, length, weatherForecast, estimatedTime, difficulty, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (name, location, date, parking, length, weatherForecast, estimatedTime, difficulty, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, weatherForecast, estimatedTime, difficulty, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateHikeInformation = (id, name, location, date, parking, length, weatherForecast, estimatedTime, difficulty, description) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE hikes SET name = ?, location = ?, date = ?, parking = ?, length = ?, weatherForecast = ?, estimatedTime = ?,  difficulty = ?, description = ? WHERE id = ?",
          [name, location, date, parking, length, weatherForecast, estimatedTime, difficulty, description, id],
          (_, result) => {
            resolve(result);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

const Database = {
  initDatabase,
  addNewHike,
  getHikerInformation,
  deleteHikeInformation,
  updateHikeInformation,
  deleteAllHikeInformation
};

export default Database;
