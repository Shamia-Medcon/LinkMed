import SQLite from 'react-native-sqlite-2'
import LocalStorage from './LocalStorage';
const db = SQLite.openDatabase('MedConnectDBV1.db', '1.0', '', 1);
export default class {

    static createDB = async () => {
        db.transaction(function (txn) {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Users(id BIGINT PRIMARY KEY NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(150),token TEXT,isActivated Boolean,createdAt DATETIME)',
                []
            )
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Setting(id BIGINT PRIMARY KEY NOT NULL, url VARCHAR(255), type INTEGER DEFAULT 1)',
                []
            )
        });
    }
    static getById = async (id) => {
        await db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `users` where id=:id limit 1', [id], function (tx, res) {
                if (res.rows.length > 0) {
                    let store = async () => {
                        await LocalStorage.storeData("user", res.rows['_array'][0]);
                    }
                    store();
                }
            })
        });
    }
    static getByEmail = async (email) => {
        await db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `users` where email=:email', [email], function (tx, res) {
                if (res.rows.length > 0) {
                    let store = async () => {
                        await LocalStorage.storeData("user", res.rows['_array'][0]);
                    }
                    store();
                }
            })
        });
    }
    static checkAuth = async () => {
        await db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `users` order by created_at desc limit 1', [], function (tx, res) {
                if (res.rows.length > 0) {
                    let store = async () => {
                        await LocalStorage.storeData("auth", true);
                        await LocalStorage.storeData("user", res.rows['_array'][0]);
                    }
                    store();
                } else {
                    let store = async () => {
                        await LocalStorage.storeData("auth", false);
                        await LocalStorage.storeData("user", null);
                    }
                    store();
                }
            })
        });
    }

    static insertData = async (id, first_name, last_name, email, token, isActivated, createdAt) => {
        db.transaction(function (txn) {
            txn.executeSql('delete from users where id=:id', [id]);
            txn.executeSql('INSERT INTO Users (id,first_name,last_name,email,token,isActivated,createdAt) VALUES (:id,:first_name,:last_name,:email,:token,:isActivated,:createdAt)',
                [id, first_name, last_name, email, token, isActivated, createdAt], function (tx, res) {
                    console.log(res);
                })
        })
    }
    static updateData = async (id, first_name, last_name, email, token, isActivated) => {
        db.transaction(function (txn) {
            txn.executeSql('UPDATE Users set first_name=:first_name,last_name=:last_name,email=:email,token=:token,isActivated=:isActivated where id=:id',
                [first_name, last_name, email, token, isActivated, id])
        })
    }
}