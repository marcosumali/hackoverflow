<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="page col-md-8 offset-md-2">
      <div class="container col-md-5">
        <div class="jumbotron login-page col-md-12">
          <div class="items-heading col-md-12">
            <h1>LOGIN</h1>
          </div>
          <div class="items-login col-md-12">
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1" class="label-form">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Your email..." v-model="email" required>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1" class="label-form">Password</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your password..." v-model="password" required>
              </div>
              <img class="animated fadeIn" type="button" src="../../public/hacktiv8.png" @click="login" />

            </form>
          </div>
        </div>
      </div>

      <div class="container col-md-5">
        <div class="jumbotron login-page col-md-12">
          <div class="items-heading col-md-12">
            <h1>REGISTER</h1>
          </div>
          <div class="items-login col-md-12">
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1" class="label-form">Display Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your display name..." v-model="displayname" required>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1" class="label-form">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Your email..." v-model="regemail" required>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1" class="label-form">Password</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your password..." v-model="regpassword" required>
              </div>
              <img class="animated fadeIn" type="button" src="../../public/hacktiv8.png" @click="register" />

            </form>
          </div>
        </div>
      </div>

    </div>

 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      email: '',
      password: '',
      displayname: '',
      regemail: '',
      regpassword: ''
    }
  },
  methods: {
    login () {

      let obj = {
        email: this.email,
        password: this.password
      }

      axios.post('http://hackoverflow-server.madebybastian.com/users/getUser', obj)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        })
    },
    register () {
      let obj = {
        display_name: this.displayname,
        email: this.regemail,
        password: this.regpassword
      }

      axios.post('http://hackoverflow-server.madebybastian.com/users/save', obj)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        })

 
    }
  }
}
</script>


<style scoped>

.page {
  /* border: 1px solid rebeccapurple; */
  display: flex;
  justify-content: flex-start;
} 

.container {
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  height: 80vh;
}

.login-page {
  align-self: flex-start;
}

.label-form {
  align-self: flex-start;
}


</style>

