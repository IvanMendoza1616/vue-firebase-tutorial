<template>
    <div class="home">
        <h1>Reading Database</h1>
        <button @click="view">View</button>
        <button @click="logout">Logout</button>
        <div class="info">
            <div id="plotly"></div>
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
import Plotly from 'plotly.js-dist';
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
                let i = 1;
                let question = 0;
                let rights = 0;
                let wrongs = 0;
                this.ansRight = [];
                this.ansWrong = [];
                this.quest = [];
                snapshot.forEach((childSnapshot) => {
                    let childData = childSnapshot.val();
                    question = i;
                    rights = childData.rights ? childData.rights : 0;
                    wrongs = childData.wrongs ? childData.wrongs : 0;
                    this.info.push({ question, rights, wrongs });
                    this.ansRight.push(rights);
                    this.ansWrong.push(wrongs);
                    this.quest.push(`Q ${question}`);
                    i++;
                });
            });
            let trace1 = {
                x: this.ansRight,
                y: this.quest,
                name: 'Wrong',
                orientation: 'h',
                marker: {
                    color: 'rgba(55,128,191,1)',
                    width: 10,
                },
                type: 'bar',
            };

            let trace2 = {
                x: this.ansWrong,
                y: this.quest,
                name: 'Correct',
                orientation: 'h',
                type: 'bar',
                marker: {
                    color: 'rgba(255,153,51,1)',
                    width: 10,
                },
            };

            let data = [trace1, trace2];

            let layout = {
                title: 'Right and Wrong Answers',
                barmode: 'stack',
                autosize: false,
                width: 1000,
                height: 5000,
            };

            Plotly.newPlot('plotly', data, layout);
        },
    },
};
</script>

<style scoped>
.question {
    margin-top: 2rem;
}
#plotly {
    display: flex;
    justify-content: center;
}
</style>
