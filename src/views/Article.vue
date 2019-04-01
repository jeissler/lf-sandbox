<template>
    <!--<div v-if="article">
        <p>IF ARTICLE</p>
        {{article.title}}
    </div>-->

    <ApolloQuery :query="require('@/graphql/article.gql')" :variables="{ uriFragment: 'live-your-life-in-style-with-great-design' }">
        <template slot-scope="{ result: { loading, data, error } }">
            <div v-if="data">
                <p>DATA</p>
                {{ data.article.title }}
            </div>
            
            <div v-else-if="error">ERROR</div>

            <div v-else>LOADING</div>
        </template>
    </ApolloQuery>
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
}
</script>
