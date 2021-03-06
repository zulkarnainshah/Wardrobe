import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_LOADING
} from './Types';
import UserInfo from '../Components/Models/UserInfo';

const API_ENDPOINT = 'https://server-dev1.mywardrobe.space/api/v1/signin';
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_LOADING });

        fetch(API_ENDPOINT, {method: "POST",
            headers: {

                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({
                "email": email,
                "password": password,

            })


        })
            .then((response) => response.json())
            .then((responseJson) => {
                const authToken = responseJson.id_token;
                if (authToken === null) {
                    loginUserFail(dispatch);
                }
                else {
                    loginUserSuccess(dispatch, authToken);
                    saveIdOnLocalStorage(authToken);
                    Actions.homeScreen({ type: 'reset' });
                }
            });
    };
};

const loginUserSuccess = (dispatch, id) => {

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: id

    });
    Actions.startPage({ type: 'reset' });
};
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const saveIdOnLocalStorage = (authToken) => {
    AsyncStorage.setItem('authToken', authToken);
};
