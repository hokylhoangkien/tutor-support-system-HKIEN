/* eslint n/no-process-exit: "off" */
import { Faculty } from "../models/faculty.model.js";
import { Major } from "../models/major.model.js";
import { Tutor } from "../models/tutor.model.js";
import { Subject } from "../models/subject.model.js";

import seedTutors from "./data/tutor.json" with { type: "json" };
import { logger } from "@shared/utils/logger";

export const seed = async () => {
  try {
    await Tutor.deleteMany();

    for (const tutor of seedTutors) {
      const faculty = await Faculty.findOne({ abbreviation: tutor.faculty });
      if (!faculty) {
        logger.error("Not found faculty", tutor.faculty, tutor.userId);
      }
      const major = await Major.findOne({ abbreviation: tutor.major });
      if (!major) {
        logger.error("Not found major", tutor.major, tutor.userId);
      }
      let teachables = [];
      for (const sub of tutor.teachables) {
        const subject = await Subject.findOne({ code: sub.subject });
        if (!subject) {
          logger.error("Not found subject", sub.subject, tutor.userId);
        }
        teachables.push(subject._id);
      }
      await Tutor.create({
        ...tutor,
        faculty: faculty._id,
        major: major._id,
        teachables: teachables,
      });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
