<script setup>
import { PencilIcon, UserIcon } from "@heroicons/vue/24/outline";
import { cva } from "class-variance-authority";
const props = defineProps({
	id: {
		type: String,
		default: null,
	},
	src: {
		type: String,
		default: null,
	},
	name: {
		type: String,
		default: null,
	},
	acronym: {
		type: String,
		default: null,
	},
	size: {
		type: String,
		validator: (val) => ["small", "normal", "big", "2xl"].includes(val),
		default: "normal",
	},
	border: {
		type: String,
		validator: (val) => ["square", "rounded", "circle"].includes(val),
		default: "circle",
	},
	as: { type: [String, Object], default: "button" },
	href: String,
	editMode: {
		type: Boolean,
		default: false,
	},
	editClick: {
		type: Function,
		default: () => {},
	},
	editButtonId: {
		type: String,
		default: null,
	},
});
const getAcronym = computed(() => {
	if (!props.name) return;
	const splitName = props.name.split(" ");
	let acronym = "";

	for (let i = 0; i < splitName.length; i++) {
		if (i < 2) {
			// Only get the first two letters of the first two words
			acronym += splitName[i].charAt(0).toUpperCase();
		}
	}

	return acronym;
});
const avatarClass = computed(() => {
	return cva(
		"flex cursor-default items-center justify-center overflow-hidden border-2 border-zinc-500 bg-gradient-to-br from-white to-zinc-300 font-bold tracking-normal text-zinc-700 shadow-sm duration-150 ease-in-out hover:transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:transition dark:border-zinc-100 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100",
		{
			variants: {
				size: {
					small: "h-10 min-h-10 w-10 min-w-10 text-xl",
					normal: "h-12 min-h-12 w-12 min-w-12 text-2xl",
					big: "h-16 min-h-16 w-16 min-w-16 text-2xl",
					"2xl": "h-24 min-h-24 w-24 min-w-24 text-3xl",
				},
				border: {
					square: "rounded-none",
					rounded: "rounded-md",
					circle: "rounded-full",
				},
			},
		}
	)({ size: props.size, border: props.border });
});
</script>

<template>
	<div class="relative">
		<component :is="props.as" :href="props.href" :class="avatarClass" :id="props.id">
			<img
				class="h-full w-full scale-125 object-cover"
				v-if="props.src"
				:src="props.src"
				alt=""
			/>
			<div v-else-if="props.name" class="select-none leading-10">
				{{ getAcronym }}
			</div>
			<div v-else-if="props.acronym" class="select-none leading-10">
				{{ props.acronym }}
			</div>
			<component v-else class="w-2/3" :is="UserIcon"></component>
			<div
				v-if="editMode"
				:id="props.editButtonId"
				@click="editClick"
				class="pointer-events-auto absolute -bottom-2 -left-2 box-content flex h-8 w-8 !cursor-pointer items-center justify-center rounded-full border-4 border-white bg-zinc-900 text-white dark:border-zinc-800 dark:bg-zinc-200 dark:text-zinc-800"
			>
				<component :is="PencilIcon" class="w-6"></component>
			</div>
		</component>
	</div>
</template>
