window.Event = new Vue();

Vue.component('new-entry', {
    template: `<div>
        <h2>New entry</h2>
        <select id="selectVibe" v-model="newEntry.vibe">
            <option v-for="vibe in vibes"> {{ vibe.label }} </option>
        </select>
        <input type="text" placeholder="optional text" v-model="newEntry.text" />
        <button @click="addEntry">Add new entry</button>
    </div>`,

    data () {
        return {
            newEntry: {
                vibe: '', date: null, text: ''
            },
            vibes: [
                { label: 'Froehlich' },
                { label: 'Schrecklich' }
            ]
        }
    }, 

    methods: {
        addEntry() {
            if (this.vibeIsNotEmpty()) {
                // is set before "sending"
                this.newEntry.date = new Date();
                Event.$emit('applied', this.newEntry);
                this.clearNewEntry();

            }
        }, 
        clearNewEntry() {
            this.newEntry.vibe = '';
            this.newEntry.date = null;
            this.newEntry.text = '';
        },
        vibeIsNotEmpty() {
            return this.newEntry.vibe != null && this.newEntry.vibe != "";
        }
    }
});


Vue.component('entry', {
    template: `
        <p><slot></slot></p>
    `,

});


Vue.component('entry-list', {
    template:
    `
        <div>
            <entry v-for="entry in entries">{{getPrettyDate(entry.date)}} - {{entry.vibe}} - {{entry.text}}</entry>
        </div>
    `,

    data() {
        return {
            entries: [
            ], 
        }
    },

    methods: {
        getPrettyDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        }
    },

    created () {
        Event.$on('applied', (entry) => {
            // why do i have to write here again all properties?
            this.entries.push({vibe: entry.vibe, date: entry.date, text: entry.text});
        });
    }
});

new Vue({
    el: '#root',

    methods: {
    }
});

