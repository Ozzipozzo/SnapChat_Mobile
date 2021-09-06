import AsyncStorage from '@react-native-async-storage/async-storage';

export default storeData = async (value) => {
    try {
        console.log('yes')
        await AsyncStorage.setItem('token', value)
    } catch (e) {
        console.log(e)
    }
}