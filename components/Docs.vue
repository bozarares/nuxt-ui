<template>
	<ul class="space-y-2 text-justify list-inside">
		<li v-for="(item, index) in items" :key="index">
			<strong
				>{{ item.attribute }}
				<span v-if="item.type">
					(<span class="text-blue-500">{{ item.type }}</span
					>) </span
				>:</strong
			>
			{{ item.description }}
			<div v-if="item.value && Array.isArray(item.value)">
				<!-- Recursivitatea componentei pentru a afișa sub-elemente cu o bară verticală albastră -->
				<ul class="pl-8 border-l-2 border-blue-300">
					<Docs :items="item.value" />
				</ul>
			</div>
			<div v-else-if="item.value">{{ item.value }}</div>
		</li>
	</ul>
</template>

<script setup>
const props = defineProps({
	items: Array,
});
</script>
