<script setup></script>

<template>
	<div
		class="container flex h-auto w-64 flex-col border-r-2 border-blue-300 bg-white py-8 font-normal text-zinc-500"
	>
		<div class="text-lg font-extrabold">Getting Started</div>
		<NuxtLink to="/" class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800">
			Home
		</NuxtLink>
		<div class="text-lg font-extrabold">Elements</div>
		<NuxtLink
			to="avatar"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Avatar
		</NuxtLink>
		<NuxtLink
			to="button"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Button
		</NuxtLink>
		<NuxtLink
			to="checkbox"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Checkbox
		</NuxtLink>
		<NuxtLink
			to="datetime"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			DateTime
		</NuxtLink>
		<NuxtLink
			to="dropdown"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			DropDown
		</NuxtLink>
		<NuxtLink
			to="input"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Input
		</NuxtLink>
		<NuxtLink
			to="radio"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Radio
		</NuxtLink>
		<NuxtLink
			to="searchinput"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Search Input
		</NuxtLink>
		<NuxtLink
			to="select"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Select
		</NuxtLink>
		<NuxtLink
			to="selectinput"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Select Input
		</NuxtLink>
		<NuxtLink
			to="switch"
			class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800"
		>
			Switch
		</NuxtLink>
		<p class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800">
			Timeline (WiP)
		</p>
		<p class="w-full select-none px-2 py-2 transition-colors hover:text-zinc-800">
			Toast (WiP)
		</p>
	</div>
</template>

<style>
.router-link-exact-active {
	@apply text-blue-500 hover:text-blue-500;
}
</style>
