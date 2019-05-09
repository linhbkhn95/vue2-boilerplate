<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">Login</span>
      <div slot="body">
        <form @submit.prevent="login(user)">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope fa-fw"/>
                </span>
              </div>
              <input
                v-model="user.username"
                type="text"
                placeholder="Username"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock fa-fw"/>
                </span>
              </div>
              <input
                v-model="user.password"
                type="password"
                placeholder="Password"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-outline-primary">Login</button>
          </div>
        </form>
      </div>
      <div slot="footer">
        No account?
        <router-link :to="{ name: 'register.index' }">Register</router-link>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login.
 */

import VLayout from "@/layouts/Minimal.vue";
import VCard from "@/components/Card.vue";
// eslint-disable-next-line
import { post } from "../../provider";
export default {
  /**
   * The name of the page.
   */
  name: "LoginIndex",

  /**
   * The components the page can use.
   */
  components: {
    VLayout,
    VCard
  },

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    };
  },

  /**
   * The methods the page can use.
   */
  methods: {
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    async login(user) {
      // this.$store.dispatch('auth/login', user);
      let rs = await post("/auth/login", user);
      if (rs && rs.data && rs.data.code == 0) {
        this.$store.dispatch("auth/login", user);
      } else {
        console.log(rs.data && rs.data.errors);
      }
    }
  }
};
</script>
