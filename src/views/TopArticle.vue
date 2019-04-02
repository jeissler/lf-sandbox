<template>
    <div>
        <ApolloQuery :query="require('@/graphql/topArticle.gql')" :variables="{ uriFragment: 'food-and-drink' }">
        <template slot-scope="{ result: { loading, data, error } }">
            <div v-if="data">
                <p>DATA</p>
                {{ data.topArticle.title }}
            </div>
            
            <div v-else-if="error">ERROR</div>

            <div v-else>LOADING</div>
        </template>
    </ApolloQuery>
    
    <button @click="handleSwitch">Switch Slug</button>

    <br>

    </div>
</template>

<script>
export default {
    data() {
        
    },
    methods: {
        handleSwitch() {
            this.$store.commit("CHANGE_SLUG");
        }
    }
}
</script>
