<script setup>
import { useFloating, flip } from "@floating-ui/vue";
import { cva } from "class-variance-authority";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.locale("en");

const props = defineProps({
	label: String,
	name: String,
	disabled: Boolean,
	dateOptions: {
		type: Object,
		default: () => {},
	},
	options: {
		type: Object,
		default: () => {},
	},
	error: {
		type: String,
		default: null,
	},
	modelValue: {
		type: [Date, Array, null, undefined],
		default: null,
	},
});
const showRangeSelectionDialog = ref(false);

const emits = defineEmits(["update:modelValue"]);

// Used for computing the blank spaces before 1 of each month
let firstDayOfMonth = ref(0);
let daysOfMonth = ref([]);

const isDateMode = ref(true);

const selectedDate = ref(props.modelValue ? dayjs(props.modelValue) : null);

watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		if (!Array.isArray(newValue)) selectedDate.value = newValue ? dayjs(newValue) : null;
	}
);
const selectedTime = ref(dayjs());
const selectedMonth = ref(dayjs().month());
const selectedYear = ref(dayjs().year());

const isDatePickerVisible = ref(false);

const showSelectMonth = ref(false);
const showSelectYear = ref(false);
// const isLabelFloating = ref(false);

// Refs used for type = range;
const startDate = ref(null);
const startTime = ref(dayjs());
const endDate = ref(null);
const endTime = ref(dayjs());

const containerElementRef = ref(null);
const dateElementRef = ref(null);

// Computed property used for setting defaults and overwriting for options prop
const options = computed(() => {
	const defaultOptions = {
		borderStyle: "bordered",
		leftIcon: null,
		size: "default",
	};
	return { ...defaultOptions, ...props.options };
});

// Computed property used for setting defaults and overwriting for dateOptions prop
const dateOptions = computed(() => {
	const defaultOptions = {
		maxDate: new Date(2100, 1, 1),
		minDate: new Date(1900, 1, 1),
		type: "date",
		time: false,
	};
	return { ...defaultOptions, ...props.dateOptions };
});

watch(
	() => selectedTime.value,
	(newValue, oldValue) => {
		const dt = selectedDate.value.set("hour", newValue.hour()).set("minute", newValue.minute());
		selectedDate.value = dt;
	}
);

watch(
	() => startTime.value,
	(newValue) => {
		if (startDate.value) {
			const updatedStart = startDate.value
				.hour(newValue.hour() + 2)
				.minute(newValue.minute());
			startDate.value = updatedStart;
			selectedDate.value = [startDate.value, endDate.value];
		}
	}
);

watch(
	() => endTime.value,
	(newValue) => {
		if (endDate.value) {
			const updatedEnd = endDate.value.hour(newValue.hour() + 2).minute(newValue.minute());
			endDate.value = updatedEnd;
			selectedDate.value = [startDate.value, endDate.value];
		}
	}
);

watch(
	() => selectedDate.value,
	(newValue, _oldValue) => {
		let newModelValue;

		if (Array.isArray(newValue) && newValue.length === 2) {
			// handle the range (both start and end dates)
			// Check if both start and end dates are not null
			if (newValue[0] && newValue[1]) {
				const startDate = newValue[0].toDate ? newValue[0].toDate() : newValue[0];
				const endDate = newValue[1].toDate ? newValue[1].toDate() : newValue[1];
				newModelValue = [startDate, endDate];
			} else if (newValue[0]) {
				// Handle the case where only the start date is present
				const startDate = newValue[0].toDate ? newValue[0].toDate() : newValue[0];
				newModelValue = [startDate, null]; // Keep end date as null
			}
		} else {
			// handle a single date
			newModelValue =
				newValue === null ? null : newValue.toDate ? newValue.toDate() : newValue;
		}

		// Only emit update if new value is different to avoid unnecessary updates
		if (JSON.stringify(newModelValue) !== JSON.stringify(props.modelValue)) {
			if (Array.isArray(newModelValue)) {
				emits("update:modelValue", newModelValue);
			} else emits("update:modelValue", newModelValue);
		}
	}
);

watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		if (JSON.stringify(dayjs(newValue)) !== JSON.stringify(selectedDate.value)) {
			if (!Array.isArray(newValue)) selectedDate.value = newValue ? dayjs(newValue) : null;
		}
	}
);

// Returns the formatted dates for the input value
const formattedDate = computed(() => {
	if (!selectedDate.value) return "";

	if (dateOptions.value.type === "range") {
		let tempMessage = "";
		if (startDate.value) tempMessage += `${dayjs(startDate.value).format("DD.MM.YYYY")}`;
		if (endDate.value) tempMessage += ` - ${dayjs(endDate.value).format("DD.MM.YYYY")}`;
		return tempMessage;
	}

	if (dateOptions.value.time === true) {
		return dayjs(selectedDate.value).format("DD.MM.YYYY HH:mm");
	}
	return dayjs(selectedDate.value).format("DD.MM.YYYY");
});

const isLabelFloating = computed(() => {
	if (formattedDate.value === "") return false;
	return true;
});

const { floatingStyles: dateFloatingStyles } = useFloating(containerElementRef, dateElementRef, {
	middleware: [
		// autoPlacement({
		//     crossAxis: true,
		//     allowedPlacements: ['bottom-end', 'top-start'],
		// }),
		flip({
			crossAxis: true,
			allowedPlacements: ["bottom-end", "top-start"],
		}),
	],
});

// Generate a unique id for the input element.
const uniqueInputId = computed(() => props.name + "-" + crypto.randomUUID());

// CVA instance for input style
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
					"no-border": "border-0",
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

const dayClass = (day) => {
	const tempDate = dayjs().year(selectedYear.value).month(selectedMonth.value).date(day);

	if (dateOptions.value.type === "date") {
		if (
			selectedDate.value &&
			dayjs(selectedDate.value).date() === day &&
			dayjs(selectedDate.value).month() === selectedMonth.value &&
			dayjs(selectedDate.value).year() === selectedYear.value
		)
			return "bg-blue-500 text-white";
	}

	if (dateOptions.value.type === "range") {
		if (
			startDate.value &&
			dayjs(startDate.value).date() === day &&
			dayjs(startDate.value).month() === selectedMonth.value &&
			dayjs(startDate.value).year() === selectedYear.value
		)
			return "bg-blue-500 rounded-r-none text-white pointer-events-none";
		if (
			endDate.value &&
			dayjs(endDate.value).date() === day &&
			dayjs(endDate.value).month() === selectedMonth.value &&
			dayjs(endDate.value).year() === selectedYear.value
		)
			return "bg-blue-500 rounded-l-none text-white pointer-events-none";
		if (
			startDate.value &&
			endDate.value &&
			tempDate.isBefore(dayjs(endDate.value)) &&
			tempDate.isAfter(dayjs(startDate.value))
		)
			return "bg-blue-300 rounded-none text-zinc-100";
	}
	return "";
};

// On component mount add event listenter for handle outsideClick
// Set the calendar month and days as the current date
onMounted(() => {
	updateDaysOfMonth(dayjs());
	document.addEventListener("mousedown", handleOutsideClick);
});

// On component unmount, remove the mousedown event listener.
onUnmounted(() => {
	document.removeEventListener("mousedown", handleOutsideClick);
});

// Function to handle clicks outside of the search element.
const handleOutsideClick = (event) => {
	const dateElement = containerElementRef.value;
	if (!dateElement.contains(event.target)) {
		isDatePickerVisible.value = false;
	}
};

// Watcher for selecting the month, incrementing and decrementing and updating the blank spaces
watch(
	() => selectedMonth.value,
	(newValue, oldValue) => {
		if (oldValue === 0 && newValue === -1) {
			selectedMonth.value = 11;
			selectedYear.value--;
		}
		if (oldValue === 11 && newValue === 12) {
			selectedMonth.value = 0;
			selectedYear.value++;
		}
		const newDate = dayjs().month(selectedMonth.value).year(selectedYear.value);
		updateDaysOfMonth(newDate);
	}
);

// Watcher for selected year for updating the blank spaces
watch(
	() => selectedYear.value,
	(newValue) => {
		const newDate = dayjs().month(selectedMonth.value).year(newValue);
		updateDaysOfMonth(newDate);
	}
);

const updateDaysOfMonth = (date) => {
	const endDate = date.endOf("month");
	const days = Array.from({ length: endDate.date() }, (_, i) => i + 1);
	daysOfMonth.value = days;

	const firstDay = date.startOf("month").day();
	firstDayOfMonth.value = firstDay === -1 ? 6 : firstDay;
};

const selectDay = (day) => {
	let tempDate = dayjs()
		.year(selectedYear.value)
		.month(selectedMonth.value)
		.date(day)
		.hour(12)
		.minute(0)
		.second(0);
	// Guard If date is less than minDate
	if (dateOptions.value.minDate && tempDate.isBefore(dayjs(dateOptions.value.minDate))) {
		tempDate = dayjs(dateOptions.value.minDate);
	}
	// Guard If date is more than maxDate
	if (dateOptions.value.maxDate && tempDate.isAfter(dayjs(dateOptions.value.maxDate))) {
		tempDate = dayjs(dateOptions.value.maxDate);
	}

	// Range selection
	if (dateOptions.value.type === "range") {
		if (!startDate.value) startDate.value = tempDate;
		else if (!endDate.value) {
			endDate.value = tempDate;
			if (endDate.value.isBefore(startDate.value)) {
				[startDate.value, endDate.value] = [endDate.value, startDate.value];
			}
		} else {
			startDate.value = startDate.value.isAfter(tempDate) ? tempDate : startDate.value;
			endDate.value = endDate.value.isBefore(tempDate) ? tempDate : endDate.value;
			if (tempDate.isAfter(startDate.value) && tempDate.isBefore(endDate.value))
				showRangeSelectionDialog.value = tempDate;
		}
		selectedDate.value = [startDate.value, endDate.value];
	} else {
		selectedDate.value = tempDate;
		isDatePickerVisible.value = false;
	}
};

let yearGrid = ref(
	Array.from({ length: 12 }, (_, i) => dayjs().year() - (dayjs().year() % 10) - 1 + i)
);

const selectYear = (year) => {
	const firstYearInGrid = dayjs().year(yearGrid.value[0]);
	if (year === "<") {
		yearGrid.value = Array.from(
			{ length: 12 },
			(_, i) => firstYearInGrid.subtract(10, "year").year() + i
		);
	} else if (year === ">") {
		yearGrid.value = Array.from(
			{ length: 12 },
			(_, i) => firstYearInGrid.add(10, "year").year() + i
		);
	} else {
		selectedYear.value = year;
		showSelectYear.value = false;
	}
};

var getMonth = function (idx) {
	return dayjs().month(idx).format("MMMM"); // obținem numele lunii pentru un index dat
};

const days = dayjs().localeData().weekdaysShort();

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
</script>
<template>
	<div class="flex w-full flex-col">
		<div
			class="flex-grow-1 relative flex w-full flex-col items-center tracking-wider text-zinc-700"
			ref="containerElementRef"
		>
			<!-- Left Icon -->
			<div
				class="absolute left-0 ml-2 flex h-full w-8 items-center justify-center"
				aria-hidden="true"
			>
				<component
					class="h-inherit pointer-events-none absolute select-none text-zinc-900 dark:text-zinc-400"
					:is="options.leftIcon"
				/>
			</div>
			<input
				type="text"
				:class="[inputClass, !options.leftIcon && '!pr-0 pl-6']"
				:name="props.name"
				readonly
				v-model="formattedDate"
				@click.prevent="
					() => {
						if (disabled === false) isDatePickerVisible = !isDatePickerVisible;
					}
				"
			/>
			<!-- Floating Label -->
			<div
				class="pointer-events-none absolute right-0 flex h-full w-full items-center justify-center"
			>
				<span
					class="text-md pointer-events-none absolute left-12 select-none text-zinc-600 transition-all duration-300 dark:text-zinc-100"
					:class="labelClasses"
					:id="`${uniqueInputId}-label`"
					>{{ props.label }}</span
				>
			</div>
			<!-- Date Picker -->
			<div
				v-if="isDatePickerVisible && isDateMode"
				class="absolute left-0 top-10 z-20 w-full select-none overflow-hidden rounded-md border-2 border-zinc-500/20 bg-white p-2 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
				:style="dateFloatingStyles"
				ref="dateElementRef"
			>
				<button
					v-if="dateOptions.time"
					class="my-1 w-full rounded-md border-2 py-1 text-center hover:bg-blue-500 hover:text-white"
					@click.prevent="
						() => {
							if (
								(dateOptions.type === 'date' && modelValue !== null) ||
								(dateOptions.type === 'range' &&
									Array.isArray(modelValue) &&
									modelValue[0] !== null &&
									modelValue[1] !== null)
							)
								isDateMode = false;
						}
					"
				>
					{{
						(dateOptions.type === "date" && modelValue !== null) ||
						(dateOptions.type === "range" &&
							Array.isArray(modelValue) &&
							modelValue[0] !== null &&
							modelValue[1] !== null)
							? "Select time"
							: "Select a date first"
					}}
				</button>
				<!-- Date controlls -->
				<div class="flex justify-between px-2">
					<button
						class="rounded-md px-4 hover:bg-blue-500 hover:text-white"
						:class="[
							dayjs(`${selectedYear}-${selectedMonth + 1}-01`).isBefore(
								dateOptions.minDate
							)
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
						]"
						@click.prevent="selectedMonth--"
					>
						{{ "<" }}
					</button>
					<div>
						<button
							class="rounded-md px-2 hover:bg-blue-500 hover:text-white"
							@click.prevent="
								() => {
									showSelectMonth = true;
									showSelectYear = false;
								}
							"
						>
							{{ getMonth(selectedMonth) }}
						</button>
						<button
							class="rounded-md px-2 hover:bg-blue-500 hover:text-white"
							@click.prevent="
								() => {
									showSelectYear = true;
									showSelectMonth = false;
								}
							"
						>
							{{ selectedYear }}
						</button>
					</div>
					<button
						class="rounded-md px-4 hover:bg-blue-500 hover:text-white"
						:class="[
							dayjs(`${selectedYear}-${selectedMonth + 1}-01`).isAfter(
								dateOptions.maxDate
							)
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
						]"
						@click.prevent="selectedMonth++"
					>
						{{ ">" }}
					</button>
				</div>
				<!-- Day picker -->
				<div
					class="flex h-64 flex-col items-center justify-center gap-2"
					v-if="dateOptions.type === 'range' && showRangeSelectionDialog !== false"
				>
					<p class="pb-6 text-lg">The selected date is:</p>
					<button
						class="w-40 rounded-md border-2 px-4 py-2 hover:bg-blue-500 hover:text-white"
						@click.prevent="
							() => {
								startDate = showRangeSelectionDialog;
								selectedDate = [startDate, endDate];
								showRangeSelectionDialog = false;
							}
						"
					>
						Start date
					</button>
					<button
						class="w-40 rounded-md border-2 px-4 py-2 hover:bg-blue-500 hover:text-white"
						@click.prevent="
							() => {
								endDate = showRangeSelectionDialog;
								selectedDate = [startDate, endDate];
								showRangeSelectionDialog = false;
							}
						"
					>
						End date
					</button>
				</div>
				<div
					v-else-if="!showSelectMonth && !showSelectYear"
					class="grid h-64 grid-cols-7 gap-1 text-center"
				>
					<div
						v-for="(day, index) in days"
						:key="index"
						class="flex h-8 w-8 items-center justify-center text-sm text-zinc-500"
					>
						{{ day }}
					</div>
					<div v-for="n in firstDayOfMonth" :key="'empty' + n" class="h-8 w-8"></div>
					<button
						v-for="day in daysOfMonth"
						:key="day"
						:class="[
							dayClass(day),
							new Date(selectedYear, selectedMonth, day) >=
							dateOptions.minDate.setHours(0, 0, 0, 0)
								? ''
								: 'pointer-events-none bg-zinc-100',
							new Date(selectedYear, selectedMonth, day) <=
							dateOptions.maxDate.setHours(23, 59, 59, 999)
								? ''
								: 'pointer-events-none bg-zinc-100',
						]"
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-blue-500 hover:text-white"
						@click.prevent="selectDay(day)"
					>
						{{ day }}
					</button>
				</div>
				<!-- Month picker -->
				<div v-else-if="showSelectMonth" class="grid h-64 grid-cols-3 pt-8 text-center">
					<div
						v-for="(_1, index) in 12"
						:key="index"
						:class="[
							new Date(selectedYear, index + 1, 1) <=
							dateOptions.minDate.setHours(0, 0, 0, 0)
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
							new Date(selectedYear, index - 1, 1) >=
							dateOptions.maxDate.setHours(0, 0, 0, 0)
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
						]"
						class="flex h-8 w-full cursor-pointer items-center justify-center rounded-md text-sm hover:bg-blue-500 hover:text-white"
						@click.prevent="
							() => {
								selectedMonth = index;
								showSelectMonth = false;
							}
						"
					>
						<div class="select-none px-2">
							{{ getMonth(index) }}
						</div>
					</div>
				</div>
				<!-- Year Picker -->
				<div v-else-if="showSelectYear" class="grid h-64 grid-cols-4 pt-8 text-center">
					<div
						class="flex h-8 cursor-pointer items-center justify-center rounded-md p-4 text-sm hover:bg-blue-500 hover:text-white"
						@click.prevent="selectYear('<')"
					>
						<div class="select-none">
							{{ "<" }}
						</div>
					</div>
					<div
						v-for="year in yearGrid.slice(1, 11)"
						:key="year"
						:class="[
							new Date(year + 1) <= dateOptions.minDate.getFullYear()
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
							new Date(year - 1) >= dateOptions.maxDate.getFullYear()
								? 'pointer-events-none bg-zinc-100 dark:bg-zinc-600'
								: '',
						]"
						class="flex h-8 cursor-pointer items-center justify-center rounded-md p-4 text-sm hover:bg-blue-500 hover:text-white"
						@click.prevent="selectYear(year)"
					>
						<div class="select-none">
							{{ year }}
						</div>
					</div>
					<div
						class="flex h-8 cursor-pointer items-center justify-center rounded-md p-4 text-sm hover:bg-blue-500 hover:text-white"
						@click.prevent="selectYear('>')"
					>
						<div class="select-none">
							{{ ">" }}
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="isDatePickerVisible && !isDateMode && dateOptions.time"
				class="absolute left-0 top-10 z-20 w-full select-none overflow-hidden rounded-md border-2 border-zinc-500/20 bg-white p-2 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
				:style="dateFloatingStyles"
				ref="dateElementRef"
			>
				<button
					v-if="dateOptions.time"
					class="my-1 w-full rounded-md border-2 py-1 text-center hover:bg-blue-500 hover:text-white"
					@click.prevent="isDateMode = true"
				>
					Select date
				</button>
				<div
					class="my-8 flex items-center justify-center gap-1"
					v-if="dateOptions.type === 'date'"
				>
					<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="24"
						step="1"
						@input="
							(e) => {
								selectedTime = selectedTime.hour(e.target.value);
							}
						"
						:value="selectedTime.hour().toString().padStart(2, '0')"
					/>:<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="59"
						step="1"
						:value="selectedTime.minute().toString().padStart(2, '0')"
						@input="
							(e) => {
								selectedTime = selectedTime.minute(e.target.value);
							}
						"
					/>
				</div>
				<div
					class="my-8 flex items-center justify-center gap-1"
					v-if="dateOptions.type === 'range'"
				>
					Start Time:
					<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="23"
						step="1"
						@input="
							(e) => {
								startTime = startTime.hour(e.target.value);
							}
						"
						:value="startTime.hour().toString().padStart(2, '0')"
					/>
					:<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="59"
						step="1"
						:value="startTime.minute().toString().padStart(2, '0')"
						@input="
							(e) => {
								startTime = startTime.minute(e.target.value);
							}
						"
					/>
				</div>
				<div
					class="my-8 flex items-center justify-center gap-1"
					v-if="dateOptions.type === 'range'"
				>
					End Time:
					<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="23"
						step="1"
						@input="
							(e) => {
								endTime = endTime.hour(e.target.value);
							}
						"
						:value="endTime.hour().toString().padStart(2, '0')"
					/>:<input
						class="h-8 w-16 rounded-md border-2 text-center"
						type="number"
						min="0"
						max="59"
						step="1"
						:value="endTime.minute().toString().padStart(2, '0')"
						@input="
							(e) => {
								endTime = endTime.minute(e.target.value);
							}
						"
					/>
				</div>
			</div>
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

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
