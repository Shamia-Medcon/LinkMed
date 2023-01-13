import SQLite from 'react-native-sqlite-2'
import LocalStorage from './LocalStorage';
const db = SQLite.openDatabase('MedConnectDBV1.db', '1.0', '', 1);
export default class {

    static createDB = async () => {
        db.transaction(function (txn) {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Users(id BIGINT PRIMARY KEY NOT NULL, first_name VARCHAR(100), last_name VARCHAR(100), email VARCHAR(150), country VARCHAR(150), speciality VARCHAR(150), profession TEXT,token TEXT,isActivated Boolean,createdAt DATETIME)',
                [], function (tx, res) {
                    console.log(res);
                }
            )
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS Setting(id BIGINT PRIMARY KEY NOT NULL, url VARCHAR(255), type INTEGER DEFAULT 1)',
                []
            )
        });
    }
    static getById = async (id) => {
        db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `Users` where id=:id limit 1', [id], function (tx, res) {
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
        db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `Users` where email=:email', [email], function (tx, res) {
                if (res.rows.length > 0) {
                    let store = async () => {
                        await LocalStorage.storeData("user", res.rows['_array'][0]);
                    }
                    store();
                }
            })
        });
    }
    static checkAuth = () => {
       db.transaction(function (txn) {
            return txn.executeSql('SELECT * FROM `Users` order by created_at desc limit 1', [], function (tx, res) {
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

    static insertData = async (id, first_name, last_name, email, country, speciaity, profession, token, isActivated, createdAt) => {
        db.transaction(function (txn) {
            txn.executeSql('delete from Users where id=:id', [id]);
            txn.executeSql('INSERT INTO Users (id,first_name,last_name,email,country,speciality,profession,token,isActivated,createdAt) VALUES (:id,:first_name,:last_name,:email,:country,:speciality,:profession,:token,:isActivated,:createdAt)',
                [id, first_name, last_name, email, country, speciaity, profession, token, isActivated, createdAt], function (tx, res) {
                    console.log(`Record ${id} was Inserterd`);
                })
        });
    }
    static updateData = async (id, first_name, last_name, email,  country, speciaity, profession,token, isActivated) => {
        db.transaction(function (txn) {
            txn.executeSql('UPDATE Users set first_name=:first_name,last_name=:last_name,email=:email,country=:country,speciaity=:speciaity,profession=:profession,token=:token,isActivated=:isActivated where id=:id',
                [first_name, last_name, email, country, speciaity, profession, token, isActivated, id])
        })
    }
    static deleteData = async () => {
        db.transaction(function (txn) {
            txn.executeSql('delete * from Users');

        })
    }
}