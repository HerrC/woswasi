window.Event = new Vue();

Vue.component('new-entry', {
    template: `<div>
        <h1>New entry</h1>
        
<img v-for="mood in moods" :src="mood.path" v-bind:class="{selected:isSelected(mood.label)}" @click="setSelected(mood.label)"></img>
<br /><br />
        <p class="control">
            <input class="textarea" type="textarea" placeholder="optional text" v-model="newEntry.text" />
        </p>
        <a @click="addEntry" class="button is-dark">Add new entry</a>
    </div>`,

    data() {
        return {
            newEntry: {
                mood: '', date: null, text: ''
            },
            moods: [
                { label: 'Happy', path: 'icons/mood/happy.png' },
                { label: 'Sad', path: 'icons/mood/sad.png' },
                { label: 'Neutral', path: 'icons/mood/neutral.png' }
            ],
            selectedItem: {}
        }
    },

    methods: {
        addEntry() {
            if (this.moodIsSelected()) {
                // is set before "sending"
                this.newEntry.mood = this.selectedItem;
                this.newEntry.date = new Date();
                Event.$emit('applied', this.newEntry);
                this.clearNewEntry();

            }
        },
        clearNewEntry() {
            this.newEntry.mood = '';
            this.newEntry.date = null;
            this.newEntry.text = '';
        },
        
        moodIsSelected() {
            return this.selectedItem != null && this.selectedItem != "";
        },

        isSelected(menuItem) {
            return this.selectedItem == menuItem;
        },

        setSelected(menuItem) {
            this.selectedItem = menuItem;
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
            <entry v-for="entry in entries">{{getPrettyDate(entry.date)}} - {{entry.mood}} - {{entry.text}}</entry>
        </div>
    `,

    data() {
        return {
            entries: [
            ],
            moods: [
                { label: 'Happy', path: 'icons/mood/happy.png' },
                { label: 'Sad', path: 'icons/mood/sad.png' },
                { label: 'Neutral', path: 'icons/mood/neutral.png' }
            ],
        }
    },

    methods: {
        getPrettyDate(d) {
            return ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
                d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        }
    },

    created() {
        Event.$on('applied', (entry) => {
            // why do i have to write here again all properties?
            this.entries.push({ mood: entry.mood, date: entry.date, text: entry.text });
        });
    }
});

new Vue({
    el: '#root',

    methods: {
    }
});

