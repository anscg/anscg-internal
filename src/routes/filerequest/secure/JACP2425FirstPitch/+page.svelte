<script>
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

	registerPlugin(FilePondPluginFileValidateType);

	let pond;
	let name = 'filepond';

	


	function handleInit() {
		console.log('FilePond has initialised');
	}

	function handleAddFile(err, fileItem) {
		console.log('A file has been added', fileItem);
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <h2>
		<strong>Anson Chung</strong> is requesting the following file
	</h2>
	<h1>
		Deck of JACP 24-25 First Pitching
	</h1>

	<FilePond
        bind:this={pond}
        {name}
        server="/api/upload/JACP2425FirstPitch"
        allowMultiple={false}
        oninit={handleInit}
        onaddfile={handleAddFile}
		acceptedFileTypes={[".pptx"]}
		allowFileTypeValidation={false}
    />

	<h2>
		Only <strong>PowerPoint Presentation (.pptx)</strong> files are accepted.
	</h2>

	<button class="button-20" disabled=true>Submit</button>

</section>



<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: .8;
	}

	h1 {
		width: 100%;
	}

	.button-20 {
	  appearance: button;
	  background-color: #4D4AE8;
	  background-image: linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));
	  border: 1px solid #4D4AE8;
	  border-radius: 1rem;
	  box-shadow: rgba(255, 255, 255, 0.15) 0 1px 0 inset,rgba(46, 54, 80, 0.075) 0 1px 1px;
	  box-sizing: border-box;
	  color: #FFFFFF;
	  cursor: pointer;
	  display: inline-block;
	  font-family: Inter,sans-serif;
	  font-size: 1rem;
	  font-weight: 500;
	  line-height: 1.5;
	  margin: 0;
	  padding: .5rem 1rem;
	  text-align: center;
	  text-transform: none;
	  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
	  user-select: none;
	  -webkit-user-select: none;
	  touch-action: manipulation;
	  vertical-align: middle;
	}

	.button-20:focus:not(:focus-visible),
	.button-20:focus {
	  outline: 0;
	}

	.button-20:hover {
	  background-color: #3733E5;
	  border-color: #3733E5;
	}

	.button-20:active {
	  background-color: #3E3BBA;
	  background-image: none;
	  border-color: #3A38AE;
	  box-shadow: rgba(46, 54, 80, 0.125) 0 3px 5px inset;
	}


	.button-20:disabled {
	  background-image: none;
	  cursor: not-allowed;
	  background-color: #8c8bb6;
	  border: 1px solid #c9c8e3;
	  box-shadow: none;
	  opacity: .65;
	  pointer-events: none;
	}
</style>
