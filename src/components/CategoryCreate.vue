<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{ invalid: v$.title.$invalid && v$.title.$dirty }"
          />
          <label for="name">Название</label>
          <span
            v-if="v$.title.$invalid && v$.title.$dirty"
            class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$invalid && v$.limit.$dirty }"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="v$.limit.$invalid && v$.limit.$dirty"
            class="helper-text invalid"
            >Минимальное значение {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import M from "materialize-css";
export default {
  data() {
    return {
      title: "",
      limit: 100,
    };
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const categoryData = {
        title: this.title,
        limit: this.limit,
      };

      try {
        const category = await this.$store.dispatch(
          "createCategory",
          categoryData
        );
        (this.title = ""), (this.limit = 100);
        this.v$.$reset();
        this.$toastMessage(`Категория "${category.title}" была создана`);
        this.$emit("created", category);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>