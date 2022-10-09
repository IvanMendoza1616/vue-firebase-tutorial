<template>
    <div class="home">
        <h1>Reading Database</h1>
        <button @click="view">View</button>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';

export default {
    name: 'HomeView',
    methods: {
        logout: function () {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace('login');
                });
        },
        view: function () {
            let db = firebase.database().ref('answers');
            db.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    let childData = childSnapshot.val();
                    console.log(childData);
                });
            });
        },
    },
};
</script>
