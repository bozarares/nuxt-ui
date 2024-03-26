<script setup>
import { HeartIcon } from "@heroicons/vue/24/solid";
</script>

<template>
	<header class="fixed top-0 z-50 w-full border-b-2 border-blue-300 bg-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-8">
			<NuxtLink
				exact-active-class="navbar-home-active"
				to="/"
				class="m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-4xl font-extrabold text-transparent"
			>
				{{ `UI` }}
			</NuxtLink>
			<div>
				<HeartIcon class="h-6 w-6 text-blue-500" />
			</div>
		</div>
	</header>
</template>
