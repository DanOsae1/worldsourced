import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import reducer from './Redux/reducers/MainReducer'
import {Provider} from "react-redux";
import Firebase,{FirebaseContext} from "./Database";

const store = createStore(reducer)
const worldsourcedapp =
    <React.StrictMode>
        <Provider store={store}>
            <FirebaseContext.Provider value={new Firebase()}>
                <App/>
            </FirebaseContext.Provider>
        </Provider>
    </React.StrictMode>

ReactDOM.render(
    worldsourcedapp,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
