<script setup>
// import CodeBlock from '@/Components/UI/CodeBlock.vue';
import { CalendarDaysIcon } from "@heroicons/vue/24/outline";

const label = ref("This is a DateTime");
const size = ref("default");
const error = ref(null);
const border = ref("bordered");
const disabled = ref(false);
const model = ref(null);
const type = ref("date");
const time = ref(false);
const minDate = ref(new Date(1900, 0, 0));
const maxDate = ref(new Date(2100, 0, 0));

const codeBlock = computed(() => {
	let attributes = [];
	if (label.value) {
		attributes.push(`label="${label.value}"`);
	}
	if (error.value) {
		attributes.push(`error="${error.value}"`);
	}
	if (disabled.value) {
		attributes.push(`:disabled='true'`);
	}

	let optionsObj = {
		borderStyle: border.value !== "bordered" ? border.value : undefined,
		size: size.value !== "default" ? size.value : undefined,
	};

	// Handling `date-options` object
	let dateOptionsObj = {
		type: type.value !== "date" ? type.value : undefined,
		time: time.value === true ? true : undefined,
		minDate: minDate.value
			? `new Date(${minDate.value.getFullYear()}, ${minDate.value.getMonth()}, ${minDate.value.getDate()})`
			: undefined,
		maxDate: maxDate.value
			? `new Date(${maxDate.value.getFullYear()}, ${maxDate.value.getMonth()}, ${maxDate.value.getDate()})`
			: undefined,
	};

	const processOptions = (options) => {
		Object.keys(options).forEach((key) => {
			if (options[key] === undefined || options[key] === "") {
				delete options[key];
			}
		});

		let optionsString = JSON.stringify(options)
			.replace(/"(\w+)":/g, "$1:") // Remove quotes from keys
			.replace(/"([^"]+)"/g, "'$1'"); // Replace double quotes with single quotes around string values

		return optionsString;
	};

	let optionsString = processOptions(optionsObj);
	let dateOptionsString = processOptions(dateOptionsObj);

	return `<DateTime 
    v-model="model"${
		optionsString.length > 2
			? ` 
    :options=${optionsString}`
			: ""
	}${
		dateOptionsString.length > 2
			? ` 
    :date-options=${dateOptionsString}`
			: ""
	} 
    ${attributes.join(" ")} 
/>`;
});
const docsProps = [
	{
		attribute: "label",
		type: "String",
		description: "Used for the visible label of the input.",
	},
	{
		attribute: "name",
		type: "String",
		description: "Defines the name attribute of the input.",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description: "Disables the input, making it inactive.",
	},
	{
		attribute: "error",
		type: "String",
		description: "Shows an error message below the input.",
	},
	{
		attribute: "options",
		type: "Object",
		description: "Options related to the style of the datetime picker",
		value: [
			{
				attribute: "leftIcon",
				type: "null|Component",
				description:
					"Optionally include an icon component to the left side of the button's content.",
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
	<div class="">
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			DateTime
		</h1>
		<p class="text-lg">
			This component is designed for selecting dates, times, and ranges. It's highly
			customizable to suit various UI requirements.
		</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>

			<Section title="v-model">
				<p>
					The component can be bound through v-model to a date variable to retain the
					state of a normal datetime.
				</p>

				<p>
					In cases where a range of dates is used, v-model can be bound to an array. The
					first item is the starting date and the second item is the ending date.
				</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIDateTime
						v-model="model"
						:label="label"
						:disabled="disabled"
						:options="{
							borderStyle: border,
							leftIcon: CalendarDaysIcon,
							size: size,
						}"
						:date-options="{
							type: type,
							time: time,
							minDate: minDate,
							maxDate: maxDate,
						}"
						:error="error"
					/>
				</div>
				<p class="mt-4 w-full text-justify">v-model: {{ model }}</p>
			</div>
		</Section>

		<Section title="Settings">
			<div class="flex flex-wrap justify-evenly">
				<div>
					<h3 class="text-lg font-bold">Border</h3>
					<UIRadio
						label="Bordered (default)"
						value="bordered"
						name="border"
						v-model="border"
					/>
					<UIRadio
						label="Border bottom"
						value="border-bottom"
						name="border"
						v-model="border"
					/>
					<UIRadio label="No Border" value="no-border" name="border" v-model="border" />
				</div>
				<div>
					<h3 class="text-lg font-bold">Size</h3>
					<UIRadio label="Default (default)" value="default" name="size" v-model="size" />
					<UIRadio label="Small" value="small" name="size" v-model="size" />
				</div>
				<div>
					<h3 class="text-lg font-bold">Text</h3>
					<UIInput label="Label" v-model="label" />
					<UIInput label="Error" v-model="error" />
				</div>
				<div>
					<h3 class="text-lg font-bold">Misc</h3>
					<UICheckbox label="Disabled" v-model="disabled" />
				</div>
			</div>
		</Section>

		<Section title="Date Settings">
			<div class="flex flex-wrap justify-evenly">
				<div>
					<h3 class="text-lg font-bold">Min Date</h3>
					<UIDateTime v-model="minDate" />
					<h3 class="text-lg font-bold">Max Date</h3>
					<UIDateTime v-model="maxDate" />
				</div>
				<div>
					<h3 class="text-lg font-bold">Type</h3>
					<UIRadio label="Date" value="date" name="type" v-model="type" />
					<UIRadio label="Range" value="range" name="type" v-model="type" />
				</div>
				<div>
					<h3 class="text-lg font-bold">Time</h3>
					<UICheckbox label="Time" name="time" v-model="time" />
				</div>
			</div>
		</Section>

		<!-- <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
