<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link :to="{ name: 'home.index' }" class="navbar-brand">Blog GHTK</router-link>

      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"/>
      </button>

      <div :class="{ show : menuCollapsed}" class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link :to="{ name: 'home.index' }" active-class="active" class="nav-item" tag="li">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            :to="{ name: 'account.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">Account</a>
          </router-link>
           <router-link
            :to="{ name: 'post.index' }"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">Post</a>
          </router-link>
        </ul>
        <span class="navbar-text">
          <a class="btn btn-secondary" href="#" @click.prevent="logout">
            <i class="fa fa-sign-out"/>
          </a>
        </span>
      </div>
    </nav>

    <div class="container pt-4">
      <div class="row">
        <div class="col col-12">
          <!-- Content will be placed here -->
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages.
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */
// eslint-disable-next-line
import { post,get } from "../provider";
export default {
  /**
   * The name of the layout.
   */
  name: "DefaultLayout",

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      menuCollapsed: false
    };
  },
  mounted() {
    this.setCurrentUser();
  },
  /**
   * The methods that the layout can use.
   */
  methods: {
    /**
     * Will log the user out.
     */
    async logout() {
      let rs = await post("/auth/logout");
      if (rs && rs.data && rs.data.code == 0) {
        this.$store.dispatch("auth/logout");
      } else {
        console.log(rs.data && rs.data.errors);
      }
    },

    /**
     * Will toggle the menu.
     */
    toggleMenu() {
      this.menuCollapsed = !this.menuCollapsed;
    },
    async setCurrentUser(){
         let rs = await get("/auth/me");
      if (rs && rs.data && rs.data.code == 0) {
        this.$store.dispatch("auth/setCurrentUer",rs.data.data);
      } else {
        this.$store.dispatch("auth/logout");
        console.log(rs.data && rs.data.errors);
      }
    }
  }
};
</script>
