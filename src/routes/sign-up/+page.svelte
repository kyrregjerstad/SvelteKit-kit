<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign Up</Card.Title>
		<Card.Description>Create a new account to get started</Card.Description>
	</Card.Header>
	<Card.Content>
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
			<a href="/login" class="underline">Login</a>
		</div>
	</Card.Content>
</Card.Root>