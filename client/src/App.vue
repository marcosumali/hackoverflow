<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/"><a class="navbar-brand" href="#">HackOverflow.com</a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/questions"><a class="nav-link" href="#">Questions? <span class="sr-only">(current)</span></a></router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <button class="button btn btn-info my-2 my-sm-0" type="submit">Sign Out</button>
            <!-- <button class="button btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="modal">Register</button> -->
          </form>
        </div>
      </nav>

    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.button {
  margin-right: 10px;
}

</style>
