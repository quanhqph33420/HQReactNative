import AsyncStorage from "@react-native-async-storage/async-storage";
class Storage {
  setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      return false;
    }
  };
  getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return false;
    }
  };
  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      return false;
    }
  };
  getMultiple = async (...key) => {
    try {
      return await AsyncStorage.multiGet([key]);
    } catch (e) {
      return false;
    }
  };
}
module.exports = new Storage();
