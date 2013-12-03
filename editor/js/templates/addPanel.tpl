
<form id="new-panel">
	<h2>Add Panel</h2>
	<label for="name">Name</label>
	<input type="text" name="name" value="" />
	<label for="text">Text</label>
	<textarea name="text"></textarea>
	<label for="audio">Audio</label>
	<select name="audio">
		{{#audio_options }}
			<option value="{{ value }}">{{ name }}</option>
		{{/audio_options }}
	</select>
	<label for="animation">Animation</label>
	<select name="animation">
		{{#animation_options }}
			<option value="{{ value }}">{{ name }}</option>
		{{/animation_options }}
	</select>
	<div class="button cancel">Cancel</div>
	<div class="button submit">Submit</div>
</form>