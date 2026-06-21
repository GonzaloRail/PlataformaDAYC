import { useState, useRef, useCallback } from 'react';

export function useMediaRecorder(type: 'audio' | 'video') {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video' ? { facingMode: 'user' } : false,
      });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(`Error starting ${type} recording:`, err);
    }
  }, [type]);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state === 'inactive') {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        // Stop tracks
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });
  }, [type]);

  return { isRecording, startRecording, stopRecording };
}
