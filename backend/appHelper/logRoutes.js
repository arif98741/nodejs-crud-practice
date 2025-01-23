import listEndpoints from 'express-list-endpoints';

const logRoutes = (app) => {
    const routes = listEndpoints(app).map(endpoint => {
        const methods = Array.isArray(endpoint.methods)
            ? endpoint.methods.join(', ').toUpperCase()
            : Object.keys(endpoint.methods || {}).join(', ').toUpperCase();

        const middlewares = Array.isArray(endpoint.middlewares)
            ? endpoint.middlewares.join(', ') // Join middleware names into a single string
            : 'None'; // Default if no middlewares are found

        return {
            Method: methods || 'UNKNOWN', // Handle cases where methods may not exist
            Path: endpoint.path,
            Middleware: middlewares
        };
    });

    // Display routes in tabular format
    console.table(routes);
};

export default logRoutes;