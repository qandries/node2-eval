Vue.component("v-select", VueSelect.VueSelect);

{
    const vm = new Vue({
        el: '#app',
        data: {
            options: [
                {serverName: "time server"},
                {serverName: "secret server"},
                {serverName: "secret history server"},
            ],
            formItem: {
                secretUpdate: '',
            },
        },
        template: `
        <div>
            <h2>Server</h2>
            <v-select label="serverName" :options="options"></v-select>
            
            <h2>Edit secret</h2>
            <label>Secret:</label>
            <input type="text" v-model="formItem.secretUpdate">
            <button type="submit" v-on:click="update">Update</button>
            <div>
            <h2>Results</h2>
            <div id="result">
               <ul v-on:click="displayResult">
                    <li></li>
                </ul>
            </div>
        </div>
        </div>
        `,
        computed: {
            displayResult() {
                return fetch('http://localhost:4001/secret')
                    .then(res => res.json())
            }
        },
        methods: {
            update: function (e) {
                e.preventDefault();
                const data = this.formItem;
                console.log(data);
                updateData(data)
                    .then(() => {
                        console.log('success');
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    });

    function updateData(data) {
        return fetch('http://localhost:4001/secret', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log(res)
            })
    }
}
