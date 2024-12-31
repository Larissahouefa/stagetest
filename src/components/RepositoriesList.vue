<template>
	<div class="repository-view">
		<header class="header">
			<h1>Trending Repos</h1>
			<input
				type="text"
				placeholder="Search..."
				v-model="query"
				@input="loadRepositories" />
		</header>

		<div class="repository-list">
			<!-- Affiche un message si aucun résultat n'est disponible -->
			<div v-if="filteredRepositories.length === 0">No repositories found.</div>

			<!-- Affiche la liste des dépôts filtrés -->
			<div
				v-for="repo in filteredRepositories"
				:key="repo.id"
				class="repository-item">
				<div class="repository-image">[Image Placeholder]</div>
				<div class="repository-details">
					<h2 class="repository-name">{{ repo.name }}</h2>
					<p class="repository-description">{{ repo.description }}</p>
					<a :href="repo.html_url" target="_blank">{{ repo.html_url }}</a>
					<div class="repository-meta">
						<span>Stars: {{ repo.stargazers_count }}</span>
						<span>Issues: {{ repo.open_issues_count }}</span>
						<span>Submitted by {{ repo.owner.login }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from "../services/api";

export default {
	data() {
		return {
			repositories: [], // Liste des dépôts, initialement vide
			query: "vuejs", // Mot-clé par défaut
		};
	},
	computed: {
		filteredRepositories() {
			if (!this.query) return this.repositories; // Retourne tous les dépôts si aucune requête
			return this.repositories.filter(
				(repo) =>
					repo.name?.toLowerCase().includes(this.query.toLowerCase()) ||
					repo.description?.toLowerCase().includes(this.query.toLowerCase())
			);
		},
	},
	methods: {
		async loadRepositories() {
			try {
				const response = await api.fetchRepositories(this.query);
				this.repositories = response.data.items || []; // Vérifie que `items` existe
			} catch (error) {
				console.error("Erreur lors de la récupération des dépôts:", error);
				this.repositories = []; // Réinitialise la liste en cas d'erreur
			}
		},
	},
	mounted() {
		this.loadRepositories();
	},
};
</script>

<style scoped>
.repository-view {
	font-family: Arial, sans-serif;
	padding: 20px;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.header h1 {
	margin: 0;
}

.header input {
	padding: 10px;
	font-size: 14px;
	width: 300px;
}

.repository-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.repository-item {
	display: flex;
	gap: 15px;
	border: 1px solid #ddd;
	padding: 15px;
	border-radius: 5px;
	background-color: #f9f9f9;
}

.repository-image {
	width: 100px;
	height: 100px;
	background-color: #eaeaea;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	color: #666;
}

.repository-details {
	flex: 1;
}

.repository-name {
	margin: 0 0 10px;
	font-size: 18px;
}

.repository-description {
	margin: 0 0 10px;
	color: #555;
}

.repository-meta {
	display: flex;
	gap: 10px;
	font-size: 12px;
	color: #888;
}

.repository-view {
	width: 80%;
	margin: auto;
}
</style>
