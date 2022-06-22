export default {
    moduleName: "laboravi",
    moduleDescription: "",
    routes: {
        main_page: {
            name: "Registrar Ponto",
            signedUser: false,
            getPath: () => "/laboravi",
            path: "/laboravi",
            pathComponent: "client/src/sreens/PointRecord",
            exact: true
        },
        history_point: {
            name: "Histórico de Ponto",
            signedUser: false,
            getPath: () => "/laboravi",
            path: "/laboravi",
            pathComponent: "client/src/sreens/HistoryPoints",
            exact: true
        },
    }
};