Vue.component('entry-list', {
    template:
    `
        <div>
            <p v-for="entry in entries">{{entry.date}} - {{entry.vibe}} - {{entry.text}}</p>

            <div>
        <h2>New entry</h2>
        <select id="selectVibe" v-model="newEntry.vibe">
            <option v-for="vibe in vibes"> {{ vibe.label }} </option>
        </select>
        <input type="text" placeholder="optional text" v-model="newEntry.text" />
        <button @click="addEntry">Add new entry</button>
        </div>
        </div>
    `,

    data() {
        return {
            entries: [
                { vibe: 'Test', date: new Date(), text: 'Servus' }
            ],
            newEntry: {
                vibe: '', date: '', text: ''
            },
            vibes: [
                { label: 'Froehlich' },
                { label: 'Schrecklich' }
            ]
        }
    },
    
    methods: {
        addEntry() {
            this.newEntry.date = new Date();
            console.log(this.newEntry.vibe + ' ' + this.newEntry.date + ' ' + this.newEntry.text);
            this.clearNewEntry();

        },
        clearNewEntry() {
            this.newEntry.vibe = '';
            this.newEntry.date = '';
            this.newEntry.text = '';
        }

    }

});

new Vue({
    el: '#root',

});

