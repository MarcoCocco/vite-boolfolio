<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      projects: [],
    }
  },

  created() {
    this.getProjects();
  },

  methods: {
    getProjects() {
      axios.get('http://127.0.0.1:8000/api/projects').then(res => {
        this.projects = res.data.results;
      })
    }
  }
}
</script>

<template>
  <div class="container pt-4 text-center">
    <h1 class="pb-4">Tutti i progetti</h1>
    <hr>
<table class="table table-striped">
  <thead>
    <th>Titolo</th>
    <th>Slug</th>
    <th>Descrizione</th>
  </thead>

  <tbody>
    <tr v-for="project in projects">
      <td>{{ project.title }}</td>
      <td>{{ project.slug }}</td>
      <td>{{ project.description }}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<style scoped></style>
