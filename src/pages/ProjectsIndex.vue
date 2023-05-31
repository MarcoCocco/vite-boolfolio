<script>
import axios from 'axios';
import AppProjectCard from '../components/AppProjectCard.vue';

export default {
    name: 'ProjectsIndex',
    data() {
        return {
            projects: [],
            currentPage: 1,
            types: [],
            selectedTypeId: '',
            projectsFound: false,
            isLoading: true,
        }
    },

    created() {
        this.getProjects();
    },

    methods: {
        getProjects() {
            axios.get('http://127.0.0.1:8000/api/projects?page=' + this.currentPage + '&type_id=' + this.selectedTypeId).then(res => {

                this.isLoading = false;

                if (res.data.success) {
                    this.projects = res.data.results;
                    this.types = res.data.allTypes;
                    this.projectsFound = true;
                } else {
                    this.projectsFound = false;
                }
            });
        },
    },

    components: { AppProjectCard }
}
</script>

<template>
    <main class="container py-5">
        <h1 class="text-center p-4">Tutti i miei progetti</h1>
        <form @submit.prevent="" action="">
            <select class="form-select" name="type_id" id="type_id" @change="getProjects()" v-model="selectedTypeId">
                <option value="">Tutte</option>
                <option v-for="typology in types" :value="typology.id">{{ typology.name }}</option>
            </select>
        </form>
        <hr>
        <div v-if="!isLoading" class="projects pt-2 text-center">
            <div v-if="projectsFound" class="row">
                <div v-for="project in projects" class="col-6 mb-2">
                    <AppProjectCard :project="project"></AppProjectCard>
                </div>
            </div>
            <div v-else>
                <div class="alert alert-warning" role="alert">
                    Nessun progetto trovato
                </div>
            </div>
        </div>
        <div v-else class="loading-screen">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
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
