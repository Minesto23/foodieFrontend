import { useState, useCallback } from "react";
import Axios from "../api/Axios"; // Configuración personalizada de Axios

/**
 * Hook personalizado para exportar menús en PDF o generar códigos QR.
 *
 * @returns {Object} - Funciones para exportar PDF, QR y el estado de carga.
 */
export const useExport = () => {
  const [loading, setLoading] = useState(false); // Estado de carga

  /**
   * Exporta el menú de un restaurante en formato PDF.
   *
   * @param {number} restaurantId - ID del restaurante.
   */
  const exportPDF = useCallback(async (restaurantId) => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/api/restaurants/${restaurantId}/menu_pdf/`,
        {
          responseType: "blob", // Necesario para manejar archivos binarios
        }
      );

      // Crear una URL para el blob y desencadenar la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "menu.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Exporta un código QR para el menú de un restaurante.
   *
   * @param {number} restaurantId - ID del restaurante.
   */
  const exportQRCode = useCallback(async (restaurantId) => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/api/restaurants/${restaurantId}/menu_qr/`,
        {
          responseType: "blob", // Necesario para manejar archivos binarios
        }
      );

      // Crear una URL para el blob y desencadenar la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "menu_qr.png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting QR code:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    exportPDF, // Función para exportar PDF
    exportQRCode, // Función para exportar QR code
    loading, // Estado de carga
  };
};

export default useExport;
