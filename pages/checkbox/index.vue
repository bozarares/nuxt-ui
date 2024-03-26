<script setup>
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const label = ref("This is a checkbox");
const description = ref("");
const color = ref("gray");
const border = ref("rounded");
const disabled = ref(false);

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
		description: "Used for the visible label of the checkbox.",
	},
	{
		attribute: "name",
		type: "String",
		description: "Defines the name attribute of the checkbox's input element.",
	},
	{
		attribute: "value",
		type: "String",
		description:
			"Value associated with the checkbox; this is especially important when v-model is an array.",
	},
	{
		attribute: "description",
		type: "String",
		description: "Additional description or explanatory text under the checkbox label.",
	},
	{
		attribute: "color",
		type: "String",
		description:
			"Color of the checkbox. Valid values are 'green', 'blue', 'red', 'gray', 'amber', and 'gold'.",
	},
	{
		attribute: "border",
		type: "String",
		description:
			"Style of the checkbox's border. Options are 'square', 'rounded', and 'circle'.",
	},
	{
		attribute: "checked",
		type: "Boolean",
		description: "Indicate whether the checkbox starts checked or not.",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description: "Disables the checkbox, making it inactive.",
	},
];
</script>
<template>
	<div class="flex w-full flex-col items-start justify-start">
		<div>
			<h1
				class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
			>
				Checkbox
			</h1>
		</div>
		<p class="text-lg">
			This component represents a customizable checkbox that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>

		<Section title="Props">
			<Docs :items="docsProps" />
		</Section>
		<Section title="v-model">
			<p>
				The component can be bound through v-model to a boolean variable to retain the state
				of a single checkbox. In cases
			</p>
			<p>
				where multiple grouped checkboxes are used, v-model can be bound to an array. The
				component will add or remove the specific value of the checkbox from the array,
				depending on the checkbox's checked state.
			</p>
		</Section>

		<Section title="Demo">
			<div class="flex w-full flex-col items-center rounded-lg border p-4">
				<div class="flex items-center justify-center">
					<UICheckbox
						:label="label"
						:description="description"
						:border="border"
						:color="color"
						:disabled="disabled"
					/>
				</div>
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
				<div>
					<h3 class="mt-8 text-lg font-bold">Border</h3>
					<UIRadio
						label="Rounded (default)"
						value="rounded"
						name="border"
						v-model="border"
					/>
					<UIRadio label="Square" value="square" name="border" v-model="border" />
					<UIRadio label="Circle" value="circle" name="border" v-model="border" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Label" v-model="label" />
					<UIInput label="Description" v-model="description" />
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
