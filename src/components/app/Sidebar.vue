<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="link.path"
      custom
      v-slot="{ href, navigate, isActive }"
    >
      <li :class="[isActive && 'active']">
        <a
          :href="href"
          @click="navigate"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}</a
        >
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["isOpen"],
  data() {
    return {
      links: [
        {
          id: 1,
          title: "Счет",
          path: "/",
          exact: true,
        },
        {
          id: 2,
          title: "История",
          path: "/history",
        },
        {
          id: 3,
          title: "Планирование",
          path: "/planning",
        },
        {
          id: 4,
          title: "Новая запись",
          path: "/record",
        },
        {
          id: 5,
          title: "Категории",
          path: "/categories",
        },
      ],
    };
  },
};
</script>
