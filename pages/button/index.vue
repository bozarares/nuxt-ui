<script setup>
import { UserIcon } from "@heroicons/vue/24/solid";
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const text = ref("Button");
const color = ref("gray");
const shape = ref("rounded");
const disabled = ref(false);
const loading = ref(false);
const showLeftIcon = ref(true);
const showRightIcon = ref(false);
const icon = UserIcon;
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
		attribute: "is",
		type: "String|Object",
		description:
			"Will change the button component e.g. 'button|a' (String) or Link (InertiaJS Object)",
	},
	{
		attribute: "as",
		type: "String",
		description:
			"This prop will change the compoent if the is Object accepts e.g. :is=Link as='button'",
	},
	{
		attribute: "href",
		type: "String",
		description:
			"Specifies the URL of the page the link goes to. This property is used when the component is rendered as an anchor tag (a), providing the hyperlink reference.",
	},
	{
		attribute: "to",
		type: "String",
		description:
			"Controls whether the component is disabled. When set to true, it makes the component non-interactive and visually indicates its disabled state, usually by dimming it.",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description:
			"Controls whether the component is disabled. When set to true, it makes the component non-interactive and visually indicates its disabled state.",
	},
	{
		attribute: "method",
		type: "String",
		description:
			"This property suggests the HTTP method to be used when the component acts as a form submission trigger. Common values include 'GET' or 'POST', influencing how data is submitted.",
	},
	{
		attribute: "target",
		type: "String",
		description:
			"When the component is an anchor tag, this property specifies where to open the linked document. Values can be '_blank' (new window or tab), '_self' (same frame as clicked), '_parent' (parent frame), or '_top' (full body of the window). ",
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
				attribute: "rightIconIcon",
				type: "null|Component",
				description:
					"Optionally include an icon component to the right side of the button's content.",
			},
			{
				attribute: "color",
				type: "String",
				description:
					"Determines the button's color scheme, with a default of 'gray'. This could affect both the background and text color depending on the implementation.",
			},
			{
				attribute: "shape",
				type: "String",
				description:
					"Defines the shape of the button, with a default of 'rounded'. Options might include 'square', 'rounded', and 'pill', affecting the border-radius of the button and thereby influencing its overall appearance. This property allows for a customizable UI by adjusting how sharp or rounded the button edges are.",
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
			Button
		</h1>
		<p class="text-lg">
			This component represents a customizable button that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>

			<Section title="v-model">
				<p>
					The <code>@click</code> event is used to trigger specific actions or functions
					when the component is clicked. This allows for interactive behavior, such as
					submitting forms, toggling states, or initiating API calls directly from the
					user's interaction.
				</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIButton :options="options" :disabled="disabled" :loading="loading">{{
						text
					}}</UIButton>
				</div>
			</div>
		</Section>

		<Section title="Settings">
			<div class="flex flex-wrap justify-evenly">
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
					<h3 class="mt-8 text-lg font-bold">Shape</h3>
					<UIRadio
						label="Rounded (default)"
						value="rounded"
						name="shape"
						v-model="shape"
					/>
					<UIRadio label="Square" value="square" name="shape" v-model="shape" />
					<UIRadio label="Pill" value="pill" name="shape" v-model="shape" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Text" v-model="text" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Misc</h3>
					<UICheckbox label="Disabled" v-model="disabled" />
					<UICheckbox label="Loading" v-model="loading" />
					<UICheckbox label="Left Icon" v-model="showLeftIcon" />
					<UICheckbox label="Right Icon" v-model="showRightIcon" />
				</div>
			</div>
		</Section>
		<!-- <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
