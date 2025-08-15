import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
  about: {
    title: { type: String, default: "About Us" },
    subtitle: { type: String, default: "Who we are" },
    intro: { type: String, default: "Welcome to our company..." },
    mission: { type: String, default: "Our mission is ..." },
    vision: { type: String, default: "Our vision is ..." },
    philosophy: { type: String, default: "Our philosophy is ..." },
    vcMessage: { type: String, default: "Message from VC..." },
    directorMessage: { type: String, default: "Message from Director..." },
    vcimage: { type: String, default: '' }, 
    directorimage: { type: String, default: '' }, 
  },

  homepage: {
    title: { type: String, default: "Welcome to Our Site" },
    subtitle: { type: String, default: "Your success starts here" },
    intro: { type: String, default: "Homepage intro text here..." },
  },

  howtoapplyone: {
    title: { type: String, default: "Step One" },
    subtitle: { type: String, default: "Register your account" },
  },

  howtoapplytwo: {
    title: { type: String, default: "Step Two" },
    subtitle: { type: String, default: "Submit your documents" },
  },

  howtoapplythree: {
    title: { type: String, default: "Step Three" },
    subtitle: { type: String, default: "Wait for approval" },
  },

  programmes: {
    title: { type: String, default: "Our Programmes" },
    subtitle: { type: String, default: "Explore opportunities" },
    introtitle: { type: String, default: "Programme Highlights" },
    introsubtitle: { type: String, default: "Learn more about our courses" },
  },

  blog: {
    title: { type: String, default: "Latest News" },
    subtitle: { type: String, default: "Stay updated" },
    introtitle: { type: String, default: "Latest News" },
    introsubtitle: { type: String, default: "Stay updated" },
  },

  calltoaction: {
    title: { type: String, default: "Get Started Now" },
    subtitle: { type: String, default: "Join us today!" },
  },
}, { timestamps: true });

const SiteSettings = mongoose.model("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
