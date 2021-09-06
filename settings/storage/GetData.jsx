import AsyncStorage from '@react-native-async-storage/async-storage';
export default getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            // console.log(value);
            return value;
        }
    } catch (e) {
        // console.log(e)
        // console.log('toto')
    }
}
