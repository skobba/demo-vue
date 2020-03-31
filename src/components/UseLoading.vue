<script>
import { useQuery, useQueryLoading } from '@vue/apollo-composable'

export default {
  setup () {
    const { result: one } = useQuery(...)
    const { result: two } = useQuery(...)
    const loading = useQueryLoading()

    return {
      one,
      two,
      loading,
    }
  }
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    {{ one }}
    {{ two }}
  </div>
</template>