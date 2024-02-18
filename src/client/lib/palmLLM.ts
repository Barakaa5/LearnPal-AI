import { TextServiceClient } from '@google-ai/generativelanguage';
import { GoogleAuth } from 'google-auth-library';

const API_KEY = process.env.PALM_API_KEY || '';

export const palmClient = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
