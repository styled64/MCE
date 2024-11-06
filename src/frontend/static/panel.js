// ws
const socket = new WebSocket(`ws://${window.location.host}`);

// functions
function createLogElement(message) {
	return $('<p class="log"></p>').text(message);
}

function scrollDown() {
	document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;
}

function addLog(element) {
	$("#console").append(element);
}

function getCommandInput() {
	let value = $("#command").val();
	return { ready: value && value.trim() !== "", value: value }
}

function socket_send_json(json) {
	const object = JSON.stringify(json);
	socket.send(object);
}

socket.addEventListener('open', () => {
	// add events to the objects
	addLog(createLogElement("[MCE] Connected to Minecraft."));

	$("#send").on('click', () => {
		const response = getCommandInput();
		if (response.ready) {
			socket_send_json({
				action: "send-command",
				value: response.value
			});

			// clear input
			$("#command").val('');
		}
	});

	$("#clear").on('click', () => {
		$("#console").empty();
	});

	$("#shutdown").on('click', () => {
		socket_send_json({ action: "shutdown" });
	});
});

socket.addEventListener('message', (event) => {
	var json = JSON.parse(event.data);
	if (json.action == "log-event") {
		var element = createLogElement(json.log);
		addLog(element);
		scrollDown();
	}
});

socket.addEventListener('close', () => {
	alert("Connection Lost. Refresh to attempt to reconnect.");
});
