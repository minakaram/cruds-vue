<template>
  <div class="login">
    <div class="inner">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "123456") {
        this.$router.push("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    },
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cornflowerblue;
}
input {
  background-color: cadetblue;
}

</style>
