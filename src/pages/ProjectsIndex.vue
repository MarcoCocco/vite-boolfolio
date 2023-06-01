<script>
import axios from 'axios';
import AppProjectCard from '../components/AppProjectCard.vue';

export default {
    name: 'ProjectsIndex',
    data() {
        return {
            apiURL: 'http://127.0.0.1:8000/api/projects?page=1',
            projects: [],
            pagination: {},
            types: [],
            selectedTypeId: '',
            projectsFound: false,
            isLoading: true,
        }
    },

    created() {
        this.getProjects(this.apiURL);
    },

    methods: {
        getProjects(apiURL) {
            apiURL = apiURL + '&type_id=' + this.selectedTypeId;
            
            axios.get(apiURL).then(res => {
                this.isLoading = false;

                if (res.data.success) {
                    this.projects = res.data.results.data;
                    this.pagination = res.data.results;
                    this.types = res.data.types;
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
    <main>
        <div class="main-top container py-2">
            <h1 class="text-center p-2">I miei progetti</h1>
            <form @submit.prevent="" action="">
                <select class="form-select" name="type_id" id="type_id" @change="getProjects(apiURL)"
                    v-model="selectedTypeId">
                    <option value="">Tutte</option>
                    <option v-for="typology in types" :value="typology.id">{{ typology.name }}</option>
                </select>
            </form>
        </div>
        <hr>
        <div class="project-cards container">
            <div v-if="!isLoading" class="projects pt-2 text-center">
                <div v-if="projectsFound" class="row">
                    <div v-for="project in projects" class="col-4 mb-2">
                        <AppProjectCard :project="project"></AppProjectCard>
                    </div>
                </div>
                <div v-else>
                    <div class="alert" role="alert">
                        <p>Nessun progetto trovato</p>
                    </div>
                </div>
                <hr>
                <div class="navigation">
                    <button v-for="link in pagination.links" class="btn"
                        :class="link.active ? 'btn-primary' : 'btn-outline-secondary'" v-html="link.label"
                        :disabled="link.url == null ? true : false" @click="getProjects(link.url)">

                    </button>
                </div>
            </div>
            <div v-else class="loading-screen">
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
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

.navigation {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
