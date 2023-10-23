import * as SQLite from "expo-sqlite";

const database_name = "HikerApp.db";
const database_version = "1.0";
const database_display_name = "HikerApp Database";
const database_size = 200000;

const database = SQLite.openDatabase(database_name, database_version, database_display_name, database_size);

const initDatabase = () => {
    database.transaction((myTransaction) => {
        myTransaction.executeSql(
            `CREATE TABLE IF NOT EXISTS hikers 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                location TEXT,
                date TEXT,
                parking TEXT,
                length TEXT,
                level TEXT,
                description TEXT
            );`,
            [],
            () => console.log("Database and table created successfully."),(error) => console.log("Error occurred while creating the table.", error)
        );
    });
};

const getAllHikeInformation = () => {
    return new Promise((resolve, reject) => {
        database.transaction((myTransaction) => {
            myTransaction.executeSql(
                "SELECT * FROM hikers",
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

const deleteHikeInformation = () => {
    return new Promise((resolve, reject) => {
        database.transaction((myTransaction) => {
            myTransaction.executeSql(
                "DELETE FROM hikers WHERE id = ?",
                [id],
                () => {
                    resolve();
                },
                (_,error) => {
                    reject(error);
                }
            );
        });
    });
};

const addHikeInformatio = (name, location, date, parking, length, level, description) => {
    return new Promise((resolve, reject) => {
        database.transaction((myTransaction) => {
            myTransaction.executeSql(
                "INSERT INTO hikers (name, location, date, parking, length, level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [name, location, date, parking, length, level, description],
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

const Database = {
    initDatabase,
    addHikeInformatio,
    deleteHikeInformation,
    getAllHikeInformation
};

export default Database;