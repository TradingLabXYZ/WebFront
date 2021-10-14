import { IDBPDatabase, openDB, deleteDB } from 'idb';

class IndexedDb {
  private database: string;
  private db: any;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(
              tableName, {
                autoIncrement: true,
                keyPath: 'id' }
            ).createIndex(
              'SessionIdIndex',
              'SessionId',
              {unique: true}
            );
          }
        },
      });
    } catch (error) {
      return false;
    }
  };

  public async putUser(tableName: string, value: object) {
    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    return result;
  };

  public async getUser(tableName: string, sessionId: string) {
    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    var index = store.index("SessionIdIndex");
    var result = await index.get(sessionId);
    return result;
  };

  public async deleteDatabase() {
    await deleteDB('tradingLab');
  }
}

export default IndexedDb;
