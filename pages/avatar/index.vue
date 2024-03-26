<script setup>
const size = ref("normal");
const border = ref("circle");
const name = ref("");
const src = ref("");
const acronym = ref("");
const editMode = ref(false);
const testAlert = () => {
	alert("true");
};

const codeBlock = computed(() => {
	let attributes = [];

	if (size.value !== "normal") {
		attributes.push(`size="${size.value}"`);
	}
	if (border.value !== "circle") {
		attributes.push(`border="${border.value}"`);
	}
	if (name.value) {
		attributes.push(`name="${name.value}"`);
	}
	if (src.value) {
		attributes.push(`src="${src.value}"`);
	}
	if (acronym.value) {
		attributes.push(`acronym="${acronym.value}"`);
	}
	if (editMode.value !== false) {
		attributes.push(`:edit-mode="${editMode.value}"`);
	}

	return `<Avatar ${attributes.filter(Boolean).join(" ")} />`;
});
</script>
<template>
	<div>
		<h1
			class="gradient m-0 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text pb-2 text-left text-4xl font-bold text-transparent"
		>
			Avatar
		</h1>
		<p class="text-lg">
			This component represents a customizable avatar that provides a range of properties
			(props) to configure its appearance and behavior.
		</p>
		<div>
			<section class="mt-12">
				<h2 class="mb-6 text-xl font-semibold">Props</h2>
				<div class="bg-white pl-12">
					<ul class="list-disc space-y-2 text-justify">
						<!-- Previous props descriptions omitted for brevity -->
						<li>
							<strong>id (String):</strong> Optionally assigns a unique identifier to
							the component. This can be useful for referencing the component in
							JavaScript or for linking labels with form elements.
						</li>
						<li>
							<strong>src (String):</strong> Specifies the URL of the image to be
							displayed within the component. This property is commonly used for
							components that include images or icons.
						</li>
						<li>
							<strong>name (String):</strong> If the src is not provided the name will
							be converted into an acronym to be presented on the avatar component
							(e.g. Rareș Boza -> RB)
						</li>
						<li>
							<strong>acronym (String):</strong> If src and name are not provided the
							acronym will be placed over the avatar.
						</li>
						<li>
							<strong>size (String):</strong> Controls the size of the component, with
							predefined options such as 'small', 'normal', 'big', '2xl'. This
							property allows for consistent scaling of the component's dimensions
							across different contexts.
						</li>
						<li>
							<strong>border (String):</strong> Determines the border style of the
							component, with options including 'square', 'rounded', and 'circle'.
							This affects the overall appearance and can be used to align with design
							guidelines.
						</li>
						<li>
							<strong>as (String):</strong> This prop will change the compoent e.g.
							as="a"
						</li>
						<li>
							<strong>href (String):</strong> Specifies the URL of the page the link
							goes to. This property is used when the component is rendered as an
							anchor tag (a), providing the hyperlink reference.
						</li>
						<li>
							<strong>editMode (Boolean):</strong> Indicates whether the component is
							in edit mode. This can enable the display of editing interfaces.
						</li>
						<li>
							<strong>editClick (Function):</strong> A function to be called when the
							edit action is triggered. This allows for custom edit functionality to
							be implemented, such as opening a modal or an edit form.
						</li>
						<li>
							<strong>editButtonId (String):</strong> Optionally assigns a unique
							identifier to the edit button within the component. This is useful for
							specifically targeting the edit button in scripts or for accessibility
							enhancements.
						</li>
					</ul>
				</div>
			</section>
		</div>

		<section class="mt-12">
			<h2 class="mb-6 text-xl font-semibold">Demo</h2>
			<div class="flex flex-col items-center rounded-lg border p-4">
				<div class="flex w-80 items-center justify-center">
					<UIAvatar
						:size="size"
						:border="border"
						:name="name"
						:acronym="acronym"
						:src="src"
						:edit-mode="editMode"
						:edit-click="
							() => {
								testAlert();
							}
						"
					/>
				</div>
			</div>
		</section>
		<section class="mt-12">
			<h2 class="mb-6 text-xl font-semibold">Settings</h2>
			<div class="flex flex-wrap justify-evenly">
				<div>
					<h3 class="mt-8 text-lg font-bold">Size</h3>
					<UIRadio label="Small" value="small" name="size" v-model="size" />
					<UIRadio label="Normal (default)" value="normal" name="size" v-model="size" />
					<UIRadio label="Big" value="big" name="size" v-model="size" />
					<UIRadio label="2XL" value="2xl" name="size" v-model="size" />
				</div>
				<div>
					<h3 class="mt-8 text-lg font-bold">Border</h3>
					<UIRadio label="Square" value="square" name="border" v-model="border" />
					<UIRadio
						label="Circle (default)"
						value="circle"
						name="border"
						v-model="border"
					/>
					<UIRadio label="Rounded" value="rounded" name="border" v-model="border" />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Text</h3>
					<UIInput label="Image Link" v-model="src" />
					<UIInput
						label="Name"
						v-model="name"
						:error="name != '' && src != '' ? 'Remove the src to see the name' : ''"
					/>
					<UIInput
						v-model="acronym"
						label="Acronym"
						:error="
							(name != '' || src != '') && acronym != ''
								? 'Remove the name and src to see the acronym'
								: ''
						"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="mt-8 text-lg font-bold">Edit</h3>
					<UICheckbox
						label="Edit Mode"
						description="Best for big and 2xl sizes"
						v-model="editMode"
					/>
					<p class="font-light">Edit function is alert("true")</p>
				</div>
			</div>
		</section>
		<!-- <section class="mt-12">
			<CodeBlock :code-text="codeBlock" />
		</section> -->
	</div>
</template>
