type TLongTermStorage = typeof localStorage;

class LongTermStorage implements TLongTermStorage {
  clear() {
    try {
      return localStorage.clear();
    } catch (e) {
      return null;
    }
  }

  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  key(index) {
    try {
      return localStorage.key(index);
    } catch (e) {
      return null;
    }
  }

  removeItem(key) {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  }

  setItem(key, value) {
    try {
      return localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  get length() {
    try {
      return localStorage.length;
    } catch (e) {
      return null;
    }
  }
}

export default new LongTermStorage();
