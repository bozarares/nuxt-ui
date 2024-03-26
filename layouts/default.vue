<script setup>
const test = true;
</script>

<template>
	<Navbar />
	<div class="px-4 sm:px-8 lg:px-48 pt-[58px]">
		<div class="flex h-auto w-full flex-row justify-center gap-8">
			<Sidebar />
			<main class="flex min-h-screen w-full flex-col items-center rounded bg-white px-4 py-8">
				<slot />
			</main>
		</div>
	</div>
</template>
