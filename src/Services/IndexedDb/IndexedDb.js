// export default DBConfig;
const IndexedDb = {
  CreateIndexedDB: async () => {
    // Browser supported check.
    if (!window.indexedDB) {
      window.alert("Browser doesn't support IndexedDB.");
    } else {
      let db;
      let request = window.indexedDB.open("DongSungDb");

      request.onupgradeneeded = (e) => {
        db = request.result;
        db.createObjectStore("LoginInfo", { keyPath: "token" });
        db.createObjectStore("MenuList", {
          keyPath: ["userId", "mcategoCd"],
        });
        db.createObjectStore("LanguageList", {
          keyPath: ["lanId", "lanCode"],
        });
        db.createObjectStore("AuthList", {
          keyPath: ["userId", "lcategoCd", "mcategoCd", "detailCd"],
        });
      };

      request.onerror = (e) => {
        console.log("Onupgradeneeded failed.");
      };
      request.onsuccess = (e) => {
        db = request.result;

        db.onversionchange = (e) => {
          console.log("version changed: ", e);
        };
        // console.log("Onupgradeneeded successed.");
      };
    }
  },

  CreateTable: async (_tableName = "", _keys = []) => {
    new Promise((resolve, reject) => {
      // Browser supported check.
      if (!window.indexedDB) {
        window.alert("Browser doesn't support IndexedDB.");
      } else {
        let db;
        let request = window.indexedDB.open("DongSungDb");

        request.onerror = (e) => {
          console.log("Onupgradeneeded failed.");
          reject(false);
        };
        request.onsuccess = (e) => {
          db = request.result;
          resolve(request.result.version);
        };
      }
    }).then((result) => {
      let db;
      let request = window.indexedDB.open("DongSungDb", result + 1);

      request.onupgradeneeded = (e) => {
        db = request.result;
        db.createObjectStore(_tableName, { keyPath: _keys });
      };

      request.onerror = (e) => {
        console.log("Onupgradeneeded failed.");
      };
      request.onsuccess = (e) => {
        db = request.result;
      };
    });
  },

  AddDb: async (_database = "", _data = []) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readwrite");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          // console.log("Transaction complete.");
        };

        const store = transaction.objectStore(_database);
        for (const data of _data) {
          const result = store.add(data);
          result.onerror = (e) => reject(new Error("Add failed."));
          result.onsuccess = (e) => resolve(true);
        }
      };
    });
  },

  GetDb: async (_database = "", _key) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readonly");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          // console.log("Transaction complete.");
        };

        const store = transaction.objectStore(_database);
        const storeRequest = store.get(_key);
        storeRequest.onerror = (e) => {
          reject(new Error("Get failed."));
        };
        storeRequest.onsuccess = (e) => {
          resolve(storeRequest.result);
        };
      };
    });
  },

  GetAllDb: async (_database = "") => {
    return new Promise((resolve, reject) => {
      let returnData = [];
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readonly");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          resolve(returnData);
        };

        const store = transaction.objectStore(_database);
        const storeCursor = store.openCursor();
        storeCursor.onsuccess = (e) => {
          let cursor = e.target.result;

          if (cursor) {
            const value = store.get(cursor.key);
            value.onerror = (e) => reject(new Error("Cursor failed."));
            value.onsuccess = (e) => {
              // console.log("Cursor complete.");
              returnData.push(e.target.result);
            };
            cursor.continue();
          }
        };
      };
    });
  },

  GetLoginInfo: async () => {
    return new Promise((resolve, reject) => {
      let returnData = [];
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction("LoginInfo", "readonly");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          let thisData;

          if (returnData.length > 1) {
            thisData = returnData
              .sort((a, b) => {
                return new Date(a.connTime) - new Date(b.connTime);
              })
              .reverse();
            resolve(thisData[0]);
          } else if (returnData.length < 1) {
            resolve(false);
          } else {
            resolve(returnData[0]);
          }
        };

        const store = transaction.objectStore("LoginInfo");
        const storeCursor = store.openCursor();
        storeCursor.onsuccess = (e) => {
          let cursor = e.target.result;

          if (cursor) {
            const value = store.get(cursor.key);
            value.onerror = (e) => reject(new Error("Cursor failed."));
            value.onsuccess = (e) => {
              // console.log("Cursor complete.");
              returnData.push(e.target.result);
            };
            cursor.continue();
          }
        };
      };
    });
  },

  GetGlobalVar: async () => {
    return new Promise((resolve, reject) => {
      let returnData = [];
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction("GsGlobalVariable", "readonly");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          resolve(returnData[0]);
        };

        const store = transaction.objectStore("GsGlobalVariable");
        const storeCursor = store.openCursor();
        storeCursor.onsuccess = (e) => {
          let cursor = e.target.result;

          if (cursor) {
            const value = store.get(cursor.key);
            value.onerror = (e) => reject(new Error("Cursor failed."));
            value.onsuccess = (e) => {
              // console.log("Cursor complete.");
              returnData.push(e.target.result);
            };
            cursor.continue();
          }
        };
      };
    });
  },

  UpdateDb: async (_database = "", _key, _data) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readwrite");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          // console.log("Transaction complete.");
        };

        const store = transaction.objectStore(_database);
        const storeRequest = store.get(_key);
        storeRequest.onsuccess = (e) => {
          const updateRequest = store.put(_data);
          updateRequest.onerror = (e) => reject(new Error("Update failed."));
          updateRequest.onsuccess = (e) => resolve(true);
        };
      };
    });
  },

  DeleteDb: async (_database = "", _key) => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readwrite");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          // console.log("Transaction complete.");
        };

        const store = transaction.objectStore(_database);
        const storeRequest = store.delete(_key);
        storeRequest.onerror = (e) => reject(new Error("Delete failed."));
        storeRequest.onsuccess = (e) => resolve(true);
      };
    });
  },

  ClearDb: async (_database = "") => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("DongSungDb");

      request.onerror = (e) => {
        reject(new Error("Request error : " + e.target.errorCode));
      };
      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(_database, "readwrite");

        transaction.onerror = (e) => {
          reject(new Error("Transaction failed."));
        };
        transaction.oncomplete = (e) => {
          // console.log("Transaction complete.");
        };

        const store = transaction.objectStore(_database);
        const storeRequest = store.clear();
        storeRequest.onerror = (e) => reject(new Error("Clear failed."));
        storeRequest.onsuccess = (e) => resolve(true);
      };
    });
  },
};

export default IndexedDb;
