<form id="node-details">
	<h2>Current Panel</h2>
	<label for="name">Name:</label>
	<input type="text" value="{{ name }}" />
	<label for="text">Text:</label>
	<textarea name="text">{{ text }}</textarea>
	<label for="audio">Tracks</label>
	  <select name="audio">
	    <option value="1">Track1.mp3</option>
	    <option value="2">Track2.mp3</option>
  	</select>
  	
  	<label for="animations">Animations</label>
   	<select name="animations">
		<option value="1">Animation</option>
		<option value="2">Other Animation</option>
	</select>
	
	<h3>Controls</h3>
	<div class="button delete">Delete</div>
	<div class="button submit">Update</div>
</form>
