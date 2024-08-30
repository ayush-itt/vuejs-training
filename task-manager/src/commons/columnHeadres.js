export const todaysTaskHeaders = [
    { headerName: "Id", field: "id", sortable: false },
    {
        headerName: "Title",
        field: "title",
    },
    {
        headerName: "Created Date",
        field: "createdDate",
        filter: false,
    },
    {
        headerName: "Due Date",
        field: "dueDate",
        sortable: false,
        filter: false,
    },
    {
        headerName: "Priority",
        field: "priority",
        cellRenderer: (params) => {
            return params.value
                ? `<span class="mdi mdi-star" style="color:green"></span>`
                : ``;
        },
        filter: false,
    },
];

export const taskHeaders = [
    { headerName: "ID", field: "id", sortable: false },
    {
        headerName: "Title",
        field: "title",
    },
    {
        headerName: "Created Date",
        field: "createdDate",
    },
    {
        headerName: "Due Date",
        field: "dueDate",
    },
    {
        headerName: "Priority",
        field: "priority",
        cellRenderer: (params) => {
            return params.value
                ? `<span class="mdi mdi-star" style="color:green"></span>`
                : ``;
        },
    },
    {
        headerName: "Status",
        field: "status",
    },
    {
        headerName: "Action",
        field: "action",
        cellRenderer: "ActionRenderer",
        sortable: false,
        filter: false,
    },
];

export const gridOptions = {
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: [5, 10, 20],
    defaultColDef: {
        sortable: true,
        filter: true,
    },
};
