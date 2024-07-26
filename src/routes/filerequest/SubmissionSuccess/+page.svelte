<script>
    import { confetti } from '@neoconfetti/svelte';
</script>

<main>
    <h1>Success!</h1>
    <p>Your file has been successfully uploaded and submitted.</p>
</main>

<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			particleCount: 40,
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	></div>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
        font-family: Arial, sans-serif;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
</style>