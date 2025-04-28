// External imports
import React, { useState } from 'react';
import axios from 'axios';

// Internal imports
import Button from '../ui/Button';

// Types
interface FileDownloadProps {
  fileId: string | null;
}

interface FileResponse {
  fileName: string;
  contentType: string;
  data: string; // Base64 encoded file data
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileId }) => {
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleDownload = async () => {
    if (!fileId) {
      setError('File ID is missing.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<FileResponse>(
        `https://ecomer-6wex.onrender.com/proudect/files/${fileId}`
      );

      const { fileName, contentType, data: base64File } = response.data;

      // Create and trigger download
      const link = document.createElement('a');
      link.href = `data:${contentType};base64,${base64File}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading file:', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div>
      <Button
        className="bg-button-color hover:bg-button-hover-color text-main-color-background"
        onClick={handleDownload}
        disabled={loading || !fileId}
      >
        {loading ? 'Downloading...' : 'Download File'}
      </Button>
      
      {error && (
        <div className="mt-2 text-red-500">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default FileDownload;