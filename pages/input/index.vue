<script setup>
import { UserIcon } from "@heroicons/vue/24/solid";
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const label = ref("Input element");
const error = ref("");
const model = ref("");
const border = ref("bordered");
const size = ref("default");
const type = ref("text");
const disabled = ref(false);
const options = computed(() => {
	return {
		leftIcon: showLeftIcon.value === true ? icon : null,
		rightIcon: showRightIcon.value === true ? icon : null,
		color: color.value,
		shape: shape.value,
	};
});

const codeBlock = computed(() => {
	let attributes = "";
	if (loading.value) {
		attributes += " :loading='true'";
	}
	if (disabled.value) {
		attributes += " :disabled='true'";
	}

	// Construiește obiectul opțiunilor fără valorile implicite
	let optionsObj = {
		...options.value,
		leftIcon: showLeftIcon.value ? "UserIcon" : undefined,
		rightIcon: showRightIcon.value ? "UserIcon" : undefined,
		color: color.value !== "gray" ? color.value : undefined,
		shape: shape.value !== "rounded" ? shape.value : undefined,
	};

	// Elimină proprietățile cu valori `undefined` din obiectul de opțiuni
	Object.keys(optionsObj).forEach((key) => {
		if (optionsObj[key] === undefined) {
			delete optionsObj[key];
		}
	});

	// Verifică dacă obiectul de opțiuni este gol
	let optionsString = "";
	if (Object.keys(optionsObj).length > 0) {
		// Transformă obiectul în string doar dacă nu este gol
		optionsString = JSON.stringify(optionsObj)
			.replace(/"(\w+)":/g, "$1:") // Elimină ghilimelele din jurul cheilor
			.replace(/"([^"]+)"/g, "'$1'"); // Înlocuiește ghilimelele duble cu simple pentru valorile string
		optionsString = ` :options=${optionsString}`;
	}
	// Construiește string-ul final al blocului de cod
	return `<Button${optionsString}${attributes}>${text.value}</Button>`;
});

const docsProps = [
	{
		attribute: "label",
		type: "String",
		description: "Will change the input label",
	},
	{
		attribute: "type",
		type: "String",
		description: "This prop will change the compoent if type attribute e.g., password",
	},
	{
		attribute: "name",
		type: "String",
		description: "Will change the name attribute used for form.",
	},
	{
		attribute: "error",
		type: "String",
		description: "Defines the error shown below the compoenent",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description:
			"Controls whether the component is disabled. When set to true, it makes the component non-interactive and visually indicates its disabled state.",
	},
	{
		attribute: "options",
		type: "Object",
		description: "Provides a set of configurable properties for the component.",
		value: [
			{
				attribute: "leftIcon",
				type: "null|Component",
				description:
					"Optionally include an icon component to the left side of the button's content.",
			},
			{
				attribute: "passwordIcon",
				type: "Object",
				description:
					"Optionally specify an icon component to the right side of the input's content when type is password default: { show: ShowPasswordIcon, hide: HidePasswordIcon }.",
			},
			{
				attribute: "background",
				type: "String",
				description: "Determines the input's background color (default or none)",
			},
			{
				attribute: "borderStyle",
				type: "String",
				description:
					"Defines the shape of the input, with a default of 'borderes'. Options might include 'bordered', 'border-bottom', and 'no-border'.",
			},
			{
				attribute: "size",
				type: "String",
				description:
					"Defines the size of the input, with a default of 'default'. Options might include 'default', 'small'.",
			},
		],
	},
];
</script>
<template>
	<div>
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			Input
		</h1>
		<p class="text-lg">
			This component represents a customizable input that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>

			<Section title="v-model">
				<p>The v-model can be bound to the Input element</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIInput
						:error="error"
						v-model="model"
						:disabled="disabled"
						:type="type"
						:label="label"
						:options="{ leftIcon: UserIcon, borderStyle: border, size: size }"
					/>
				</div>
				<p class="mt-4 w-full text-justify">v-model: {{ model }}</p>
			</div>
		</Section>

		<Section title="Settings">
			<div class="flex flex-wrap justify-evenly">
				<div>
					<h3 class="mt-8 text-lg font-bold">Border Style</h3>
					<UIRadio label="bordered" value="bordered" name="border" v-model="border" />
					<UIRadio
						label="border-bottom"
						value="border-bottom"
						name="border"
						v-model="border"
					/>
					<UIRadio label="no-border" value="no-border" name="border" v-model="border" />
				</div>
				<div>
					<h3 class="mt-8 text-lg font-bold">Size</h3>
					<UIRadio label="Default (default)" value="default" name="size" v-model="size" />
					<UIRadio label="Small" value="small" name="size" v-model="size" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Label" v-model="label" />
					<UIInput label="Error" v-model="error" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Type</h3>
					<UIInput label="Type" v-model="type" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Misc</h3>
					<UICheckbox label="Disabled" v-model="disabled" />
				</div>
			</div>
		</Section>
		<!-- <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
