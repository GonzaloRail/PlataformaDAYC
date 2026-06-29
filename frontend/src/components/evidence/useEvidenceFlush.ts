import { useCallback, useEffect, useRef } from 'react';
import { useMinigameEvidence } from './MinigameEvidenceProvider';

export function useEvidenceFlush(deps: ReadonlyArray<unknown> = []) {
  const evidence = useMinigameEvidence();
  const flushRef = useRef(evidence.flushMedia);
  flushRef.current = evidence.flushMedia;

  const flush = useCallback(async () => {
    await flushRef.current();
  }, []);

  useEffect(() => {
    // expose a no-op when component unmounts; the actual flush already happened
  }, deps);

  return flush;
}
