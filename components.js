
class RecordsTable {
    constructor(root) {
        this.table_container = document.createElement('div');
        this.table_container.className = 'recordtable_table_container';

        root.appendChild(this.table_container);
    }


    _build(data) {
        let table = document.createElement('table');
        table.className = 'recordtable_table';

        this.table_container.appendChild(table);


        let table_header = document.createElement('tr');

        table.appendChild(table_header);


        // Will be used over and over again for Header Cells
        let th;
        

        // Manually add the Index column first
        th = document.createElement('th');
        th.className = 'recordtable_th';
        th.innerHTML = 'index';

        table_header.appendChild(th);


        // Figure out what the Columns are by looking at the first Record
        let columns = Object.keys(data[0]);

        // Add the Rest of the Columns
        for(let i = 0; i < columns.length; i++) {
            th = document.createElement('th');
            th.className = 'recordtable_th';

            th.innerHTML = columns[i];

            table_header.appendChild(th);
        }


        // Will be used over and over again for each row of data
        var td;
        var tr;
        var div;


        for(let i = 0; i < data.length; i++) {
            tr = document.createElement('tr');
            table.appendChild(tr);


            // Add the Index
            td = document.createElement('td');
            td.className = 'recordtable_td';

            div = document.createElement('div');
            div.className = 'recordtable_data_container';

            div.innerHTML = i;

            tr.appendChild(td);
            td.appendChild(div);


            // Add the other columns for that row
            for(let j = 0; j < columns.length; j++) {
                td = document.createElement('td');
                td.className = 'recordtable_td';

                div = document.createElement('div');
                div.className = 'recordtable_data_container';

                div.innerHTML = data[i][columns[j]];

                tr.appendChild(td);
                td.appendChild(div);
            }
        }
    }


    // Depth First Search through the DOMTree removing leaves as you go, lastChild first so that childNodes array doesn't have to shift
    _remove_children(root) {
        while(root.lastChild) {
            this._remove_children(root.lastChild);

            root.removeChild(root.lastChild);
        }
    }


    update(data) {
        this._remove_children(this.table_container);

        this._build(data);
    }
}




