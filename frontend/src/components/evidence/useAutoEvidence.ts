import { useCallback, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useMinigameEvidence } from '@/components/evidence/MinigameEvidenceProvider';
import { canvasToBlob } from '@/utils/media';
import type { LabEvidenceRecord } from '@/components/evidence/EvidenceSink';
import type { EvidencePayload } from '@/components/evidence/EvidenceUploadQueue';

interface AutoEvidenceOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  activityId: string;
  isComplete: boolean;
  contextData?: Record<string, unknown>;
}

const SCREENSHOT_BG = '#fffdf7';

export function useAutoEvidence({
  containerRef,
  activityId,
  isComplete,
  contextData,
}: AutoEvidenceOptions) {
  const evidence = useMinigameEvidence();
  const triggeredRef = useRef(false);

  const captureScreenshot = useCallback(async (): Promise<Blob | null> => {
    if (!containerRef.current) return null;
    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: SCREENSHOT_BG,
        scale: 1,
      });
      return await canvasToBlob(canvas);
    } catch (err) {
      console.warn(`[${activityId}] html2canvas falló:`, err);
      evidence.recordLog({
        event: 'SCREENSHOT_CAPTURE_FAILED',
        activity: activityId,
        error: err instanceof Error ? err.message : String(err),
      });
      return null;
    }
  }, [containerRef, activityId, evidence]);

  useEffect(() => {
    triggeredRef.current = false;
  }, [activityId]);

  useEffect(() => {
    if (!isComplete || triggeredRef.current) return;
    if (!evidence.task) return;

    triggeredRef.current = true;

    const types = evidence.task.tipos_evidencia || [];
    const wantsScreenshot = types.includes('SCREENSHOT');
    const wantsMedia = types.some((t) => t === 'VIDEO' || t === 'AUDIO' || t === 'CAMERA_FRAME');

    const captureScreenshotPromise = wantsScreenshot
      ? (async () => {
          const blob = await captureScreenshot();
          if (blob) {
            await evidence.uploadBlob('SCREENSHOT', blob, {
              fileName: `${activityId}-screenshot.png`,
              metadata: {
                activity: activityId,
                evidence_role: 'auto_screenshot',
                ...(contextData || {}),
              },
            });
          } else {
            evidence.recordLog({
              event: 'SCREENSHOT_TOBLOB_NULL',
              activity: activityId,
              ...(contextData || {}),
            });
          }
        })()
      : Promise.resolve().then(() => {
          evidence.recordLog({
            event: 'AUTO_EVIDENCE_NO_SCREENSHOT',
            activity: activityId,
            requested_types: types,
            ...(contextData || {}),
          });
        });

    const flushPromise = wantsMedia
      ? (async () => {
          try {
            await evidence.flushMedia();
          } catch (err) {
            console.warn(`[${activityId}] flushMedia falló:`, err);
          }
        })()
      : Promise.resolve();

    void Promise.all([captureScreenshotPromise, flushPromise]);
  }, [isComplete, activityId, evidence, captureScreenshot, contextData]);
}

export type { EvidencePayload, LabEvidenceRecord };
