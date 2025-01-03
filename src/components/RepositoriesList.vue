<template>
	<div class="repository-view">
		<header class="header">
			<h1>Trending Repos</h1>
			<input
				type="text"
				placeholder="Search..."
				v-model="query"
				@input="resetAndLoadRepositories" />
		</header>

		<div class="repository-list">
			<!-- <div v-if="repositories.length === 0">No repositories found.</div> -->

			<div v-for="repo in repositories" :key="repo.id" class="repository-item">
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

		<footer class="pagination">
			<button @click="prevPage" :disabled="currentPage === 1">Previous</button>
			<span>Page {{ currentPage }}</span>
			<button @click="nextPage">Next</button>
		</footer>
	</div>
</template>

<script>
import api from "../services/api";

export default {
	data() {
		return {
			repositories: [], // Liste des dépôts
			query: "", // Mot-clé de recherche
			currentPage: 1, // Page actuelle
			perPage: 10, // Nombre de dépôts par page
		};
	},
	methods: {
		async loadRepositories() {
			try {
				const response = await api.fetchRepositories(
					this.query,
					"",
					this.currentPage,
					this.perPage
				);
				this.repositories = response.data.items || [];
			} catch (error) {
				console.error("Erreur lors de la récupération des dépôts:", error);
				this.repositories = [];
			}
		},
		resetAndLoadRepositories() {
			this.currentPage = 1; // Réinitialiser à la première page
			this.loadRepositories();
		},
		nextPage() {
			this.currentPage++;
			this.loadRepositories();
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
				this.loadRepositories();
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
	width: 80%;
	margin: auto;
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

.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	gap: 10px;
}

.pagination button {
	padding: 10px 15px;
	font-size: 14px;
}

.pagination span {
	font-size: 14px;
}
</style>
