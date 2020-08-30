

import { openDB } from "idb";

const dbName = "Treenari";
let dbPromise = null;

// Gatsby SSR vaatii ohituksen
if (typeof window !== "undefined") {
    dbPromise = openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore("alkufiilikset");
        db.createObjectStore("loppufiilikset");
        db.createObjectStore("harjoitukset");
        db.createObjectStore("kommentit");
      },
    });
}

const Tietovarasto = {
  async get(store, key) {
    return (await dbPromise).get(store, key);
  },
  async set(store, key, val) {
    return (await dbPromise).put(store, val, key);
  },
  async delete(store, key) {
    return (await dbPromise).delete(store, key);
  },
  async clear(store) {
    return (await dbPromise).clear(store);
  },
  async keys(store) {
    return (await dbPromise).getAllKeys(store);
  },
  async getAll(store) {
    return (await dbPromise).getAll(store);
  },
  async count(store) {
    return (await dbPromise).count(store);
  }
}

export default Tietovarasto;





