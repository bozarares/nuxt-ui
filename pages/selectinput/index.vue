<script setup>
import { UserIcon, TrashIcon } from "@heroicons/vue/24/solid";
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const label = ref("Input element");
const noResultMessage = ref("No result found! :(");
const model = ref([]);
const border = ref("bordered");
const size = ref("default");
const type = ref("text");
const disabled = ref(false);
const items = ref(["Item1", "Item2", "Another Item"]);
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
		attribute: "type",
		type: "String",
		description: "This prop will change the component if type attribute e.g., password.",
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
		attribute: "getTextValue",
		type: "Function",
		description:
			"Allows the parent component or the surrounding context to receive updates about what's being typed in the input field in real-time. ",
	},
	{
		attribute: "search",
		type: "Object",
		description: "Provides a set of configurable properties for the search functionality.",
		value: [
			{
				attribute: "items",
				type: "Array | Object",
				description:
					"The item property will provide the items for the search functionality.",
			},
			{
				attribute: "keys",
				type: "Array",
				description:
					"The keys property will provide the keys to be searched if items type is Object e.g., items keys [id, name, description] and keys = [name, description] the input will search only name and description but not id.",
			},
			{
				attribute: "hotReload",
				type: "Boolean",
				description: "Will recreate the fuse instance if items change, without reloading.",
			},
		],
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
				attribute: "size",
				type: "String",
				description:
					"Defines the size of the input, with a default of 'default'. Options might include 'default', 'small'.",
			},
			{
				attribute: "xMarkIcon",
				type: "Object",
				description: "Defines the icon that will reset the input.",
			},
			{
				attribute: "chevronUpIcon",
				type: "Object",
				description: "Defines the icon that will be visible for the chevron up.",
			},
			{
				attribute: "chevronDownIcon",
				type: "Object",
				description: "Defines the icon that will be visible for the chevron down.",
			},
			{
				attribute: "noResultMessage",
				type: "String",
				description: "Defines the text that will be visible when there are no results.",
			},
		],
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
		<p class="text-lg">
			This component represents a customizable input that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>
			<Section title="v-model">
				<p>
					The v-model is an array can be bound to the Input element and will return an
					array with all selected elements
				</p>
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UISelectInput
						v-model="model"
						:disabled="disabled"
						:type="type"
						:label="label"
						:options="{
							leftIcon: UserIcon,
							borderStyle: border,
							size: size,
							noResultMessage: noResultMessage,
						}"
						:search="{ items: items, hotReload: true }"
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
					<UIInput label="No result message" v-model="noResultMessage" />
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
		<Section title="Search">
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
