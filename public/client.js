Vue.component("v-select", VueSelect.VueSelect);



{
    const vm = new Vue({
        el: '#app',
        created: function(){

            setInterval(() => {this.setLogs()},1000);
        },
        data: {
            options: [
                {serverName: "time server"},
                {serverName: "secret server"},
                {serverName: "secret history server"},
            ],
            formItem: {
                secretUpdate: '',
            },
            logs: [],
            buttonSort: {
                text: 'Ascending'
            }
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
            <h2>Results</h2>:{{logs.length}}
            <button type="button" v-on:click="sortInvert">{{ buttonSort.text }} </button>
            <div id="result" >
               <ul v-for="log in logs">
                    <li>{{ log }}</li>
                </ul>
            </div>
        </div>
        </div>
        `,
        computed: {

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
            },
            sortInvert: function () {
                if (this.buttonSort.text == 'Descending') {
                    this.buttonSort.text = 'Ascending';
                    console.log("invert")
                } else {
                    this.buttonSort.text = 'Descending';
                    console.log("reverst")
                }
            },
            setLogs: function(e) {

                if(this.logs.length>=100)
                {
                    this.logs.splice(99,1);
                }

                this.logs.unshift({
                        timeserver:{
                            request: '',
                            response: '',
                        },
                        secretserver:{
                            request: '',
                            response: '',
                        },
                        secrethistoryserver: {
                            request: '',
                            response: '',
                        }
                    });

                Promise.all([
                    getTimeServerLog(),
                    getSecretLog(),
                    getSecretHistoryLog()
                ])
                    .then( () => {
                        // TODO
                        console.log('promiseAll');
                    })
                    .catch(err => console.error(err));
            },
            getLogs: function(e) {
                console.log(JSON.stringify(this.logs));
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

    function getTimeServerLog(){
        vm.logs[0].timeserver.request = Date.now();

        return fetch('http://localhost:4000', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                response.json()
                    .then(promise => {
                        vm.logs[0].timeserver.response = promise.time;
                    })
                    .catch(err => {
                        vm.logs[0].timeserver.response = 'DOWN';
                        console.error(err);
                    });
            });
    }


    function getSecretLog(){
        vm.logs[0].secretserver.request = Date.now();

        return fetch('http://localhost:4001/secret', {
            method: 'GET',
        })
            .then(response => {
                response.json()
                    .then(promise => {
                        vm.logs[0].secretserver.response = promise;
                    })
                    .catch(err => {
                        vm.logs[0].secretserver.response = 'DOWN';
                        console.error(err);
                    });
            });
    }

    function getSecretHistoryLog() {
        vm.logs[0].secrethistoryserver.request = Date.now();

        return fetch('http://localhost:4002', {
            method: 'GET',
        })
            .then(response => {
                response.json()
                    .then(promise => {
                        vm.logs[0].secrethistoryserver.response =promise;

                    })
                    .catch(err => {
                        vm.logs[0].secrethistoryserver.response = 'DOWN';
                        console.error(err);
                    });
            });
    }
}
