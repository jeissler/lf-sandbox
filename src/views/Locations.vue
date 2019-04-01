<template>
    <main>
        <h1>TEST SSR</h1>
        
        <div>
            <ul>
                <li v-for="(loc, i) in locations" :key="i">
                    {{loc.city}} {{loc.state}}
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            locations: ""
        };
    },
    apollo: {
        locations: {
            query: require("@/graphql/locations.gql")
        }
    }
}
</script>
