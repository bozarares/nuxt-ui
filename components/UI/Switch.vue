<script setup>
import { watch, ref } from "vue";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	onChange: {
		type: Function,
		default: () => {},
	},
});
const emits = defineEmits(["update:modelValue"]);

const isOn = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newValue) => {
		isOn.value = newValue;
	}
);

const toggle = () => {
	isOn.value = !isOn.value;
	emits("update:modelValue", isOn.value);
	props.onChange(isOn.value);
};
</script>

<template>
	<div @click="toggle" class="relative cursor-pointer">
		<div
			:class="[
				isOn ? 'bg-blue-500' : 'bg-zinc-400',
				'h-6 w-12 rounded-full transition-all duration-300 ease-in-out',
			]"
		></div>
		<div
			:class="[
				isOn ? 'translate-x-6' : 'translate-x-0',
				'absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ease-in-out',
			]"
		></div>
	</div>
</template>
