/* eslint n/no-process-exit: "off" */
import { Faculty } from "../models/faculty.model.js";
import { Subject } from "../models/subject.model.js";

import seedSubjects from "./data/subject.json" with { type: "json" };
import { logger } from "@shared/utils/logger";

export const seed = async () => {
  try {
    await Subject.deleteMany();

    for (const subject of seedSubjects) {
      const faculty = await Faculty.findOne({ abbreviation: subject.faculty });
      if (!faculty) {
        logger.error("Not found faculty", subject.faculty);
      }
      await Subject.create({
        ...subject,
        faculty: faculty._id,
      });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
