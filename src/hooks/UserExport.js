import { useState, useCallback } from 'react';
import Axios from '../api/Axios'; // Asumiendo que Axios está configurado para tu API

export const useExport = () => {
  const [loading, setLoading] = useState(false);

  const exportPDF = useCallback(async restaurantId => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/api/restaurants/${restaurantId}/menu_pdf/`,
        {
          responseType: 'blob', // Importante para descargar archivos
        }
      );

      // Crear una URL para el blob y descargarlo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'menu.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const exportQRCode = useCallback(async restaurantId => {
    setLoading(true);
    try {
      const response = await Axios.get(
        `/api/restaurants/${restaurantId}/menu_qr/`,
        {
          responseType: 'blob', // Importante para descargar archivos
        }
      );

      // Crear una URL para el blob y descargarlo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'menu_qr.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting QR code:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    exportPDF,
    exportQRCode,
    loading,
  };
};

export default useExport;
