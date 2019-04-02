<template>
    <ApolloQuery :query="require('@/graphql/topArticles.gql')" :variables="{ location: {
        lat: 38.944,
        lon: -94.2881
    } }">
    <template slot-scope="{ result: { loading, data, error } }">
      <!-- outer container for full width bg images -->
      <main class="curtain" :class="curtainClasses">
        <template v-if="data">
          <!-- panel bgs TODO: replace w/ responsive picture OR srcset -->
          <img v-for="(panel, i) in data.topArticles.items" :key="i" :class="'curtain__bg curtain__bg--' + i" :src="panel.featuredPhoto.url" />

          <!-- panels inner container -->
          <div class="container curtain__container">
            <!-- panels items -->
            <article v-for="(panel, i) in data.topArticles.items" :key="i" class="curtain__panel" :class="panelClasses(i)" @click="togglePanel(i)">
              <!-- panel collapsed state -->
              <div class="curtain__panel__label">
                
                <h1>{{ panel.categories[0].name }}</h1>
              </div>

              <!-- panel expanded state -->
              <div class="curtain__panel__content">
                
                <h2>{{ panel.title }}</h2>
                <p>{{ panel.subtitle }}</p>
                <div class="flex flex-wrap items-center justify-between mb-20 lg:flex-col lg:items-start">
                  <router-link
                    class="btn btn-solid mt-40 mr-20"
                    :to="`/local-living/${panel.categories[0].uriFragment}/${panel.uriFragment}`"
                  >
                    Read
                  </router-link>
                  <a href="#" class="mt-40 lg:mt-50">
                    See All {{ panel.categories[0].name }}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </template>

        <h1 v-if="loading">LOADING</h1>
        <h1 v-if="error">ERROR</h1>
      </main>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  data() {
    return {
      selectedId: "",
      curtainOpen: false
    };
  },
  methods: {
    togglePanel(selected) {
      this.curtainOpen = true;
      this.selectedId = selected;
    },
    closePanel() {
      this.curtainOpen = false;
      this.selectedId = "";
    },
    panelClasses(selected) {
      const classes = [`curtain__panel--${selected}`];

      if (this.selectedId === selected) {
        classes.push("curtain__panel--isopen");
      }
      return classes;
    }
  },
  computed: {
    curtainClasses() {
      if (this.$apollo.loading) {
        return ["curtain--isloading", "curtain--isclosed"];
      } else if (this.curtainOpen) {
        return ["curtain--isopen", `curtain__panel--${this.selectedId}--isopen`];
      } else {
        return "curtain--isclosed";
      }
    }
  }
};
</script>