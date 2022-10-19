
class RecordsTable {
    constructor(root) {
        this.table_container = document.createElement('div');
        this.table_container.className = 'recordtable_table_container';

        root.appendChild(this.table_container);


        this.table = document.createElement('table');
        this.table.className = 'recordtable_table';

        this.table_container.appendChild(this.table);

        this.datalength = 0;
    }


    _build_header(firstRow) {
        if(firstRow) {
            let table_header = document.createElement('tr');

            this.table.appendChild(table_header);


            // Will be used over and over again for Header Cells
            let th;
            

            // Manually add the Index column first
            th = document.createElement('th');
            th.className = 'recordtable_th';
            th.innerHTML = 'index';

            table_header.appendChild(th);


            // Figure out what the Columns are by looking at the first Record
            let columns = Object.keys(firstRow);

            // Add the Rest of the Columns
            for(let i = 0; i < columns.length; i++) {
                th = document.createElement('th');
                th.className = 'recordtable_th';

                th.innerHTML = columns[i];

                table_header.appendChild(th);
            }
        }
    }


    append(data) {
        if(data && data.length > 0) {
            // Will be used over and over again for each row of data
            var tr;
            var td;
            var div;

            var columns = Object.keys(data[0]);


            for(let i = 0; i < data.length; i++) {
                tr = document.createElement('tr');
                this.table.appendChild(tr);


                // Add the Index
                td = document.createElement('td');
                td.className = 'recordtable_td';

                div = document.createElement('div');
                div.className = 'recordtable_data_container';

                div.innerHTML = this.datalength + i + 1;

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


            this.datalength += data.length;
        }
    }


    // Depth First Search through the DOMTree removing leaves as you go, lastChild first so that childNodes array doesn't have to shift
    _recursiveClear(root) {
        while(root.lastChild) {
            this._recursiveClear(root.lastChild);

            root.removeChild(root.lastChild);
        }
    }

    clear() {
        this._recursiveClear(this.table);

        this.datalength = 0;
    }


    update(data) {
        this.clear();

        if(data && data.length > 0) {
            this._build_header(data[0]);

            this.append(data);
        }
    }
}




