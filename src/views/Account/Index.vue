<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">List Account</span>
      <div slot="body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>User Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users" v-bind:key="index">
              <td>{{ user?user.User.fullname:'gg' }}</td>
              <td>{{ user?user.User.username:',,' }}</td>
              <td>{{ user?user.User.email:'ll' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer">Made with love by Vivid Web</div>
    </v-card>
  </v-layout>
</template>

<script>
/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information.
 */

import VLayout from "@/layouts/Default.vue";
import VCard from "@/components/Card.vue";
// eslint-disable-next-line
import { get } from "../../provider";

export default {
  /**
   * The name of the page.
   */
  name: "AccountIndex",

  /**
   * The components that the page can use.
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
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      users: [
        {
          fullname: null,
          email: null,
          username: "linhtd"
        }
      ]
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
    async fetchData() {
      // eslint-disable-next-line
      let rs = await get("/user");
      if (rs && rs.data && rs.data.code == 0) {
        this.users = rs.data.data;
      } else {
        console.log(rs.data && rs.data.errors);
      }
      // this.$store.dispatch('auth/login', user);
    }
  }
};
</script>
