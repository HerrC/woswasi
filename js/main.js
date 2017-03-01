Vue.component('entry', {

    template: `
        <p><slot></slot></p>
    `,

});


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
            
            <entry v-for="entry in entries">{{getPrettyDate(entry.date)}} - {{entry.vibe}} - {{entry.text}}</entry>
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
            if (this.vibeIsNotEmpty()) {
                // entry data is invalid
                this.entries.push({
                vibe: this.newEntry.vibe, 
                date: new Date(),
                text: this.newEntry.text});

                this.clearNewEntry();
            }

        },
        clearNewEntry() {
            this.newEntry.vibe = '';
            this.newEntry.date = null;
            this.newEntry.text = '';
        }, 
        getPrettyDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        },
        vibeIsNotEmpty() {
            return this.newEntry.vibe != null && this.newEntry.vibe != "";
        }
    }
});

new Vue({
    el: '#root',

});

