<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        My Post
      </span>
      <div slot="body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
               Title
              </th>
              <th>
                Content
              </th>
              <th>
                Author
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post,index) in posts"  v-bind:key="index">
              <td  >
                {{post?post['Post'].title:''}}
              </td>
              <td>
                {{post?post['Post'].content:''}}
              </td>
              <td>
                {{post?post['Post'].author:''}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer">
        Made with love by Vivid Web
      </div>
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

import VLayout from '@/layouts/Default.vue';
import VCard from '@/components/Card.vue';
// eslint-disable-next-line
import { get } from '../../provider';

export default {
  /**
   * The name of the page.
   */
  name: 'PostIndex',

  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    VCard,
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
      posts: [{
        title: null,
        content: null,
        author: 'linhtd',
      }],
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
      let rs = await get("/posts");
      if (rs && rs.data && rs.data.code === 0) {
        this.posts = rs.data.data;
      } else {
        console.log(rs.data && rs.data.errors);
      }
      // this.$store.dispatch('auth/login', user);
    },
  }
};
</script>
