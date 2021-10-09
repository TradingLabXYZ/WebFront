const DB_NAME = 'userdb';
const DB_VERSION = 1;
let DB;

export default {
	async getDb() {
		return new Promise((resolve, reject) => {
			if(DB) { return resolve(DB); }
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
			let request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			request.onupgradeneeded = e => {
				let db = e.target.result;
				db.createObjectStore("userData", { autoIncrement: true, keyPath: "id" }).createIndex("SessionIdIndex", "SessionId");
      };
		});
	},
	async saveUser(user) {
		let db = await this.getDb();
		return new Promise(resolve => {
			let trans = db.transaction(['userData'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};
			let store = trans.objectStore('userData');
			store.put(user);
		});
	},
  async getUser(key) {
		let db = await this.getDb();
		return new Promise(resolve => {
      var tx = db.transaction(["userData"], "readonly");
      var store = tx.objectStore("userData");
      var index = store.index("SessionIdIndex");
      var getKey = index.get(key);
      getKey.onsuccess = function() {
        resolve(getKey.result);
      };
		});
	},
	async deleteUser(key) {
    console.log("I WANT TO DELETE")
    console.log(key);
		let db = await this.getDb();
		return new Promise(resolve => {
			let trans = db.transaction(['userData'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};
			let store = trans.objectStore('userData');
      store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if(cursor) {
          console.log("cursor")
          console.log(cursor);
          console.log(cursor.value.SessionId);
          if(cursor.value.SessionId == key) {
            const request = cursor.delete();
            request.onsuccess = function() {
              console.log('Deleted');
            };
          }
        }
      }
		});	
	}
}
