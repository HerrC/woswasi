Vue.component('entry-list', {
    template:
    `
        <div>
            <h2>New entry</h2>
            <select id="selectVibe" v-model="newEntry.vibe">
                <option v-for="vibe in vibes"> {{ vibe.label }} </option>
            </select>
            <input type="text" placeholder="optional text" v-model="newEntry.text" />
            <button @click="addEntry">Add new entry</button>

            <p v-for="entry in entries">{{getPrettyDate(entry.date)}} - {{entry.vibe}} - {{entry.text}}</p>

        </div>
    `,

    data() {
        return {
            entries: [
            ],
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
            this.entries.push({
                vibe: this.newEntry.vibe, 
                date: new Date(),
                text: this.newEntry.text});

            this.clearNewEntry();

        },
        clearNewEntry() {
            this.newEntry.vibe = '';
            this.newEntry.date = null;
            this.newEntry.text = '';
        }, 
        getPrettyDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        }
    }
});

new Vue({
    el: '#root',

});

