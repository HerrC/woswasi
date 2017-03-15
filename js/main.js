window.Event = new Vue();

Vue.component('new-entry', {
    template: `<div>
    <img 
        v-for="mood in moods" 
        v-bind:class="{selected:isSelected(mood.label)}" 
        :src="mood.path" 
        @click="setSelected(mood.label)"
    />
    <br /><br />
        <p class="control">
            <input class="textarea" type="textarea" placeholder="optional text" v-model="newEntry.text" @keyup.enter.ctrl="addEntry" />
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
            selectedItem: null
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
            this.selectedItem = null;
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

Vue.component('tag-cloud', {

    template: `<div>
        <span v-for="tag in tags" class="tag is-medium" v-bind:class="{'is-info':isSelected(tag.id)}">{{tag.label}}<button v-bind:class="{delete:isSelected(tag.id)}" /></span>
    </div>`,

    data () {
        return {
            selectedTags: [2, 4],

            tags: [
                {id: 1, label: 'Arbeit'},
                {id: 2, label: 'Privat'},
                {id: 3, label: 'Iwi'},
                {id: 4, label: 'Hobby'}
            ]
        }
    },

    computed: {
        tagclass: function(tagId) {
            return {
                tag: true,
                'is-info': true,
                selected: (this.selectedTags.indexOf(tagId) > -1) 
            }
        }
    },

    methods: {
        isSelected(tagId) {
            return (this.selectedTags.indexOf(tagId) > -1);
        }
    }
});

Vue.component('entry', {

    props: ['value'],
    
    template: `
        <div>
            <p>{{getPrettyDate(value.date)}} - {{value.mood}} - {{value.text}}</p>
        </div>
    `,

    data () {
        return {
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
    }

});

Vue.component('entry-list', {

    template:
    `
        <div>
            <entry v-for="entry in entries" :value="entry"></entry>
        </div>
    `,

    data() {
        return {
            entries: [
            ],
        }
    },

    methods: {
        
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

