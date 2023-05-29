<script>
export default {
    name: 'AppProjectCard',
    data() {
        return {
            baseUrl: 'http://127.0.0.1:8000/',
        }
    },

    props: {
        project: Object,
    },

    computed: {
        shortDescription() {
            if (this.project.description.length > 100) {
                return this.project.description.substring(0, 100) + '...';
            } else {
                return this.project.description;
            }
        },

        projectImage() {
            if (this.project.project_image === null) {
                return 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
            } else {
                return this.baseUrl + 'storage/' + this.project.project_image;
            }
        }
    },
}
</script>

<template>
    <div class="container">
        <div class="project card">
            <img :src="projectImage" class="project-image card-img-top" alt="Immagine">
            <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">{{ shortDescription }}</p>
                <hr>
                <p>Tipo: <strong>{{ project.type ? project.type.name : 'Non specificato' }}</strong></p>
                <p>Tecnologie:</p>
                <p v-if="project.technologies == 0"><strong>Nessuna tecnologia specificata</strong></p>
                <span v-else v-for="technology in project.technologies" class="badge rounded-pill mb-4 me-2" :style="{backgroundColor: technology.color}">{{ technology.name }}</span>
                <div class="details">
                    <a href="#" class="btn btn-primary">Dettagli del progetto</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.project.card {
    .project-image {
        height: 300px;
        object-fit: cover;
        object-position: center;
    }
}
</style>