<script setup>
// import CodeBlock from '@/Components/UI/CodeBlock.vue';

const align = ref("left");

const codeBlock = computed(() => {
	return `<DropdownMenu :align="${align.value}" class="w-[15em]">
    <template v-slot:dropdownMenuButton>
        <Avatar acronym="DM" />
    </template>
    <DropdownHeader align="left">DropdownHeader</DropdownHeader>
    <DropdownLabel align="left">DropdownLabel</DropdownLabel>
    <DropdownItem>DropdownItem</DropdownItem>
    <DropdownItem>DropdownItem</DropdownItem>
    <DropdownSeparator />
    <DropdownLabel align="left">DropdownLabel</DropdownLabel>
    <DropdownItem>DropdownItem</DropdownItem>
</DropdownMenu>`;
});

const docsProps = [
	{
		attribute: "align",
		type: "String",
		description: "Used to change the alignment of the dropdown. Default: 'left'",
	},
	{
		attribute: "class",
		type: "String",
		description: "Appends other classes to the currentone.",
	},
];

const docsElements = [
	{
		attribute: "DropdownHeader",
		description:
			"This component typically serves as the title or heading of your dropdown menu, providing users with a context of what the dropdown contains. It's usually styled differently from the items to stand out and may not be clickable.",
		value: [
			{
				attribute: "align",
				type: "String",
				description: "- default: center possible values ('left', 'center', 'right')",
			},
		],
	},
	{
		attribute: "DropdownItem",
		description:
			"These are the individual selectable options within the dropdown menu. Each item represents a choice or action the user can take. Clicking on a dropdown item usually triggers an action or navigates to a different part of the application.",
		value: [
			{
				attribute: "size",
				type: "String",
				description: "- default: normal possible values ('normal', 'xl', 'xxl')",
			},
			{
				attribute: "autoClose",
				type: "Boolean",
				description: "- default: true. Determines if the dropdown will close after click",
			},
			{
				attribute: "leftIcon",
				type: "Object|Function",
				description: "Defines the icon on the left side",
			},
			{
				attribute: "rightIcon",
				type: "Object|Function",
				description: "Defines the icon on the right side",
			},
			{
				attribute: "is",
				type: "String|Object",
				description:
					"Will change the butto component e.g. button|a (String) or Link (InertiaJS Object), NuxtLink",
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
				attribute: "method",
				type: "String",
				description:
					"This property suggests the HTTP method to be used when the component acts as a form submission trigger. Common values include 'GET' or 'POST', influencing how data is submitted.",
			},
			{
				attribute: "class",
				type: "String",
				description: "Appends other classes to the current ones.",
			},
		],
	},
	{
		attribute: "DropdownLabel",
		description:
			"Similar to the DropdownHeader, this component is used for adding non-selectable text labels within the dropdown menu. It's useful for grouping items under a common heading or for providing additional information to the user within the menu.",
		value: [
			{
				attribute: "align",
				type: "String",
				description: "Used to change the alignment of the label. Default: 'left'",
			},
			{
				attribute: "class",
				type: "String",
				description: "Appends other classes to the current ones.",
			},
		],
	},
	{
		attribute: "DropdownSeparator",
		description:
			"This is a visual divider used within the dropdown menu to separate different groups of items or to distinguish between different types of options. It helps improve the organization of the dropdown items and enhances the user experience by making the dropdown easier to navigate.",
	},
];
</script>
<template>
	<div class="">
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			Dropdown Menu
		</h1>
		<p class="text-lg">
			This component is designed to create a container actind as a dropdown menu. It will act
			as a wrapper for any component, usind the v-slot:dropdownMenuButton the dropdown will be
			bounded to a component.
		</p>
		<div>
			<Section title="Props">
				<Docs :items="docsProps" />
			</Section>
			<Section title="Elements">
				<Docs :items="docsElements" />
			</Section>
		</div>
		<Section title="Demo">
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIDropdownMenu :align="align" class="w-[15em]">
						<template v-slot:dropdownMenuButton>
							<UIAvatar acronym="DM" />
						</template>
						<UIDropdownHeader align="left" class="">DropdownHeader</UIDropdownHeader>
						<UIDropdownLabel align="left">DropdownLabel</UIDropdownLabel>
						<UIDropdownItem>DropdownItem</UIDropdownItem>
						<UIDropdownItem>DropdownItem</UIDropdownItem>
						<UIDropdownSeparator />
						<UIDropdownLabel align="left">DropdownLabel</UIDropdownLabel>
						<UIDropdownItem>DropdownItem</UIDropdownItem>
					</UIDropdownMenu>
				</div>
			</div>
		</Section>

		<Section title="Settings">
			<div class="flex flex-wrap justify-evenly">
				<div>
					<h3 class="text-lg font-bold">Align</h3>
					<UIRadio label="Left" value="left" name="align" v-model="align" />
					<UIRadio label="Right" value="right" name="align" v-model="align" />
				</div>
			</div>
		</Section>
		<!-- 
        <section class="mt-12">
            <CodeBlock :code-text="codeBlock" />
        </section> -->
	</div>
</template>
