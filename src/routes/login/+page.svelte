<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
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
			}}>Login with GitHub</Button
		>

		<div class="mt-4 text-center text-sm">
			Don&apos;t have an account?
			<a href="/sign-up" class="underline">Sign up</a>
		</div>
	</Card.Content>
</Card.Root>
