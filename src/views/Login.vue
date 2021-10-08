<template>
  <form class="card auth-card" @submit.prevent="loginHandler">
    <div class="card-content">
      <span class="card-title">Вход</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid: v$.email.$error,
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.required.$invalid && v$.email.$dirty"
          class="helper-text invalid"
          >Введите адрес электронной почты</small
        >
        <small
          v-if="v$.email.email.$invalid && v$.email.$dirty"
          class="helper-text invalid"
          >Введите корректный адрес электронной почты</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid: v$.password.$error,
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.required.$invalid && v$.password.$dirty"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="v$.password.minLength.$invalid && v$.password.$dirty"
          class="helper-text invalid"
          >Пароль должен содержать не менее
          {{ v$.password.minLength.$params.min }} символов. Сейчас
          {{ password.length }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";
import messages from "@/utils/messages";
export default {
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$toastMessage(messages[this.$route.query.message]);
    }
  },
  setup() {
    return { v$: useVuelidate() };
  },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  methods: {
    loginHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const loginData = {
        email: this.email,
        password: this.password,
      };
      console.log(loginData);
      this.$router.push("/");
    },
  },
};
</script>
