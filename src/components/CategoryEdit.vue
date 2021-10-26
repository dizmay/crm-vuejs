<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="selectedCategory">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      select: null,
      title: "",
      limit: 100,
      selectedCategory: null,
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  watch: {
    selectedCategory(categoryId) {
      const { title, limit } = this.categories.find(
        (category) => category.id === categoryId
      );
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    if (this.categories.length) {
      const { id, title, limit } = this.categories[0];
      this.selectedCategory = id;
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.selectedCategory,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$toastMessage("Категория была обновлена");
        this.$emit("updated", categoryData);
      } catch (error) {
        console.error(error);
      }
    },
  },
  beforeUnmount() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>