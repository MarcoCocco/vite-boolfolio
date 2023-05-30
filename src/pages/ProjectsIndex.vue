<script>
import axios from 'axios';
import AppProjectCard from '../components/AppProjectCard.vue';

export default {
    name: 'ProjectsIndex',
    data() {
        return {
            projects: [],

            currentPage: 1,
            lastPage: 0,

        }
    },

    created() {
        this.getProjects();
    },

    methods: {
        getProjects() {
            axios.get('http://127.0.0.1:8000/api/projects?page=' + this.currentPage).then(res => {
                console.log(res.data.results.data)
                this.projects = res.data.results.data;
                this.lastPage = res.data.results.last_page;

            });
        },

        nextPage() {
            if (this.currentPage < this.lastPage) {
                this.currentPage++;
                this.getProjects();
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getProjects();
            }
        },
    },

    components: { AppProjectCard }
}
</script>

<template>
    <main class="container py-5">
        <h1 class="text-center p-4">Tutti i miei progetti</h1>
        <hr>
        <div v-if="projects.length > 0" class="projects pt-2 text-center">
            <div class="row">
                <div v-for="project in projects" class="col-6 mb-2">
                    <AppProjectCard :project="project"></AppProjectCard>
                </div>
            </div>
        </div>
        <div v-else class="loading-screen">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="page-buttons d-flex justify-content-center gap-4">
            <button @click="prevPage()" class="btn btn-primary">Prev</button>
            <button @click="nextPage()" class="btn btn-primary">Next</button>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 670px;
}

.projects {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
}
</style>
