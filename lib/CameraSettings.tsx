'use client';
import * as React from 'react';
import {
  MediaDeviceMenu,
  TrackToggle,
  useLocalParticipantPermissions,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

export function CameraSettings() {
  const permissions = useLocalParticipantPermissions();

  return (
    <div className="camera-settings">
      <div className="lk-button-group">
        <TrackToggle
          source={Track.Source.Camera}
          showIcon={false}
        >
          {permissions?.canPublish ? 'Enable Camera' : 'Camera Disabled'}
        </TrackToggle>
      </div>
      <div className="lk-button-group">
        <span className="lk-button">Camera</span>
        <div className="lk-button-group-menu">
          <MediaDeviceMenu kind="videoinput"></MediaDeviceMenu>
        </div>
      </div>
    </div>
  );
}
