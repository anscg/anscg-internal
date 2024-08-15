<script>
	import '../app.css';
</script>

<div class="app">

	<main>
		<slot />
	</main>

	<footer>
		<p>Internal systems made by <a href="https://www.instagram.com/kryptic.icqm/">Anson Chung</a>.</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	@keyframes fadeIn {
	  0% { opacity: 0; }
	  100% { opacity: 1; }
	}



	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		animation: fadeIn cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
