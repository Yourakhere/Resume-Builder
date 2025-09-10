//export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://resume-builder-backendnew.vercel.app";
//export const BASE_URL = "https://resume-builder-backend-6zq0.onrender.com";
 ///
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  RESUME: {
    CREATE: "/api/resume",
    GET_ALL: "/api/resume",
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-image`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};

