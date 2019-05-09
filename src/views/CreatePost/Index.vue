<template>
  <v-layout>
    <v-card contextual-style="dark">
      <span slot="header">
        Create Post
      </span>
      <div slot="body">
        <form @submit.prevent="createPost(post)">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope fa-fw"/>
                </span>
              </div>
              <input
                v-model="post.title"
                type="text"
                placeholder="Title for post"
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
                v-model="post.content"
                type="text"
                placeholder="Content for post"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
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

import VLayout from '@/layouts/Minimal.vue';
import VCard from '@/components/Card.vue';
// eslint-disable-next-line
import { post } from '../../provider';
export default {
  /**
   * The name of the page.
   */
  name: 'CreatePost',

  /**
   * The components the page can use.
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
  data() {
    return {
      post: {
        title: 'ff',
        content: 'ffa',
      },
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
    async createPost(data) {
      console.log(data);
      // eslint-disable-next-line
      let rs = await post('/post', data);
      // this.$store.dispatch('auth/login', user);
    },
  },
};
</script>
