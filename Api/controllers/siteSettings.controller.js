import SiteSettings from "../models/siteSettings.model.js";
import { errorHandler } from "../utils/error.js";

// Get all site settings
export const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// Get a specific section
export const getSection = async (req, res, next) => {
  try {
    const sectionName = req.params.section;
    const settings = await SiteSettings.findOne();

    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    console.log("Available sections:", Object.keys(settings.toObject()));

    if (!settings[sectionName]) {
      return res.status(404).json({ 
        message: "Section not found", 
        availableSections: Object.keys(settings.toObject())
      });
    }

    res.status(200).json(settings[sectionName]);
  } catch (error) {
    next(error);
  }
};

// Update entire settings (admin only)
export const updateSettings = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update settings"));
  }

  try {
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

// Update a specific section
export const updateSection = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update settings"));
  }

  try {
    const sectionName = req.params.section;
    const updateData = { [sectionName]: req.body };

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true }
    );

    res.status(200).json(settings[sectionName]);
  } catch (error) {
    next(error);
  }
};
