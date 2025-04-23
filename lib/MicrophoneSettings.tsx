'use client';
import * as React from 'react';
import { MediaDeviceMenu, TrackToggle, useLocalParticipantPermissions } from '@livekit/components-react';
import { Track } from 'livekit-client';

export function MicrophoneSettings() {
  const permissions = useLocalParticipantPermissions();
  
  return (
    <div className="microphone-settings">
      <div className="lk-button-group">
        <TrackToggle
          source={Track.Source.Microphone}
          showIcon={false}
        >
          {permissions?.canPublish ? 'Enable Microphone' : 'Microphone Disabled'}
        </TrackToggle>
      </div>
      <div className="lk-button-group">
        <span className="lk-button">Microphone</span>
        <div className="lk-button-group-menu">
          <MediaDeviceMenu kind="audioinput"></MediaDeviceMenu>
        </div>
      </div>
    </div>
  );
}
