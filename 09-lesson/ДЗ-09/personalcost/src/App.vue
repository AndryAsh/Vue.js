<template>
  <v-app>
    <v-app-bar app color="#ffffff">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <v-btn class="font-weight-bold" x-large plain :ripple="false" to="/">
          Home
        </v-btn>
        <!-- <v-spacer></v-spacer> -->
        <v-btn
          class="font-weight-bold"
          x-large
          plain
          :ripple="false"
          to="/about"
        >
          About
        </v-btn>
      </div>
      <!-- <v-app-bar-title class="page-header">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo.png"
            transition="scale-transition"
            width="40"
          />
          <router-link to="/">
            <span class="text-h4 text-sm-h4 pb-4 page-header__title"
              >my personal costs</span
            >
          </router-link>
        </div>
      </v-app-bar-title> -->
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
  <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app> -->
</template>

<script>
</script>

<style lang="scss">
$grey: #aeaeae;
$lihgt-grey: #dadada;
$dark-grey: #696969;
$green: #25a79a;
$white: #ffffff;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  vertical-align: middle; */
  color: $dark-grey;
}

a {
  text-decoration: none;
  color: $white;
}

.page-header {
  &__title {
    text-transform: uppercase;
    font-weight: bold;
    color: $dark-grey;
  }
}
</style>
