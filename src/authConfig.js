export const msalConfig = {
    auth: {
      clientId: '445be0ea-d63b-4073-baec-3b30ca11683d',
      authority: 'https://login.microsoftonline.com/f5f0150c-b73f-45ee-9baf-668315c9997b',
      redirectUri: 'https://testsample.adils.de/',
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  }
  
  export const apiRequest = {
    url: 'https://meinfunctionapp.azurewebsites.net/api/HttpTrigger1',
    scopes: ['api://445be0ea-d63b-4073-baec-3b30ca11683d'],
  }