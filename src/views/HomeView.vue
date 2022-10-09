<template>
    <div class="home">
        <h1>Reading Database</h1>
        <button @click="view">View</button>
        <button @click="logout">Logout</button>
        <div class="info">
            <div class="question" v-for="question in info" v-bind:key="question.question">
                <p>Question {{ question.question }}</p>
                <p>Rights: {{ question.rights }} Wrongs: {{ question.wrongs }}</p>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';
export default {
    name: 'HomeView',
    data() {
        return {
            info: [],
        };
    },
    methods: {
        logout: function () {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace('login');
                });
        },
        view() {
            let db = firebase.database().ref('questions');
            db.on('value', (snapshot) => {
                let i = 0;
                let question = 0;
                let rights = 0;
                let wrongs = 0;
                snapshot.forEach((childSnapshot) => {
                    let childData = childSnapshot.val();
                    question = i;
                    rights = childData.rights ? childData.rights : 0;
                    wrongs = childData.wrongs ? childData.wrongs : 0;
                    this.info.push({ question, rights, wrongs });
                    i++;
                });
            });
        },
    },
};
</script>

<style scoped>
.question {
    margin-top: 2rem;
}
</style>
