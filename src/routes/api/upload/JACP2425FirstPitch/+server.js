import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function POST({ url }) {
    console.log(url)
	return new Response('ok', { status: 200 });
}