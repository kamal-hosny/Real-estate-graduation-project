import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/Button';

interface FileDownloadProps {
  fileId: string | null;
}

interface FileResponse {
  fileName: string;
  contentType: string;
  data: string; // Base64 encoded file data
}

const FileDownload: React.FC<FileDownloadProps> = ({ fileId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
  

  return (
    <div>
      <Button className='bg-button-color hover:bg-button-hover-color text-main-color-background' onClick={handleDownload} disabled={loading || !fileId}>
        {loading ? 'Downloading...' : 'Download File'}
      </Button>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default FileDownload;