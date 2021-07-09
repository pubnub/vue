# PubNub Vue

Welcome! We're here to get you started quickly with your integration between PubNub and Vue.
PubNub makes it easy to integrate real-time bidirectional communication into your app.

**Pubnub Vue** is a wrapper of **PubNub JavaScript SDK** [version 4](https://www.pubnub.com/docs/javascript/pubnub-javascript-sdk-v4)
that adds a few of extra features to simplify the integration with Vue:

You can still use the native PubNub JavaScript SDK if you feel this will be more suitable for your situation.

## Communication

- If you **need help** or have a **general question**, contact <support@pubnub.com>
- If you **want to contribute**, please open a pull request against the `develop` branch.

## Install PubNub Vue SDK

```shell
npm install pubnub-vue
```

## How to use PubNubVue

In order to get the integration between your Vue's application and PubNub, PubNubVue must be installed like a plugin

**PubNubVue** must be installed like a plugin.

```js
import Vue from 'vue';
import PubNubVue from 'pubnub-vue';
import App from './App';

Vue.use(PubNubVue, { subscribeKey: 'YOUR SUBSCRIBE KEY HERE', publishKey: 'YOUR PUBLISH KEY HERE' });

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
```

## Where subscribe

Use the hook mounted to subscribe channels using **$pnSubscribe** method


```js
export default {
  name: 'app',
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
```

## How render real time messages directly into the IU

**$pnGetMessage** is the most easy way of connecting real time message directly in the UI.

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>channel</td>
    <td>String</td>
	<td>Yes</td>
	<td></td>
	<td>Channel which will be listened.</td>
</tr>
<tr>
    <td>callback</td>
    <td>Function</td>
	<td>Optional</td>
	<td></td>
	<td>Function which will be invoked as soon as received a new real time message.</td>
</tr>
<tr>
    <td>keepMessage</td>
    <td>Number</td>
	<td>Optional</td>
	<td></td>
	<td>Number of messages which are kept and rendered.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
<template>
  <div id="app">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1'),
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
```

## How to catch each message

**pnGetMessage** will receive a second parameter which is a callback function that is going to be invoked as soon as received a new
real time message. This will allow to apply a transformation or manipulate of somehow to each message or implement a custom mechanism to render these.

```js
<template>
  <div id="app">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1', this.receptor),
    },
  },
  methods: {
    receptor(msg) {
      msg.message = `sent - ${msg.message}`;
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
```


## How to publish a message

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>args</td>
    <td>Object</td>
	<td>Yes</td>
	<td></td>
	<td>A hash of arguments to make the unsubscription.</td>
</tr>
<tr>
    <td>callback</td>
    <td>Function</td>
	<td>Optional</td>
	<td></td>
	<td>Function which will be invoked after publishing the message.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
<template>
  <div id="app">
    <ol>
      <li v-for="msg in ch1">{{ msg.message }}</li>
    </ol>
    <button v-on:click="push">push</button>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      ch1: this.$pnGetMessage('ch1', this.receptor),
    },
  },
  methods: {
    receptor(msg) {
      msg.message = `sent - ${msg.message}`;
    },
    push() {
      this.$pnPublish({ channel: 'ch1', message: Date.now() }, (status, response) => console.log(status, response));
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
```


## How to get the status

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>callback</td>
    <td>Function</td>
	<td>Optional</td>
	<td></td>
	<td>Function which will be invoked as soon as a new change in the network.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
<template>
  <div id="app">
    {{ category }}
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      category: '',
    },
  },
  methods: {
    status(st) {
      this.category = st.category;
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
  },
};
</script>
```

## How to get presence messages

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>channel</td>
    <td>String</td>
	<td>Yes</td>
	<td></td>
	<td>Channel which will be listened.</td>
</tr>
<tr>
    <td>callback</td>
    <td>Function</td>
	<td>Optional</td>
	<td></td>
	<td>Function which will be invoked as soon as a new presence message is invoked.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
<template>
  <div id="app">
    ...
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      occupancy: 0,
    };
  },
  methods: {
    presence(ps) {
      this.occupancy = ps.occupancy;
      console.log(ps);
    },
  },
  mounted() {
    this.$pnSubscribe({ channels: ['ch1', 'ch2'], withPresence: true });
    this.$pnGetPresence('ch1', this.presence);
  },
};
</script>
```

## How to unsubscribe a channel

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>args</td>
    <td>Object</td>
	<td>Yes</td>
	<td></td>
	<td>A hash of arguments to make the unsubscription.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
this.$pnUnsubscribe({ channels: ['ch1'] });
```

## How to clean the stack of messages

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>channel</td>
    <td>String</td>
	<td>Yes</td>
	<td></td>
	<td>Channel which will be cleaned.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
this.$pnClean('ch1');
```

## How to stop of receiving real time messages

<table>
<tr>
    <th>Parameter</th>
    <th>Type</th>
	<th>Required</th>
	<th>Defaults</th>
	<th>Description</th>
</tr>
<tr>
    <td>channel</td>
    <td>String</td>
	<td>Yes</td>
	<td></td>
	<td>Channel which will be released.</td>
</tr>
<tr>
    <td>instanceName</td>
    <td>String</td>
	<td>Optional</td>
	<td>'default'</td>
	<td>Instance to use into the component.</td>
</tr>
</table>

```js
this.$pnRelease('ch1');
```

## How to access to the original instance

If somehow is neccesary to access to the instance in order to get using all feature given for javascript SDK.

```js
let instance = this.$pnGetInstance();
```

```js
import PubNubVue from 'pubnub-vue';

const instance = PubNubVue.getInstance();

const instance2 = PubNubVue.getInstance('instance2');

```

## How to get a new instance

The **$pnGetInstance** method will return the main instance which be created by default but if we need to create an additional instance, we can pass as a parameter the name of a new one instance and with this same name, you will have the capability of retrieving from other component inside of our application.

```js
<template>
 <div id="app">
   <ol>
     <li v-for="msg in ch1">{{ msg.message }}</li>
   </ol>
 </div>
</template>
<script>
 export default {
   name: 'app',
   data() {
     return {
       ch1: this.$pnGetMessage('ch1', null, 10, 'instance2'),
     };
   },
   mounted() {
     this.$pnSubscribe({ channels: ['ch1'] }, 'instance2');
   },
   created() {
     this.$pnGetInstance('instance2');
   },
 };
</script>
```
