import axios from "axios";

// Crear una instancia de Axios con configuración base
const Axios = axios.create({
  baseURL: "https://detip.pythonanywhere.com/", // URL base del backend
  headers: { "Content-Type": "application/json" }, // Tipo de contenido predeterminado
});

/**
 * Interceptor de solicitudes para agregar el token de autenticación al encabezado.
 *
 * Este interceptor se ejecuta antes de cada solicitud HTTP, añadiendo el token
 * de acceso almacenado en el localStorage al encabezado `Authorization`.
 */
Axios.interceptors.request.use(async (config) => {
  try {
    // Obtener tokens almacenados en el localStorage
    const token = window.localStorage.getItem("access");
    const newAccessToken = window.localStorage.getItem("newAcessToken");

    // Agregar el token al encabezado si está presente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Reemplazar con el nuevo token si está disponible
    if (newAccessToken) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    }

    return config;
  } catch (error) {
    console.error("Error en el interceptor de solicitudes:", error);
    throw error;
  }
});

export default Axios;
