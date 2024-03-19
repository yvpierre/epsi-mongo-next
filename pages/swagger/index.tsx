import Head from 'next/head';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
const Swagger = () => {
    return ( <div>
            <Head>
                <title>API Description</title>
                <meta name="description" content="API Description" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <SwaggerUI url="/api/doc" />
        </div>
    ); };
export default Swagger;
