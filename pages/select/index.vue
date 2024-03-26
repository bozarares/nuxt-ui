<script setup>
import { UserIcon, TrashIcon } from "@heroicons/vue/24/solid";
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const label = ref("Select element");
const model = ref(null);
const model2 = ref(null);
const border = ref("bordered");
const size = ref("default");
const disabled = ref(false);
const dismissable = ref(true);
const items = ref(["Item1", "Item2", "Another Item"]);
const itemsObject = ref([
	{ id: 1, text: "Item 1" },
	{ id: 2, text: "Item 2" },
]);
const addNewItem = ref("");
const options = computed(() => {
	return {
		leftIcon: showLeftIcon.value === true ? icon : null,
		rightIcon: showRightIcon.value === true ? icon : null,
		color: color.value,
		shape: shape.value,
	};
});

const deleteItem = (itemToDelete) => {
	items.value = items.value.filter((item) => item !== itemToDelete);
};

const addItem = () => {
	items.value = [...items.value, addNewItem.value];
	addNewItem.value = "";
};

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
		attribute: "label",
		type: "String",
		description: "Will change the input label.",
	},
	{
		attribute: "name",
		type: "String",
		description: "Will change the name attribute used for form.",
	},
	{
		attribute: "disabled",
		type: "Boolean",
		description:
			"Controls whether the component is disabled. When set to true, it makes the component non-interactive and visually indicates its disabled state.",
	},
	{
		attribute: "select",
		type: "Array",
		description: "An array of Strings|Numbers shown into the dropdown element.",
	},
	{
		attribute: "selectKey",
		type: "String",
		description:
			"is used to specify the key from the objects within the props.select array that should be used as the value and label for each option in a custom select component. It allows the component to display and utilize a specific property of the objects in the given array, making it easier to work with complex data sets.",
	},
	{
		attribute: "retrieveKey",
		type: "String",
		description:
			"is used to identify a specific property from the selected object, which is then accessed or processed when an option is selected. For example, if a selected object needs to trigger a specific action or retrieve additional information based on this property, retrieveKey facilitates access to that value without requiring additional code for manual extraction.",
	},
	{
		attribute: "retrieveKeyCallback",
		type: "Function",
		description:
			"is a function provided as a prop to the component that is called when an option is selected from the custom select. This callback function is specifically designed to execute custom logic using the value of the property identified by retrieveKey from the selected object. It allows for additional processing, such as fetching more data based on the selected value or updating other parts of the UI in response to the selection. Essentially, retrieveKeyCallback provides a way to extend the functionality of the select component by integrating it with other application logic or data sources, based on the selection made by the user.",
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
				attribute: "borderStyle",
				type: "String",
				description:
					"Defines the shape of the input, with a default of 'borderes'. Options might include 'bordered', 'border-bottom', and 'no-border'.",
			},
			{
				attribute: "xMarkIcon",
				type: "Object",
				description: "Defines the icon that will reset the input.",
			},
			{
				attribute: "dismissable",
				type: "Boolean",
				description:
					"When true, allows users to select an option that effectively unselects any currently selected option, returning the select component to a state where no option is considered chosen.",
			},
		],
	},
];
</script>
<template>
	<Head title="Button" />

	<div>
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			Select
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
				<p>The v-model can be bound to the Select element</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UISelect
						v-model="model"
						:select="items"
						:disabled="disabled"
						:label="label"
						:options="{
							leftIcon: UserIcon,
							borderStyle: border,
							dismissable: dismissable,
						}"
						:search="{ items: items, hotReload: true }"
					/>
				</div>
				<p class="mt-4 w-full text-justify">v-model: {{ model }}</p>
				<div class="flex w-80 items-center justify-center">
					<UISelect
						v-model="model2"
						:select="itemsObject"
						:selectKey="'text'"
						:retrieveKey="'id'"
						:disabled="disabled"
						label="Object Select element"
						:options="{
							leftIcon: UserIcon,
							borderStyle: border,
							dismissable: dismissable,
						}"
						:search="{ items: items, hotReload: true }"
					/>
				</div>
				<p class="mt-4 w-full text-justify">:select="{{ itemsObject }}"</p>
				<p class="mt-4 w-full text-justify">:selectKey="'text'" :retrieveKey="'id'"</p>
				<p class="mt-4 w-full text-justify">v-model: {{ model2 }}</p>
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
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Label" v-model="label" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Misc</h3>
					<UICheckbox label="Disabled" v-model="disabled" />
					<UICheckbox label="Dismissable" v-model="dismissable" />
				</div>
			</div>
		</Section>
		<Section title="Select Items">
			<div class="flex items-center flex-col justify-center">
				<div class="">
					<h3 class="mt-8 text-lg font-bold">Items</h3>
					<div
						class="flex w-full gap-2 items-center"
						v-for="(item, index) in items"
						:key="index"
					>
						<p class="w-full font-bold">{{ item }}</p>
						<div @click="deleteItem(item)">
							<TrashIcon class="text-zinc-700 w-6" />
						</div>
					</div>
					<div class="flex items-center gap-2">
						<UIInput
							:options="{ size: 'small' }"
							label="New Item"
							v-model="addNewItem"
						/>
						<UIButton @click="addItem">Add</UIButton>
					</div>
				</div>
			</div>
		</Section>

		<!-- <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
