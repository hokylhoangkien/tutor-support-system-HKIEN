import { natsWrapper } from "./wrapper.js";
import { logger } from "../utils/logger.js";
import { jetstreamConfig } from "../config/jetstream.js";

export const setupJetStream = async () => {
  try {
    const jsm = natsWrapper.jsm;
    const { name: STREAM_NAME, subjects: REQUIRED_SUBJECTS } = jetstreamConfig;

    // Ensure stream exists
    try {
      await jsm.streams.add({
        name: STREAM_NAME,
        subjects: REQUIRED_SUBJECTS,
        retention: 'limits',
        storage: 'file',
        max_msgs: -1,
        max_bytes: -1,
        discard: 'old',
        num_replicas: 1
      });
      logger.info(`[NATS] Created stream: ${STREAM_NAME}`);
    } catch (error) {
      if (error.message.includes('already in use')) {
        logger.info(`[NATS] Stream exists: ${STREAM_NAME}`);
      } else {
        throw error;
      }
    }

    // Ensure stream exists and get its info
    const stream = await jsm.streams.info(STREAM_NAME);
    
    // Ensure all required subjects are included
    const existingSubjects = new Set(stream.config.subjects);
    const missingSubjects = REQUIRED_SUBJECTS.filter(s => !existingSubjects.has(s));
    
    if (missingSubjects.length > 0) {
      logger.info(`[NATS] Adding missing subjects to stream: ${missingSubjects.join(', ')}`);
      const updatedSubjects = [...new Set([...stream.config.subjects, ...REQUIRED_SUBJECTS])];
      await jsm.streams.update(STREAM_NAME, {
        ...stream.config,
        subjects: updatedSubjects
      });
    }

    return stream;
  } catch (error) {
    logger.error('[NATS] Error setting up JetStream:', error);
    throw error;
  }
};
