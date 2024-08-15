<script>
	import FilePond, { registerPlugin, supported } from 'svelte-filepond';
	import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

	registerPlugin(FilePondPluginFileValidateType);

	let pond;
	let submitButton;
	let name = 'filepond';

	function handleProcessFiles() {
		submitButton.disabled = false;
	}

</script>

<svelte:head>
	<title>File Submission</title>
	<meta name="description" content="Anson Chung is requesting a file." />
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
		server={{
			process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
				const presignurl = await fetch("/api/upload/JACP2425FirstPitch", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: crypto.randomUUID() + file.name,
				});
				if (presignurl.ok) {
					const url = await presignurl.text();
					//const uploadRequest = new Request(url, {
					//	method: "POST",
					//	headers: {
					//		"Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
					//	},
					//	mode: 'cors',
					//	cache: 'no-store',
					//	body: await file.arrayBuffer(),
					//});
					
					const request = new XMLHttpRequest();
            		request.open('PUT', url);
					request.upload.onprogress = (e) => {
                		progress(e.lengthComputable, e.loaded, e.total);
            		};
					request.onload = function () {
		                if (request.status >= 200 && request.status < 300) {
		                    load("200");
		                } else {
		                    error('oh no');
		                }
		            };

					request.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
					request.send(await file.arrayBuffer());
					
					//const response = await fetch(uploadRequest);
					//if (response.ok) {
					//	console.log("File uploaded successfully");
					//} else {
					//	console.error("Failed to upload file");
					//}
					return {
                		abort: () => {
                		    request.abort();
                		    abort();
                		},
            		};

				} else {
					console.error("Failed to get presigned URL");
					abort();
				}
			}
		}}
        allowMultiple={false}
		onprocessfiles={handleProcessFiles}
		acceptedFileTypes={[".pptx"]}
		allowFileTypeValidation={false}
    />

	<h2>
		Only <strong>PowerPoint Presentation (.pptx)</strong> files are accepted.
	</h2>

	<button bind:this={submitButton} class="button-20" disabled=true onclick="location.href='/filerequest/SubmissionSuccess';">Submit</button>

</section>



<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: .9;
		animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards;
		filter: blur(1rem);
		scale: 1.3;
		opacity: 0.1;
	}

	@keyframes fadeIn {
	  0% { filter: blur(1rem); scale: 1.3; opacity: 0.8; }
	  100% { filter: blur(0rem); scale: 1; opacity: 1; }
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
	  cursor: default;
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
