<script>
import axios from 'axios';
import AppProjectCard from './components/AppProjectCard.vue';
export default {
  name: "App",
  data() {
    return {
      projects: [],
    };
  },
  created() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      axios.get("http://127.0.0.1:8000/api/projects").then(res => {
        this.projects = res.data.results;
      });
    }
  },
  components: { AppProjectCard }
}
</script>

<template>
  <div class="container pt-4 text-center">
    <h1 class="pb-4">Tutti i progetti</h1>
    <hr>
    <div class="row">
      <div v-for="project in projects" class="col-6 mb-5">
        <AppProjectCard :project="project"></AppProjectCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
