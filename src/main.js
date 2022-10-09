import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase';

let app = '';

const firebaseConfig = {
    apiKey: 'AIzaSyAy8pWVxIVZ2I4agpiqQb2fH0z-64dOdSY',
    authDomain: 'tidy-shard-325918.firebaseapp.com',
    projectId: 'tidy-shard-325918',
    storageBucket: 'tidy-shard-325918.appspot.com',
    messagingSenderId: '902282372531',
    appId: '1:902282372531:web:eac6423460d119fd41d7c6',
    measurementId: 'G-03N81CXEDV',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app');
    }
});
