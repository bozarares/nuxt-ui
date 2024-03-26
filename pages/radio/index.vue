<script setup>
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const label = ref("This is a checkbox");
const description = ref("");
const color = ref("gray");
const border = ref("rounded");
const disabled = ref(false);
const value = ref("Demo radio");
const model = ref();

const codeBlock = computed(() => {
	let attributes = [];

	if (color.value !== "gray") {
		attributes.push(`color="${color.value}"`);
	}
	if (border.value !== "rounded") {
		attributes.push(`border="${border.value}"`);
	}
	if (label.value) {
		attributes.push(`label="${label.value}"`);
	}
	if (description.value) {
		attributes.push(`description="${description.value}"`);
	}
	if (disabled.value) {
		attributes.push(`:disabled='true'`);
	}

	return `<Checkbox ${attributes.filter(Boolean).join(" ")} />`;
});

const docsProps = [
	{
		attribute: "label",
		type: "String",
		description: "Used for the visible label of the radio.",
	},
	{
		attribute: "name",
		type: "String",
		description: "Defines the name attribute of the radio's input element.",
	},
	{
		attribute: "value",
		type: "String",
		description: "Additional description or explanatory text under the radio label.",
	},
	{
		attribute: "color",
		type: "String",
		description:
			"Color of the radio. Valid values are 'green', 'blue', 'red', 'gray', 'amber', and 'gold'.",
	},
	{
		attribute: "checked",
		type: "Boolean",
		description: "Indicate whether the radio starts checked or not.",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description: "Disables the radio, making it inactive.",
	},
	{
		attribute: "modelValue",
		type: "String",
		description:
			"The v-model should be bound to multiple radio with the same name attribute to work properly and will return the checked value",
	},
];
</script>
<template>
	<Head title="Button" />

	<div class="flex w-full flex-col items-start justify-start">
		<div>
			<h1
				class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
			>
				Radio
			</h1>
		</div>
		<p class="text-lg">
			This component represents a customizable radio that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>

		<Section title="Props">
			<Docs :items="docsProps" />
		</Section>
		<Section title="v-model">
			<p>
				The component will be bound through v-model to multiple radioboxes with the same
				name attribute
			</p>
		</Section>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIRadio
						v-model="model"
						:value="value"
						name="demo"
						:label="label"
						:description="description"
						:border="border"
						:color="color"
						:disabled="disabled"
					/>
					<UIRadio
						v-model="model"
						value="Second Radio"
						name="demo"
						label="Second Radio"
						description="description"
						:border="border"
						:color="color"
						:disabled="disabled"
					/>
				</div>
				<p class="mt-4 w-full text-justify">v-model: {{ model }}</p>
			</div>
		</Section>
		<Section title="Settings">
			<div class="flex w-full flex-wrap justify-evenly">
				<div>
					<h3 class="mt-8 text-lg font-bold">Color</h3>
					<UIRadio label="Gray (default)" value="gray" name="color" v-model="color" />
					<UIRadio label="Red" value="red" name="color" v-model="color" />
					<UIRadio label="Blue" value="blue" name="color" v-model="color" />
					<UIRadio label="Green" value="green" name="color" v-model="color" />
					<UIRadio label="Amber" value="amber" name="color" v-model="color" />
					<UIRadio label="Gold" value="gold" name="color" v-model="color" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Label" v-model="label" />
					<UIInput label="Description" v-model="description" />
					<UIInput label="Value" v-model="value" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Misc</h3>
					<UICheckbox label="Disabled" v-model="disabled" />
				</div>
			</div>
		</Section>
		<!-- <section class="mt-12 w-full">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
