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
				}}>Login with GitHub</Button
			>

			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href={resolve('/sign-up')} class="underline">Sign up</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
