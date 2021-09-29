<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('burgerClicked')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">12.12.12</span>
      </div>
    </div>
  </nav>
</template>
