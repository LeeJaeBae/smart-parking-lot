import Janus from './janus/janus';

let server = null;
let janus = null;
let videoHandlerOnPC = null;
if (window.location.protocol === 'http:') {
	server = 'http://localhost:8088/janus';
} else {
	server = 'https://localhost:8088/janus';
}

let opaqueId = 'test';
let room = 1234;
let mypvtid = 123123;

export default function plublisher() {
	Janus.init({
		debug: 'all',
		callback: () => {
			janus = new Janus({
				server,
				apaqueId: 'test',
				success: () => {
					janus.attach({
						plugin: 'janus.plugin.videoroom',
						opaqueId: 'test',
						success: (pluginHandle) => {
							videoHandlerOnPC = pluginHandle;
							Janus.log(`Attached :: ${pluginHandle.getPlugin()}`);
							videoHandlerOnPC.send({
								message: { request: 'join', room: 1234, ptype: 'publisher' },
							});
						},
						onmessage: (msg, jsep) => {
							Janus.debug(`::: Got a message from the publisher ::: ${msg}`);
							let event = msg['videoroom'];
							if (event) {
								console.log(event);
								if (event === 'joined') {
									let list = msg['publishers'];
									Janus.log(`list of publishers : ${list}`);
									console.log(list);
									list.forEach((v) => {
										let id = v['id'];
										let display = v['display'];
										if (display !== null) {
											Janus.log(`${display}'s feed has made`);
											newRemoteFeed(id, display);
										}
									});
								} else {
									let list = msg['publishers'];
									Janus.log(`list of publishers : ${list}`);
									console.log(list[0].display);
									list.forEach((v) => {
										let id = v['id'];
										let display = v['display'];
										if (display !== null) {
											Janus.log(`${display}'s feed has made`);
											newRemoteFeed(id, display);
										}
									});
								}
							}
						},
					});
				},
			});
		},
	});
}

function newRemoteFeed(id, displayValue) {
	let remoteFeed = null;
	janus.attach({
		plugin: 'janus.plugin.videoroom',
		opaqueId: opaqueId,
		success: function (pluginHandle) {
			remoteFeed = pluginHandle;

			Janus.log('Plugin attached! (' + remoteFeed.getPlugin() + ', id=' + remoteFeed.getId() + ')');

			let subscribe = {
				request: 'join',
				room: room,
				ptype: 'subscriber',
				feed: id,
				private_id: mypvtid,
			};

			remoteFeed.send({ message: subscribe });
		},

		onmessage: function (msg, jsep) {
			Janus.debug(' ::: Got a message (subscriber) :::', msg);
			let event = msg['videoroom'];
			Janus.debug('Event: ' + event);
			if (msg['error']) {
			} else if (event) {
				if (event === 'attached') {
					remoteFeed.rfdisplay = displayValue;

					Janus.log(
						'Successfully attached that Display Value is' +
							' (' +
							remoteFeed.rfdisplay +
							') in room ' +
							msg['room']
					);
				}
			}
			if (jsep) {
				Janus.debug('Handling SDP as well...', jsep);
				// Answer and attach
				remoteFeed.createAnswer({
					jsep: jsep,
					// Add data:true here if you want to subscribe to datachannels as well
					// (obviously only works if the publisher offered them in the first place)
					media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
					success: function (jsep) {
						Janus.debug('Got SDP!', jsep);
						var body = { request: 'start', room: room };
						remoteFeed.send({ message: body, jsep: jsep });
					},
					error: function (error) {
						Janus.error('WebRTC error:', error);
					},
				});
			}
		},
		onremotestream: function (stream) {
			// div에 붙일 이름 규칙 정하기
			let video = document.getElementById('myvideo');
			// tag에 stream data 붙이기
			console.log(stream);

			Janus.attachMediaStream(video, stream);
		},
	});
}
