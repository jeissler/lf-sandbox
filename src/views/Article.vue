<template>
    <!--<div v-if="article">
        <p>IF ARTICLE</p>
        {{article.title}}
    </div>-->

    <div>
        <ApolloQuery :query="require('@/graphql/article.gql')" :variables="{ uriFragment: this.$store.getters.getSlug }">
        <template slot-scope="{ result: { loading, data, error } }">
            <div v-if="data">
                <p>DATA</p>
                {{ data.article.title }}
            </div>
            
            <div v-else-if="error">ERROR</div>

            <div v-else>LOADING</div>
        </template>
    </ApolloQuery>
    
    <button @click="handleSwitch">Switch Slug</button>

    <br>

    {{ this.$store.state.slug }}
    </div>
</template>

<script>
export default {
    /*data() {
        return {
            loading: true,
            article: ""
        };
    },
    apollo: {
        article: {
            query: require("@/graphql/article.gql"),
            variables() {
                return {
                    uriFragment: "fit-to-last"
                }
            }
        }
    }*/

    data() {
        return {
            querySlug: this.$store.state.slug
        }
    },
    methods: {
        handleSwitch() {
            this.$store.commit("CHANGE_SLUG");
        }
    }
}
</script>
