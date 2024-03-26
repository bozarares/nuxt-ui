<template>
	<section class="mt-12 w-full">
		<h2 class="mb-6 text-xl font-semibold">{{ title }}</h2>
		<div class="bg-white">
			<div class="space-y-2 text-justify">
				<slot />
			</div>
		</div>
	</section>
</template>

<script setup>
const props = defineProps(["title"]);
</script>
