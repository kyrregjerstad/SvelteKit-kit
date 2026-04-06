<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { resolve } from '$app/paths';
</script>

<div class="flex min-h-svh items-center justify-center p-4">
	<Card.Root class="w-full max-w-sm">
		<Card.Content class="pt-6">
			<Button
				variant="outline"
				class="w-full"
				onclick={async () => {
					await signIn.social({
						provider: 'github',
						callbackURL: '/'
					});
				}}>Sign up with GitHub</Button
			>

			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href={resolve('/login')} class="underline">Login</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
