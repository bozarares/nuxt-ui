<script setup>
import { UserIcon, TrashIcon } from "@heroicons/vue/24/solid";
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const model = ref(false);

const codeBlock = computed(() => {
	let attributes = "";
	if (loading.value) {
		attributes += " :loading='true'";
	}
	if (disabled.value) {
		attributes += " :disabled='true'";
	}

	let optionsObj = {
		...options.value,
		leftIcon: showLeftIcon.value ? "UserIcon" : undefined,
		rightIcon: showRightIcon.value ? "UserIcon" : undefined,
		color: color.value !== "gray" ? color.value : undefined,
		shape: shape.value !== "rounded" ? shape.value : undefined,
	};

	Object.keys(optionsObj).forEach((key) => {
		if (optionsObj[key] === undefined) {
			delete optionsObj[key];
		}
	});

	let optionsString = "";
	if (Object.keys(optionsObj).length > 0) {
		optionsString = JSON.stringify(optionsObj)
			.replace(/"(\w+)":/g, "$1:") // Elimină ghilimelele din jurul cheilor
			.replace(/"([^"]+)"/g, "'$1'"); // Înlocuiește ghilimelele duble cu simple pentru valorile string
		optionsString = ` :options=${optionsString}`;
	}
	return `<Button${optionsString}${attributes}>${text.value}</Button>`;
});

const docsProps = [
	{
		attribute: "onChange",
		type: "Function",
		description:
			"A callback that will fire when the switch value is changed. :onChange='(value) => {console.log(value);}''",
	},
];
</script>
<template>
	<Head title="Select Input" />

	<div>
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			Select Input
		</h1>
		<p class="text-lg">A simple switch</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>
			<Section title="v-model">
				<p>The v-model is a boolean value can be bound to the Switch element</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UISwitch
						v-model="model"
						:onChange="
							(value) => {
								console.log(value);
							}
						"
					/>
				</div>
				<p class="mt-4 w-full text-justify">v-model: {{ model }}</p>
			</div>
		</Section>

		<!-- <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
