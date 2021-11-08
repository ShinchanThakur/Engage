let divSelectRoom = document.getElementById('selectRoom')
let divConsultingRoom = document.getElementById('consultingRoom')
let btnGoRoom = document.getElementById('goRoom')
let inputRoomNumber = document.getElementById('roomNumber')
let localVideo = document.getElementById('localVideo')
let remoteVideo = document.getElementById('remoteVideo')
let h2CallName = document.getElementById('callName')
var inputCallName = document.getElementById('inputCallName')
let btnSetName = document.getElementById('buttonSetName')
let divChatRoom = document.getElementById('chatRoom')
let chatList = document.getElementById('dynamic-list')
let chatBox = document.getElementById('chatBox')
let btnChatSend = document.getElementById('chatSendButton')
let divRoomNameSetter = document.getElementById('roomNameSetter')

let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller, dataChannel

// function removeItem(){
//     var item = document.getElementById(chatBox.value)
//     if(item)
//         chatList.removeChild(item)
// }

const iceServers = {    //Required before rtcPeerConnection
    'iceServer': [      //Array of STUN server objects
      { 'urls': 'stun:stun.services.mozilla.com' },     //We can use these servers for free
      { 'urls': 'stun:stun.l.google.com:19302' }        //But these are not recommended for production
    ]                                                   //For production, we should create our own STUN and TURN servers
  };
  
  const streamConstraints = {   //Setting constraints for audio and video
    audio: false,
    video: true
  }

  const socket = io()   //It is going to connect to the signalling server

  btnGoRoom.onclick = function () {
      if(inputRoomNumber.value === '') {
          alert("Please type a room name")
      } else {
            roomNumber = inputRoomNumber.value
            socket.emit('create or join', roomNumber)   //Sending message to the signalling server
            divSelectRoom.style = "display: none"
            divConsultingRoom.style = "display: block"
      }
  }

//   btnSetName.onclick = function () {
//         if(inputCallName.value === '') {
//             alert("Please type a call name")
//         } else {
//             dataChannel.send(inputCallName.value)   //Sending message through data channel
//             h2CallName.innerText = inputCallName.value
//             divRoomNameSetter.style = "display: none"
//         }
//     }

    function addChat(chatText){
        var li = document.createElement("li")
        li.setAttribute('id', chatText)
        li.appendChild(document.createTextNode(chatText))
        chatList.appendChild(li)
    }

    btnChatSend.onclick = function () {
        addChat(chatBox.value)
        dataChannel.send(chatBox.value)
    }

  socket.on('created', function (room) {    //For first user
        navigator.mediaDevices.getUserMedia(streamConstraints)  //Getting access to video and audio of user
            .then(function(stream) {
                localStream = stream
                localVideo.srcObject = stream
                isCaller = true     //Change its name to firstCaller later
            })
            .catch(err => {
                console.log("An error ocurred when accessing media devices", err)
            })
  })

  socket.on('joined', function(room) {     //For the other user
    console.log('inside joined')
    navigator.mediaDevices.getUserMedia(streamConstraints)
        .then(function(stream) {
            
            localStream = stream
            localVideo.srcObject = stream
            socket.emit('ready', roomNumber)    //Notifying the server (signalling server) that we are ready
                                                //The server will notify other users of that particular roomNumber that we are ready to join
            console.log('ready emitted')
        })
        .catch(err => {
            console.log("An error ocurred when accessing media devices", err)
        })
  })

  socket.on('ready', function() {    //Handler for ready message
                                //This means that the second user has joined the call 
                                //and has notified the signalling server that it is ready for offer and answer process
    if(isCaller){       //For first user
        rtcPeerConnection = new RTCPeerConnection(iceServers)   //Creating rtcPeerConnection and setting the iceServers
        rtcPeerConnection.onicecandidate = onIceCandidate       //This function will be executed when this caller finds or creates an iceCandidate
                                                                //Everytime a new iceCandidate is found, this onIceCandidate event is triggered
        //Ice candidate works in 3 steps: 1. Getting devices IP address
        //                                2. Use a STUN server
        //                                3. OR use a TURN server
        rtcPeerConnection.ontrack = onAddStream                 //Everytime the rtcPeerConnection receives a remote stream, onTrack event is triggered

        localStream.getTracks().forEach((track) => {
            rtcPeerConnection.addTrack(track, localStream);
        });

        // rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream)      //Adding the media streams to rtcPeerConnection
        // rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream)      //Track 0 has audio and track 1 has video
        
        //rtcPeerConnection has been set up
        //Now sending offer

        dataChannel = rtcPeerConnection.createDataChannel(roomNumber)   //Creating data channel on the caller side
        // divRoomNameSetter.style = "display: block"
        divChatRoom.style = "display: block"
        console.log('dataChannel bann gaya')
        dataChannel.onmessage = event => {      //This event will be triggered when dataChannel has a message
            // h2CallName.innerText = event.data
            // divRoomNameSetter.style = "display: none"
            addChat(event.data)
        }

        rtcPeerConnection.createOffer()     //Some of these processes will keep on going, so it is better to make this async await
                                            //Dont know the real reason, but writing this before dataChannel code causes problem with dataChannel
            .then(sessionDescription => {   //sessionDescription contains all info about the caller etc.
                console.log('sending offer', sessionDescription)
                rtcPeerConnection.setLocalDescription(sessionDescription)       //Setting session description of the local user
                socket.emit('offer', {
                    type: 'offer',
                    sdp: sessionDescription,
                    room: roomNumber
                })
            })
            .catch(err => {
                console.log(err)
            })
        
        
    }
  })

socket.on('offer', function(event) {    
    if(!isCaller){      //For other user
        rtcPeerConnection = new RTCPeerConnection(iceServers)
        rtcPeerConnection.onicecandidate = onIceCandidate
        rtcPeerConnection.ontrack = onAddStream
        
        localStream.getTracks().forEach((track) => {
            rtcPeerConnection.addTrack(track, localStream);
        });

        console.log('received offer', event)
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))    //Setting session description of the remote user
        
        console.log('dataChannel assign nahi ho raha hai')
        // divRoomNameSetter.style = "display: block"
        divChatRoom.style = "display: block"
        rtcPeerConnection.ondatachannel = event => {    //Receiving data channel created by other user
            dataChannel = event.channel                 //Setting data channel of local to data channel of remote
            console.log('dataChannel assign ho gaya')
            dataChannel.onmessage = event => {
                // h2CallName.innerText = event.data
                // divRoomNameSetter.style = "display: none"
                addChat(event.data)
            }
        }

        rtcPeerConnection.createAnswer()
            .then(sessionDescription => { 
                console.log('sending answer', sessionDescription)
                rtcPeerConnection.setLocalDescription(sessionDescription)
                socket.emit('answer', {
                    type: 'answer',
                    sdp: sessionDescription,
                    room: roomNumber
                })
            })
            .catch(err => {
                console.log(err)
            })
        
    }
})

socket.on('answer', function(event) {      //For first user (or maybe for all. Check it)
    console.log('received answer', event)
    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
})

socket.on('candidate', function(event) {
    var candidate = new RTCIceCandidate({     //Creating iceCandidate
        sdpMLineIndex: event.label,
        candidate: event.candidate,
        sdpMid: event.id
    })
    console.log('received candidate event', candidate)
    rtcPeerConnection.addIceCandidate(candidate)    //Adding iceCandidate to rtcPeerConnection
})

function onAddStream(event) {       //Setting up remote stream
    remoteVideo.srcObject = event.streams[0]
    remoteStream = event.streams[0]
}

function onIceCandidate(event) {    //Sending the iceCandidate
    if(event.candidate) {
        console.log('sending ice candidate', event.candidate)
        socket.emit('candidate', {      //Emitting message to the signalling server
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
            room: roomNumber
        })
    }
}
