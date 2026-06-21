import React, { useEffect, useRef } from 'react';
import { useMediaRecorder } from './MediaRecorders';
import { evidenceUploadQueue } from './EvidenceUploadQueue';

interface EvidenceRecorderProps {
  evaluacionId: string;
  itemId: string;
  tiposEvidencia: string[];
  sessionToken?: string;
}

export const EvidenceRecorder: React.FC<EvidenceRecorderProps> = ({ evaluacionId, itemId, tiposEvidencia, sessionToken }) => {
  const needsAudio = tiposEvidencia.includes('AUDIO');
  const needsVideo = tiposEvidencia.includes('VIDEO');
  
  const audioRecorder = useMediaRecorder('audio');
  const videoRecorder = useMediaRecorder('video');

  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (needsVideo) {
      videoRecorder.startRecording();
    } else if (needsAudio) {
      audioRecorder.startRecording();
    }
    
    startTimeRef.current = Date.now();

    return () => {
      const durationMs = Date.now() - startTimeRef.current;
      
      if (needsVideo) {
        videoRecorder.stopRecording().then(blob => {
          if (blob) {
            evidenceUploadQueue.add({
              evaluacionId,
              itemId,
              type: 'VIDEO',
              file: blob,
              durationMs,
              sizeBytes: blob.size,
              sessionToken,
            });
          }
        });
      } else if (needsAudio) {
        audioRecorder.stopRecording().then(blob => {
          if (blob) {
            evidenceUploadQueue.add({
              evaluacionId,
              itemId,
              type: 'AUDIO',
              file: blob,
              durationMs,
              sizeBytes: blob.size,
              sessionToken,
            });
          }
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return null;
};
