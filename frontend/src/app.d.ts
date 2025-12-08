// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	
	// Déclaration pour Facebook SDK
	interface Window {
		FB?: {
			XFBML: {
				parse: () => void;
			};
		};
	}
}

export {};