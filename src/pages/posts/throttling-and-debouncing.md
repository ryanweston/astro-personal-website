---
layout: ../../layouts/Post.astro
title: 'What are throttling and debouncing events?'
pubDate: 2023-02-22
description: 'Continuing to improve as a frontend engineer and finding my niche.'
draft: true
---

A throttled event is an event that sets a delay after every successful call. To limit the amount of event executions that can be executed in given time period. For example, we have an incrementor function that we want to limit to only be callable every `300ms`.

```js
let count = 0; 

function incrementCount() {
	count++;
}

const throttledCount = throttle(incrementCount(), 300)

throttledCount()
```

When it is first run, there is no delay set and the callback will be executed. After executing, the throttler will set a delay of `300ms`, every call will then check to see if the given time `300ms` has passed, if it hasn't the request won't be executed, if it has, then the call will be made and the timer set again.

In a rough snippet, ignoring scope, it can look like this (this won't work in practice and has been over-simplified):

```js
function throttle(functionToCall, delay) {
	const shouldWait = false // First call shouldn't have a delay
	
	if (!shouldWait) {
		functionToCall() // Call function
		shouldWait = true // Set should wait to true after function called
		
		// A timeout that will allow the call to be made after the delay is
		// over by setting the shouldWait state.
		setTimeout(() => shouldWait = false, delay)
	}
}
```

This is different to a debounced event. 


```js
let count = 0; 

function incrementCount() {
	count++;
}

const debouncedCount = debounce(incrementCount(), 300)

debouncedCount()
```


**Every time** the debounced call is made, a timer/delay is set and the function will execute after the timer has resolved. Similar to a `setTimeout`:

```js 
setTimeout(incrementCount(), 300)
```

The delay needs to be resolved/completed before the callback function is exectuted. 

However, every time the debounced call is made, this timer is reset.

```js
function debounce(functionToCall, delay) {
	let timer;

	// Function that will be called after timer is finished 
	const makeCall = () => { 
		timer = null // Reset timer after successful call
		functionToCall()
	}
	
	clearTimeout(timer) // Clear previous timeout & call
	
	timer = setTimeout(makeCall(), delay) // Set the timer
}
```

If a call is made before the previous has resolved, it will be cancelled.

An easier way to look at this, is that the throttler will set set this delay after every successful event. So after the `incrementCount` function has exectuted, the timer will be set again, and `incrementCount` will only be executed after the given time. The debouncer will set this delay after ***every call*** to the debouncer (in most cases). A successfully debounced request will be one where the last request's timer has run out (been resolved), and a new one will be set. 

TLDR;

Throttle: An event where the delay is reset after a ***successful*** call.
Debounce: An event where the delay is reset on ***every*** call.