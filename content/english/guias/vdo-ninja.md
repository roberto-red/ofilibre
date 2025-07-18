---
categories:
- Resources
- Free Software
date: 2025-01-30
image: /images/guias/vdo-ninja/logo-vdo-ninja.png
tags:
title: VDO.ninja for broadcasting virtual meetings
type: guias
---

For video call cafes, we will use the OBS resource called vdo.ninja:
it's a technology that allows secure real-time communication between web browsers.

Everything happens within the browser (peer to peer), so it has low latency, good video quality, is very versatile, and connects directly with OBS through a browser-type source.

## How to configure the vdo.ninja tool

When we enter the main page, we find this screen:

![Main menu of VDO.ninja](/images/guias/vdo-ninja/menuPrincipal.png)

For what we want to use, it's convenient to choose the "Create a Room" option. Within this option, we have this:

![Room creation](/images/guias/vdo-ninja/createRoom.png)

In our particular case, the CafesOfiLibre room is already created and bookmarked in Google's bookmark bar in Neiser's laptop session.

When we want to start again, we will write a name and a password (for more security), and select the option that says "The director will be performing as well, appearing in group scenes", so we can also join the "call". Finally, we will click on "Enter the room's Control Center in the director's role" to control everything.

![Invitation to the room](/images/guias/vdo-ninja/linksInvitacion.png)

What we will have to share with the guest is the link on the left that is in the blue box that says INVITE A GUEST. To have the image and audio in OBS, we will need to add the link on the right in the green box as a browser source.

## What does the guest have to do?

The guest will see this and select "Join Room with a Camera", then select the microphone and camera:

![Option to join the room](/images/guias/vdo-ninja/opcionUnirse.png)

![Configuration to join the room](/images/guias/vdo-ninja/unirseSalaConfig.png)

Now, as directors, we will see this:

![The guest has joined the room](/images/guias/vdo-ninja/usuarioUnido.png)

And we will be able to control the volume, mute, or deafen the guest, and many more things.

To be able to talk to the guest and do the podcast, we will join as participants being the director, in this way (by clicking the button that says "Enable director's microphone or video"):

![Guest and host of the room](/images/guias/vdo-ninja/usuarioYHost.png)

![Option to join for the host](/images/guias/vdo-ninja/unirseHost.png)

## Configuration in OBS

Now that we have the call configured, we need to configure in OBS how everything will be seen and heard:

![OBS configuration](/images/guias/vdo-ninja/obsConfig.png)

We choose the width and height and select the checkbox that says "Control audio via OBS", so the sound of the call is heard, both our microphone and the guest's microphone.