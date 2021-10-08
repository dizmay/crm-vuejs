<template>
  <form class="card auth-card" @submit.prevent="registerHandler">
    <div class="card-content">
      <span class="card-title">Регистрация</span>
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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{ invalid: v$.name.required.$invalid && v$.name.$dirty }"
        />
        <label for="name">Имя</label>
        <small
          v-if="v$.name.required.$invalid && v$.name.$dirty"
          class="helper-text invalid"
          >Введите ваше имя</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, required, minLength, sameAs } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { sameAs: sameAs(true) },
  },
  methods: {
    registerHandler() {
      console.log(this.v$);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const registerData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      this.$router.push("/");
      console.log(registerData);
    },
  },
};
</script>
