<script>
import axios from 'axios';

export default {
    name: 'SingleProject',
    data() {
        return {
            project: [],
            isLoading: true,
            projectFound: false,
            projectSlug: '',
            baseUrl: 'http://127.0.0.1:8000/',
        }
    },

    mounted() {
        this.projectSlug = this.$route.params.slug;
        this.getProject();
    },

    computed: {
        projectImage() {
            if (this.project.project_image === null) {
                return 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
            } else {
                return this.baseUrl + 'storage/' + this.project.project_image;
            }
        }
    },

    methods: {
        getProject() {
            axios.get(this.baseUrl + 'api/projects/' + this.projectSlug).then(res => {
                this.isLoading = false;

                if (res.data.success) {
                    this.project = res.data.project;
                    this.projectFound = true;

                } else {
                    this.projectFound = false;
                }

                document.title = 'Boolfolio - ' + this.project.title;
            });
        }
    }
}
</script>

<template>
    <div v-if="isLoading" id="spinner-container">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else class="details-container">
        <div v-if="projectFound">
            <div class="project-details">
                <div class="title">
                    <img :src="projectImage" class="project-image" alt="Immagine">
                    <h1>{{ project.title }}</h1>
                    <div class="technology-badges">
                        <p v-if="project.technologies == 0"><strong>Nessuna tecnologia specificata</strong></p>
                        <span v-else v-for="technology in project.technologies" class="badge rounded-pill mb-4 me-2"
                            :style="{ backgroundColor: technology.color }">{{ technology.name }}</span>
                    </div>
                </div>
                <div class="details-container p-4">
                    <p class="description">{{ project.description }}</p>
                    <p>Tipologia di progetto: <strong>{{ project.type ? project.type.name : 'Non specificato' }}</strong></p>
                    <p class="text-center"><a :href="project.github_link">GitHub</a></p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-danger" role="alert">
                Nessun progetto trovato
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title {
    position: relative;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;

    h1 {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .technology-badges {
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.project-details {
    .project-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        object-position: center;
        opacity: .5;
    }
}
</style>