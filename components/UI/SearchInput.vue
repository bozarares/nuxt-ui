<script setup>
import CheckIcon from "../Icons/CheckIcon.vue";
import XMarkIcon from "../Icons/XMarkIcon.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { cva } from "class-variance-authority";
import Fuse from "fuse.js";
import { useFloating } from "@floating-ui/vue";

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	type: String,
	name: String,
	search: {
		type: Object,
		default: { items: [], keys: [], hotReload: false },
	},
	options: {
		type: Object,
		default: () => ({}),
	},
	validityCheck: { type: Boolean, default: false },
	onValidityChange: {
		type: Function,
		default: () => {},
	},
	disabled: Boolean,
	modelValue: {
		type: String,
		default: "",
	},
	error: {
		type: String,
		default: null,
	},
});

const options = computed(() => {
	const defaultOptions = {
		borderStyle: "bordered",
		leftIcon: null,
		checkIcon: CheckIcon,
		xMarkIcon: XMarkIcon,
		noResultMessage: "No results found",
		size: "default",
	};
	return { ...defaultOptions, ...props.options };
});

const emits = defineEmits(["update:modelValue"]);

// Initialize reactive references for various state variables.
const inputTextValue = ref(props.modelValue);
const isInputValid = ref(false);
const inputFieldType = ref(props.type);
const isLabelFloating = ref(false);
const inputElementRef = ref(null);
const searchElementRef = ref(null);
const containerElementRef = ref(null);
const isSearchVisible = ref(false);
const fuseSearchInstance = ref(null);

const { floatingStyles } = useFloating(containerElementRef, searchElementRef, {
	placement: "bottom",
});

// On component mount, initialize the Fuse instance and set up a click event listener.
onMounted(() => {
	if (props.search.items.length !== 0) {
		const fuseOptions = { threshold: 0.1, includeScore: true };
		if (
			props.search.keys &&
			props.search.keys.length > 0 &&
			typeof props.search.items[0] === "object"
		)
			fuseOptions.keys = props.search.keys;
		fuseSearchInstance.value = new Fuse(props.search.items, fuseOptions);
	}
	document.addEventListener("mousedown", handleOutsideClick);
	if (props.modelValue && props.modelValue !== "") {
		inputTextValue.value = props.modelValue;
		isLabelFloating.value = true;
	}
});

watch(
	() => props.modelValue,
	(newValue) => {
		inputTextValue.value = newValue;
		if (newValue && newValue !== "") isLabelFloating.value = true;
		else isLabelFloating.value = false;
	}
);

// On component unmount, remove the mousedown event listener.
onUnmounted(() => {
	document.removeEventListener("mousedown", handleOutsideClick);
});

// Function to handle clicks outside of the search element.
const handleOutsideClick = (event) => {
	const searchElement = containerElementRef.value;
	if (!searchElement.contains(event.target)) {
		isSearchVisible.value = false;
	}
};
// Watcher for search hotreload
watch(
	() => props.search.items,
	(newItems, oldItems) => {
		if (
			JSON.stringify(newItems) !== JSON.stringify(oldItems) &&
			props.search.hotReload === true
		) {
			const fuseOptions = { threshold: 0.1, includeScore: true };
			if (
				props.search.keys &&
				props.search.keys.length > 0 &&
				typeof props.search.items[0] === "object"
			)
				fuseOptions.keys = props.search.keys;
			fuseSearchInstance.value = new Fuse(newItems, fuseOptions);
		}
	}
);

// Watcher for inputTextValue, to update search visibility and input validity.
watch(
	() => inputTextValue.value,
	(_1, _2) => {
		isSearchVisible.value == true;
		if (props.validityCheck === true) {
			if (!isExactMatchFound.value) isInputValid.value = false;
			else isInputValid.value = true;
		}
		emits("update:modelValue", inputTextValue.value);
	}
);

// Watcher for isInputValid, to trigger onValidityChange prop.
watch(
	() => isInputValid.value,
	(newValue, _1) => {
		if (props.validityCheck === true) props.onValidityChange(newValue);
	}
);

// Global variable for maxResults
const maxResults = props.search.maxResults || 5;

// Replace the special characters from Romeanian alphabet for better search results
function replaceSpecialCharacters(str) {
	return str.replace(/[ăâ]/g, "a").replace(/[ț]/g, "t").replace(/[ș]/g, "s").replace(/[î]/g, "i");
}

// Split the result in 3 variables before, match, after for search match color.
const splitResult = (item, query) => {
	const searchField =
		typeof item === "object" && props.search.searchField
			? item[props.search.searchField]
			: item;
	const lowerCaseItemName = replaceSpecialCharacters(searchField.toLowerCase());
	const lowerCaseQuery = replaceSpecialCharacters(query.toLowerCase());
	const index = lowerCaseItemName.indexOf(lowerCaseQuery);
	if (index === -1) {
		return { beforeMatch: searchField, match: "", afterMatch: "" };
	}
	const beforeMatch = searchField.slice(0, index);
	const match = searchField.slice(index, index + query.length);
	const afterMatch = searchField.slice(index + query.length);
	return { beforeMatch, match, afterMatch };
};

// Computed property for searchResults
const searchResults = computed(() => {
	if (!fuseSearchInstance) return [];
	let results = inputTextValue.value ? fuseSearchInstance.value.search(inputTextValue.value) : [];

	// If the results length exceeds maxResults, only return up to maxResults
	if (results.length > maxResults) {
		results = results.slice(0, maxResults);
	}

	const resultsWithSplit = results.map((item) => {
		return {
			...item,
			splitResult: splitResult(item.item, inputTextValue.value),
		};
	});
	return resultsWithSplit;
});

const isExactMatchFound = computed(() => {
	if (searchResults.value[0]) {
		const itemToCompare =
			typeof searchResults.value[0].item === "object" && props.search.searchField
				? searchResults.value[0].item[props.search.searchField]
				: searchResults.value[0].item;
		return itemToCompare === inputTextValue.value;
	}
	return false;
});

// Generate a unique id for the input element.
const uniqueInputId = computed(() => props.name + "-" + crypto.randomUUID());

// Compute classes for the input based on the borderStyle and disabled props.
const inputClass = computed(() =>
	cva(
		"w-full flex-shrink-0 pl-12 tracking-wider caret-gray-700 outline-none transition-all duration-300 ease-in-out dark:bg-zinc-800 dark:text-zinc-100 dark:caret-zinc-200",
		{
			variants: {
				borderStyle: {
					bordered:
						"rounded-md border-2 border-zinc-200 shadow focus:border-blue-500 focus:outline-none focus:ring-0 dark:border-zinc-500 focus:dark:border-blue-500",
					"border-bottom":
						"border-0 border-b-2 focus:border-blue-500 focus:outline-none focus:ring-0 ",
					"no-border": "",
				},
				disabled: {
					true: "!cursor-not-allowed !bg-zinc-100 !text-zinc-400 dark:!bg-zinc-700 dark:!text-zinc-100 ",
				},
				size: {
					default: "text-md py-3",
					small: "py-2 text-sm",
				},
				error: {
					true: "!border-red-500 dark:!border-red-500",
				},
			},
		}
	)({
		borderStyle: options.value.borderStyle,
		disabled: props.disabled,
		size: options.value.size,
		error: !!props.error,
	})
);

const labelClasses = computed(() => {
	let baseClasses = "";
	if (options.value.size === "default") {
		baseClasses += isLabelFloating.value
			? "-translate-y-4 transform text-xs"
			: "transform-none text-md";
	}
	if (options.value.size === "small") {
		baseClasses += isLabelFloating.value
			? "-translate-y-1/2 transform opacity-0 text-xs"
			: "transform-none text-sm";
	}
	return baseClasses;
});

// Compute the aria label for the input.
const inputAriaLabel = computed(() => {
	return (props.name ? props.name : props.type) + " input";
});

// Functions to handle focus, blur and reset actions on the input.
const handleInputFocus = () => {
	if (inputTextValue.value === "") isLabelFloating.value = !isLabelFloating.value;
	isSearchVisible.value = true;
};
const handleInputBlur = () => {
	if (inputTextValue.value === "") isLabelFloating.value = !isLabelFloating.value;
};
const resetInputField = () => {
	inputTextValue.value = "";
	isLabelFloating.value = false;
	isSearchVisible.value = false;
};
const resetInputOnEscape = () => {
	inputTextValue.value = "";
	isLabelFloating.value = true;
};
</script>

<template>
	<div class="flex w-full flex-col">
		<div
			ref="containerElementRef"
			class="relative flex min-h-[2em] w-full flex-col items-center tracking-wider text-zinc-700"
			:class="[!options.leftIcon && 'justify-between']"
		>
			<!-- Left Icon -->
			<div
				class="absolute left-0 ml-2 flex h-full w-8 items-center justify-center"
				aria-hidden="true"
			>
				<component
					class="h-6 pointer-events-none absolute select-none text-zinc-700 dark:text-zinc-400"
					:is="options.leftIcon"
				/>
			</div>
			<!-- Input -->
			<input
				ref="inputElementRef"
				:class="[inputClass, !options.leftIcon && '!pr-0 pl-6']"
				:type="inputFieldType"
				:name="props.name"
				:id="uniqueInputId"
				v-model="inputTextValue"
				:disabled="props.disabled"
				@focus="handleInputFocus"
				@blur="handleInputBlur"
				@keydown.escape="resetInputOnEscape"
				:aria-label="inputAriaLabel"
				:aria-labelledby="`${uniqueInputId}-label`"
			/>
			<!-- Floating Label -->
			<div
				class="pointer-events-none absolute right-0 flex h-full w-full items-center justify-center"
			>
				<span
					class="text-md pointer-events-none absolute left-12 select-none text-zinc-700/80 transition-all duration-300 dark:text-zinc-100"
					:class="labelClasses"
					:id="`${uniqueInputId}-label`"
					>{{ props.label }}</span
				>
			</div>
			<!-- Search Result -->
			<div class="group">
				<Transition
					enter-from-class="scale-90 opacity-0"
					enter-active-class="transition duration-200"
					enter-to-class="scale-100 opacity-100"
					leave-from-class="scale-100 opacity-100"
					leave-active-class="transition duration-200"
					leave-to-class="scale-90 opacity-0"
					mode="out-in"
				>
					<div
						ref="searchElementRef"
						v-if="
							searchResults &&
							searchResults != [] &&
							!isExactMatchFound &&
							isSearchVisible &&
							inputTextValue.length !== 0
						"
						@mousedown.prevent
						class="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 absolute left-0 top-0 z-10 flex max-h-[25em] w-full origin-top flex-col items-center overflow-y-auto rounded-b-md border-2 bg-white dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
						:style="floatingStyles"
					>
						<component
							v-if="searchResults.length === 0"
							is="p"
							class="w-full border-b-2 py-2 text-center dark:border-b-zinc-500"
						>
							{{ options.noResultMessage }}
						</component>
						<component
							is="button"
							class="w-full border-b-2 py-2 text-center dark:border-b-zinc-500"
							v-else
							v-for="searchItem in searchResults"
							:key="searchItem.item.refIndex"
							@mousedown.prevent
							@click="
								inputTextValue =
									typeof searchItem.item === 'object' && props.search.searchField
										? searchItem.item[props.search.searchField]
										: searchItem.item
							"
						>
							<template v-if="searchItem.splitResult.beforeMatch">
								{{ searchItem.splitResult.beforeMatch }}
							</template>
							<span class="text-blue-500">
								{{ searchItem.splitResult.match }}
							</span>
							<template v-if="searchItem.splitResult.afterMatch">
								{{ searchItem.splitResult.afterMatch }}
							</template>
						</component>
					</div>
				</Transition>
			</div>
			<!-- Clear icon -->
			<TransitionGroup
				enter-from-class="scale-90 opacity-0"
				enter-active-class="transition-all duration-200"
				enter-to-class="scale-100 opacity-100"
				leave-from-class="scale-100 opacity-100"
				leave-active-class="transition-all duration-200"
				leave-to-class="scale-90 opacity-0"
			>
				<button
					v-if="inputTextValue !== '' && !isInputValid"
					class="absolute right-0 mr-2 flex h-full w-8 items-center justify-center"
					@click="resetInputField"
					aria-label="Clear input"
				>
					<component
						class="absolute right-0 h-8 cursor-pointer select-none p-1 text-zinc-900"
						:is="options.xMarkIcon"
					/>
				</button>
				<!-- Check icon -->
				<div
					v-if="isInputValid && props.validityCheck === true"
					class="pointer-events-none absolute right-0 mr-2 flex h-full w-8 items-center justify-center"
					aria-label="The input is valid"
				>
					<component
						class="absolute right-0 flex h-8 cursor-pointer select-none items-center justify-center p-1 text-green-600 transition-all duration-300 hover:scale-110"
						:is="options.checkIcon"
					/>
				</div>
			</TransitionGroup>
		</div>
		<!-- Errors -->
		<div
			v-if="props.error"
			class="w-full px-1 pt-1 text-sm font-medium text-red-500"
			:class="[!props.error && 'invisible']"
		>
			{{ props.error }}
		</div>
	</div>
</template>

<style scoped></style>
