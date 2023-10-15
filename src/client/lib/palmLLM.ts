import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

const API_KEY = 'AIzaSyCBR4pUuPAd4-S-_TkREV6bwKR0taVzaUY';

export const palmClient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
