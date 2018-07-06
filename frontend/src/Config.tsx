const API_HOST = (window as any).RUNTIME_API_HOST ? (window as any).RUNTIME_API_HOST : 'http://localhost:3005';
const MEDIA_HOST = (window as any).RUNTIME_MEDIA_HOST ? (window as any).RUNTIME_MEDIA_HOST : 'http://localhost:8081';
export { API_HOST, MEDIA_HOST };
