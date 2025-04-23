'use client';

import * as React from 'react';
import { useIsRecording } from '@livekit/components-react';
import styles from '../styles/RecordingIndicator.module.css';

export function RecordingIndicator() {
  // Check if recording feature is enabled
  const recordingEndpoint = process.env.NEXT_PUBLIC_LK_RECORD_ENDPOINT;
  const isRecording = useIsRecording();
  const [showIndicator, setShowIndicator] = React.useState(false);
  const [wasRecording, setWasRecording] = React.useState(isRecording);

  React.useEffect(() => {
    if (isRecording !== wasRecording) {
      setWasRecording(isRecording);
      if (isRecording) {
        setShowIndicator(true);
      } else {
        // delay hiding the indicator to show the "stopped" state
        setTimeout(() => {
          setShowIndicator(false);
        }, 2000);
      }
    }
  }, [isRecording, wasRecording]);
  
  // If recording is disabled, don't render anything
  if (!recordingEndpoint) {
    return null;
  }

  return showIndicator ? (
    <div className={styles.recordingIndicator}>
      <div className={`${styles.dot} ${isRecording ? styles.live : styles.stopped}`} />
      <span className={styles.text}>
        {isRecording ? 'Recording' : 'Recording stopped'}
      </span>
    </div>
  ) : null;
}
