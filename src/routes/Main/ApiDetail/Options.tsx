/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Body1, Body1Strong, Button, Caption1, Link, MessageBar, MessageBarBody } from "@fluentui/react-components";
import { ArrowDownloadRegular, Document20Regular } from "@fluentui/react-icons";

import VsCodeLogo from "../../../components/logos/VsCodeLogo";
import OpenApiLogo from "../../../components/logos/OpenApiLogo";
import { Api } from "../../../contracts/api";
import { useApiService } from "../../../util/useApiService";

import css from "./index.module.scss";

const Options: FC<{ api: Api; version?: string; definition?: string }> = ({ api, version, definition }) => {
    const apiService = useApiService();
    const navigate = useNavigate();
    const [schemaUrl, setSchemaUrl] = useState("");    

    useEffect(() => {
        getSpecificationLink();
    }, [schemaUrl]);
    
    const getSpecificationLink = async () => {
        if (!version || !definition) return;

        const downloadUrl = await apiService.getSpecificationLink(api.name, version, definition);

        setSchemaUrl(downloadUrl);
    };

    return (
        <div className={css.options}>
            {!version || !definition ? (
                <MessageBar>
                    <MessageBarBody>There are no available options for this API.</MessageBarBody>
                </MessageBar>
            ) : (
                <div className={css.option}>
                    <div>
                        <Document20Regular />
                    </div>
                    <div className={css.optionInfo}>
                        <div className={css.title}>
                            <Body1Strong>API Definition</Body1Strong>
                            {schemaUrl && (
                                <Link href={schemaUrl} className={css.link}>
                                    <Caption1>Download</Caption1> <ArrowDownloadRegular />
                                </Link>
                            )}
                        </div>
                        <Body1 className={css.description}>
                            This file defines how to use the API, including the endpoints, policies, authentication, and
                            responses.
                        </Body1>
                        <div className={css.buttonsWrapper}>
                            <Button
                                icon={<VsCodeLogo />}
                                onClick={() => window.open(`vscode:extension/apidev.azure-api-center`)}
                            >
                                Open in Visual Studio Code
                            </Button>
                            <Button 
                                icon={<OpenApiLogo />}
                                onClick={() => navigate(version + "/" + definition)}>
                                OpenAPI Spec
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Options;
