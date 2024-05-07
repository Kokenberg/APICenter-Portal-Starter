import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { Method } from "../../../services/IHttpClient";
import { useApiService } from "../../../util/useApiService";
import { HttpClient } from "../../../services/httpClient";
import { BlobServiceClient, AnonymousCredential } from "@azure/storage-blob";

const Spec = () => {
    const { id, version, specification } = useParams() as { id: string, version: string, specification: string };
    const [schemaUrl, setSchemaUrl] = useState("");
    const httpClient = new HttpClient();

    useEffect(() => {
        getSpecificationLink(id);
    }, [schemaUrl]);

    const getSpecificationLink = async (id) => {
        const apiService = useApiService();
        var downloadUrl = await apiService.getSpecificationLink(id, version, specification);
        setSchemaUrl(downloadUrl);

        //var data = await httpClient.fetchData2(downloadUrl, Method.GET);

        //var result = await httpClient(url, { Method.POST, headers })
        //fetch(url, { headers })
        //.then(response => response.json())
        //.then(data => console.log(data))
        //.catch(error => console.error(error));

        // List containers
        //const blobClient = new BlobServiceClient(schemaUrl, new AnonymousCredential())
        //    .getContainerClient('')
        //    .getBlobClient('');
        //const downloadResponse = await blobClient.download();
        //const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);
        //console.log('Downloaded blob content:', downloaded.toString());
    }

    async function streamToBuffer(readableStream) {
        return new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            readableStream.on('data', (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on('error', reject);
        });
    }

    //const sw = SwaggerUI({
    //dom_id: "test",
    //url: schemaUrl
    //});

    return (
        schemaUrl && (<div id="test" >{schemaUrl}</div>)
    );
}

export default Spec;
