import { useEffect, useState } from 'react';
import {openDatabase, SQLiteDatabase, enablePromise, } from 'react-native-sqlite-storage';
enablePromise(true);

//Convertendo Resposta da API em valor valido de inserção SQL



export const getDBConnection = async () => {
  return openDatabase({name: 'backup-data.db', location: 'default'});
};


export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS backup-data(
        id SERIAL PRIMARY KEY, 
        data JSON
    );`;

  await db.executeSql(query);
};


 export const useBackup = async (db: SQLiteDatabase) => {

  const insertQuery =
    `INSERT OR REPLACE INTO backup-data ( data ) values ('
        
    ')`;

  return db.executeSql(insertQuery);
};

export const getTodoItems = async (db: SQLiteDatabase) => {
  try {
    const results = await db.executeSql(`SELECT data id,value FROM backup-data`);
      console.log(results)
          return results;
    }
  catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
}; 


