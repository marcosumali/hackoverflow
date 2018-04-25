<template>
  <div class="questions">
    <h1>QUESTIONS</h1>
    <div class="container-questions col-md-8 offset-md-2">
        <div class="jumbotron" v-for="question in questions" :key="question">
            <h4>Question: {{ question.question }}</h4>
            <p>Asked by: {{ question.UserId.display_name }}</p>
            <p><button class="btn btn-info">Likes</button> ({{ question.upvote.length }})</p>
            <p><button class="btn btn-info">Dislikes</button> ({{ question.downvote.length }})</p>
        </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'questions',
  data () {
    return {
        questions: []
    }
  },
  created () {
    this.getQuestions();
    
  },
  methods: {
    getQuestions() {
        axios.get('http://localhost:3000/questions/')
        .then(result => {
            console.log(result);
            this.questions = result.data.questions;
            // console.log(this.questions);
        })
        .catch(error => {
            console.log(error);
        })
    },
    getAnswers () {
        
    }
  }

}
</script>

<style scoped>

.container-questions {
  /* border: 1px solid black; */
}

</style>

