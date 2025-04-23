'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RoomContext, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles';
import { Room, RoomEvent, RoomOptions } from 'livekit-client';

interface ConnectionDetails {
  serverUrl: string;
  participantToken: string;
}

interface WidgetRoomPageProps {
  params: {
    roomId: string;
  };
}

export default function WidgetRoomPage(props: WidgetRoomPageProps) {
  // Since this is a client component (marked with 'use client'), 
  // we don't need to use React.use() as params isn't a Promise in client components
  const { params } = props;
  const roomId = params.roomId;
  const router = useRouter();
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create room instance
  const roomOptions = useMemo((): RoomOptions => {
    return {
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
    };
  }, []);

  const room = useMemo(() => new Room(roomOptions), [roomOptions]);

  // Fetch connection details (both server URL and token) in a single API call
  useEffect(() => {
    async function fetchConnectionDetails() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get connection details from the API
        const url = new URL('/api/connection-details', window.location.origin);
        url.searchParams.append('roomName', roomId);
        url.searchParams.append('participantName', `widget-user-${Date.now()}`);
        
        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`Failed to fetch connection details: ${response.status} ${response.statusText}`);
        }
        
        const data: ConnectionDetails = await response.json();
        console.log("API response:", data);
        
        if (!data.serverUrl || !data.participantToken) {
          throw new Error('Missing server URL or token in response');
        }
        
        setConnectionDetails(data);
      } catch (error) {
        console.error('Failed to fetch connection details:', error);
        setError(error instanceof Error ? error.message : 'Failed to connect to video room');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchConnectionDetails();
  }, [roomId]);

  // Set up event listener for when user leaves the room
  useEffect(() => {
    const handleDisconnect = () => {
      console.log('User disconnected from room');
      router.push('/widget'); // Return to widget page when user leaves
    };

    // Listen for disconnect events
    room.on(RoomEvent.Disconnected, handleDisconnect);

    return () => {
      // Clean up event listener
      room.off(RoomEvent.Disconnected, handleDisconnect);
    };
  }, [room, router]);

  // Connect to room when connection details are available
  useEffect(() => {
    if (connectionDetails) {
      const { serverUrl, participantToken } = connectionDetails;
      
      console.log('Attempting to connect to room:', roomId);
      console.log('Server URL:', serverUrl);
      console.log('Token received:', !!participantToken);
      
      room.connect(serverUrl, participantToken)
        .then(() => {
          console.log('Connected to room successfully');
          room.localParticipant.enableCameraAndMicrophone()
            .catch(error => console.error('Failed to enable camera/mic:', error));
        })
        .catch(error => {
          console.error('Failed to connect to room:', error);
          setError('Failed to connect to the video room');
        });
    }

    return () => {
      room.disconnect().catch(console.error);
    };
  }, [room, connectionDetails, roomId]);

  // Send message to parent window to resize iframe
  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage({
        type: 'voicello-widget',
        action: 'resize',
        size: 'expanded'
      }, '*');
    }
  }, []);

  // Handle back button or close
  const handleClose = () => {
    room.disconnect().catch(console.error);
    router.push('/widget'); // Go back to widget page
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Connecting to video conference...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <p>Error: {error}</p>
        <button 
          onClick={() => router.push('/widget')}
          className="return-button"
        >
          Return to widget
        </button>
      </div>
    );
  }

  return (
    <div className="widget-room">
      <div className="widget-header">
        <button 
          className="close-button"
          onClick={handleClose}
          aria-label="Close video call"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div className="widget-conference">
        <RoomContext.Provider value={room}>
          <VideoConference />
        </RoomContext.Provider>
      </div>
      <style jsx>{`
        .widget-room {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        
        .widget-header {
          display: flex;
          justify-content: flex-end;
          padding: 8px;
          background-color: #f5f5f5;
          z-index: 10;
        }
        
        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          padding: 4px;
          border-radius: 50%;
        }
        
        .close-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .widget-conference {
          flex: 1;
          overflow: hidden;
          background-color: #1a1a1a;
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 14px;
          padding: 20px;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          margin-bottom: 16px;
          border: 3px solid rgba(0, 144, 255, 0.2);
          border-radius: 50%;
          border-top-color: #0090ff;
          animation: spin 1s ease-in-out infinite;
        }

        .error-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ff3b30;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }

        .return-button {
          margin-top: 16px;
          padding: 8px 16px;
          background-color: #0090ff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .return-button:hover {
          background-color: #007ad9;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 