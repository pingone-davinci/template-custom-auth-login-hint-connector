/* eslint-disable camelcase */
const connectorOIDCQueryParams = {
  name: 'OIDC Front-End Redirect',
  description: 'OIDC Front-End Redirect with Query Params',
  connectorId: 'connectorOIDCQueryParams',
  serviceName: 'connector-oidcqueryparams',
  connectorType: 'mfa',
  connectorCategories: [{ name: 'Authenticate', value: 'authenticate' }],
  connectorDetails: 'OIDC Front-End Redirect with Query Params',
  detailImage: null,
  metadata: {
    colors: {
      canvas: '#D3D3D3',
      dark: '#2b355b',
      canvasText: '#FFFFFF',
    },
    logos: {
      canvas: {
        imageFileName: 'openid.svg',
      },
    },
  },

  sections: [
    { name: 'General', value: 'general', default: true },
    { name: 'Attributes', value: 'connectorAttributes' },
    { name: 'Attribute Mapping', value: 'attributeMapping' },
  ],
  flowSections: [{ name: 'General', value: 'general' }],

  properties: {
    authType: {
      value: 'customAuth',
    },
    showPoweredBy: {
      preferredControlType: 'toggleSwitch',
      value: false,
    },
    skipButtonPress: {
      preferredControlType: 'toggleSwitch',
      value: false,
    },
    customAuth: {
      properties: {
        providerName: {
          displayName: 'Provider Name',
          preferredControlType: 'textField',
          required: true,
        },
        authTypeDropdown: {
          displayName: 'Auth Type',
          preferredControlType: 'dropDown',
          required: true,
          options: [
            {
              name: 'Oauth2',
              value: 'oauth2',
            },
            {
              name: 'OpenId',
              value: 'openId',
            },
          ],
          enum: ['oauth2', 'openId'],
        },
        issuerUrl: {
          preferredControlType: 'textField',
          displayName: 'Issuer URL',
          info: 'Required if auth type is OpenID',
        },
        skRedirectUri: {
          displayName: 'Redirect URL',
          preferredControlType: 'textField',
          disabled: true,
          initializeValue: 'SINGULARKEY_REDIRECT_URI',
          copyToClip: true,
        },
        clientId: {
          displayName: 'App ID',
          preferredControlType: 'textField',
          required: true,
        },
        clientSecret: {
          displayName: 'Client Secret',
          preferredControlType: 'textField',
          hashedVisibility: true,
          required: true,
        },
        scope: {
          displayName: 'Scope',
          preferredControlType: 'textField',
          required: true,
        },
        code: {
          displayName: 'User Info Post Process',
          info: 'This code will run to simplify the response from the connector while logging in.',
          preferredControlType: 'codeEditor',
          language: 'javascript',
          // value: "// Write your code here\n// Supported language: Javascript \nmodule.exports = a = async ({params}) => {\n\tconsole.log('params: ', params)\n\treturn {'testVariable': params.testVariable}\n}",
        },
        grant: {
          displayName: 'Grant Type',
          preferredControlType: 'textField',
          value: 'authorizationCode',
          enableParameters: true,
        },
        authorizationEndpoint: {
          displayName: 'Authorization Endpoint',
          preferredControlType: 'textField',
          required: true,
        },
        authorizationParams: { value: ['clientId', 'redirect_uri'] },
        tokenEndpoint: {
          displayName: 'Token Endpoint',
          preferredControlType: 'textField',
          required: true,
        },
        tokenParams: {
          value: [
            'clientId',
            'redirect_uri',
            'client_secret',
            'code',
            'grant_type',
          ],
        },
        tokenMethod: { value: 'POST' },
        bearerToken: {
          preferredControlType: 'textField',
          type: 'boolean',
          displayName: 'Token Attachment',
          info: 'Optional field. Prepend token with this value. Example: Bearer or Token',
        },
        userInfoEndpoint: {
          displayName: 'User Info Endpoint',
          preferredControlType: 'textFieldArrayView',
          required: true,
        },
        customAttributes: {
          displayName: 'Connector Attributes',
          preferredControlType: 'tableViewAttributes',
          info: 'These attributes will be available in User Connector Attribute Mapping.',
          sections: ['connectorAttributes'],
          value: [
            {
              name: 'id',
              description: 'ID',
              type: 'string',
              value: null,
              minLength: '1',
              maxLength: '300',
              required: true,
              attributeType: 'sk',
            },

            {
              name: 'name',
              description: 'Display Name',
              type: 'string',
              value: null,
              minLength: '1',
              maxLength: '250',
              required: false,
              attributeType: 'sk',
            },
            {
              name: 'email',
              description: 'Email',
              type: 'string',
              value: null,
              minLength: '1',
              maxLength: '250',
              required: false,
              attributeType: 'sk',
            },
          ],
        },
        userConnectorAttributeMapping: {
          preferredControlType: 'userConnectorAttributeMapping',
          newMappingAllowed: true,
          title1: null,
          title2: null,
          sections: ['attributeMapping'],
        },
        tokenAttributeMapping: {
          preferredControlType: 'mapping',
          newMappingAllowed: true,
          value: [
            {
              value1: 'accessToken',
              value2: 'data.access_token',
              deleteAllowed: false,
            },
            {
              value1: 'expiresIn',
              value2: 'data.expires_in',
              deleteAllowed: false,
            },
            {
              value1: 'idToken',
              value2: 'data.id_token',
              deleteAllowed: false,
            },
            {
              value1: 'refreshToken',
              value2: 'data.refresh_token',
              deleteAllowed: false,
            },
          ],
          title1: 'Token Properties',
          title2: 'UserPool Properties',
          placeholderAdd: 'Enter Attribute',
        },
        returnToUrl: {
          displayName: 'Application Return To URL',
          preferredControlType: 'textField',
          info: 'When using the embedded flow player widget and an IdP/Social Login connector, provide a callback URL to return back to the application.',
        },
        queryParams: {
          info: 'These values will be used for query parameters for Authorization URL.',
          displayName: 'Query Params',
          preferredControlType: 'keyValueList',
          hideLabel: true,
          required: false,
        },
      },
    },
    button: {
      displayName: 'Sign On',
      logo: '',
      showLogo: true,
      preferredControlType: 'button',
      css: {
        backgroundColor: '#1da060',
        color: '#ffffff',
      },
      onClick: { location: '{{authorizationUrl}}' },
    },
    screenTemplateName: {},
  },
  capabilities: {
    loginFirstFactor: {
      type: 'trigger',
      title: 'Sign On',
      globalOutputSchema: {
        userInfo: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            appId: {
              type: 'string',
            },
            connectionId: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            phoneNumber: {
              type: 'string',
            },
            createdDate: {
              type: 'number',
            },
            mfaEnabled: {
              type: 'boolean',
            },
          },
        },
        skOpenId: {
          type: 'object',
          properties: {
            client_id: {
              type: 'string',
            },
            redirect_uri: {
              type: 'string',
            },
            response_type: {
              type: 'string',
            },
            scope: {
              type: 'string',
            },
          },
        },
        saml: {
          type: 'object',
          properties: {
            client_id: {
              type: 'string',
            },
            SAMLRequest: {
              type: 'string',
            },
            redirectUri: {
              type: 'string',
            },
            audience: {
              type: 'string',
            },
          },
        },
      },
      localOutputSchema: {
        oauth2: {
          type: 'object',
          properties: {
            accessToken: {
              type: 'string',
            },
            expiresIn: {
              type: 'string',
            },
          },
        },
      },
      respondToUser: true,
      userViews: [
        {
          screenTemplateName: 'LoginScreen1',
          items: [
            {
              propertyName: 'button',
              fields: {},
            },
            { propertyName: 'showPoweredBy' },
            { propertyName: 'skipButtonPress' },
          ],
        },
      ],
      flowConfigView: {
        items: [
          {
            propertyName: 'customAuth',
            items: [
              {
                propertyName: 'queryParams',
              },
            ],
          },
          {
            propertyName: 'button',
            fields: {},
          },
          {
            propertyName: 'showPoweredBy',
            fields: {},
          },
          { propertyName: 'skipButtonPress' },
        ],
      },
    },
  },
  accountConfigView: {
    componentViewSize: 'large',
    items: [
      {
        propertyName: 'customAuth',
        items: [
          {
            propertyName: 'providerName',
          },
          {
            propertyName: 'authTypeDropdown',
          },
          {
            propertyName: 'skRedirectUri',
          },
          {
            propertyName: 'issuerUrl',
          },
          {
            propertyName: 'authorizationEndpoint',
          },
          {
            propertyName: 'tokenEndpoint',
          },
          { propertyName: 'bearerToken' },
          {
            propertyName: 'userInfoEndpoint',
          },
          {
            propertyName: 'clientId',
          },
          {
            propertyName: 'clientSecret',
          },
          {
            propertyName: 'scope',
          },
          {
            propertyName: 'code',
          },
          {
            propertyName: 'userConnectorAttributeMapping',
          },
          {
            propertyName: 'customAttributes',
          },
          {
            propertyName: 'returnToUrl',
          },
        ],
      },
    ],
  },
};

module.exports = connectorOIDCQueryParams;
