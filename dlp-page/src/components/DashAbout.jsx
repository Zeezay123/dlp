import React, { useState, useEffect } from "react";
import { Button, TextInput, Label, Alert, Select, FileInput } from "flowbite-react";
import axios from "axios";
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const SECTIONS = [
  "about",
  "homepage",
  "howtoapplyone",
  "howtoapplytwo",
  "howtoapplythree",
  "programmes",
  "blog",
  "calltoaction",
];

const SECTION_FIELDS = {
  about: [
    "title",
    "subtitle",
    "intro",
    "mission",
    "vision",
    "philosophy",
    "vcMessage",
    "directorMessage",
  ],
  homepage: ["title", "subtitle", "intro"],
  howtoapplyone: ["title", "subtitle"],
  howtoapplytwo: ["title", "subtitle"],
  howtoapplythree: ["title", "subtitle"],
  programmes: ["title", "subtitle", "introTitle", "introSubtitle"],
  blog: ["title", "subtitle","introsubtitle","introsubtitle"],
  calltoaction: ["title", "subtitle"],
};

export default function SiteSettingsAdmin() {
  const [selectedSection, setSelectedSection] = useState("about");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Separate states for each file and upload progress
  const [vcImageFile, setVcImageFile] = useState(null);
  const [vcUploadProgress, setVcUploadProgress] = useState(0);
  const [directorImageFile, setDirectorImageFile] = useState(null);
  const [directorUploadProgress, setDirectorUploadProgress] = useState(0);

  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    setSuccess("");
    fetch(`/api/settings/${selectedSection}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch section data");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        setError(err.message);
        setFormData({});
      })
      .finally(() => setLoading(false));
  }, [selectedSection]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle file selection for VC Image
  function handleVcImageChange(e) {
    const file = e.target.files[0];
    setVcImageFile(file);
  }

  // Handle file selection for Director Image
  function handleDirectorImageChange(e) {
    const file = e.target.files[0];
    setDirectorImageFile(file);
  }

  // Upload helper, accepts file and upload progress setter, returns URL
  const uploadImage = async (file, setProgress) => {
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    try {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "codelWebImagesPreset");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        imageData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setUploadError(null);
      setProgress(0); // reset after upload

   console.log(formData)

      return res.data.secure_url;
    } catch (error) {
      console.error(error.message);
      setUploadError("Error uploading image");
      setProgress(0);
      return null;
    }
  };

  // Upload and update URL in formData for VC Image
  const handleUploadVcImage = async () => {
    if (!vcImageFile) return;
    const url = await uploadImage(vcImageFile, setVcUploadProgress);
    if (url) setFormData((prev) => ({ ...prev, vcimage: url }));
  };

  // Upload and update URL in formData for Director Image
  const handleUploadDirectorImage = async () => {
    if (!directorImageFile) return;
    const url = await uploadImage(directorImageFile, setDirectorUploadProgress);
    if (url) setFormData((prev) => ({ ...prev, directorimage: url }));
  };

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");

      const payload = {};
      Object.entries(formData).forEach(([key, value]) => {
        // If value is a File object, skip — images should be URLs after upload
        if (value instanceof File) return;
        payload[key] = value;
      });

      const res = await fetch(`/api/settings/${selectedSection}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save");
      }

      setSuccess("Section updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Site Settings Admin</h1>

      <div className="mb-6 max-w-xs">
        <Label htmlFor="section-select" className="mb-2">
          Select Section
        </Label>
        <Select
          id="section-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {SECTIONS.map((section) => (
            <option key={section} value={section}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <p>Loading section data...</p>
      ) : error ? (
        <Alert color="failure" onDismiss={() => setError("")}>
          {error}
        </Alert>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          {SECTION_FIELDS[selectedSection]?.map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="mb-1 capitalize">
                {field}
              </Label>
              <TextInput
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {selectedSection === "about" && (
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="flex flex-col gap-3 w-full max-w-md">
                <Label className="mb-1">VC Image</Label>
                <FileInput
                  id="vcImage"
                  name="vcImage"
                  accept="image/*"
                  onChange={handleVcImageChange}
                />
                <Button
                  type="button"
                  size="sm"
                  outline
                  onClick={handleUploadVcImage}
                  disabled={vcUploadProgress}
                >
                  { vcUploadProgress ? <div className='w-16 h-16'> 
                 
               <CircularProgressbar value={vcUploadProgress} text={`${vcUploadProgress || 0 }%`}/>
                 
                               </div>:
                               'Upload image'
                             }
                 
                </Button>
              </div>

              <div className="flex flex-col gap-3 w-full max-w-md">
                <Label className="mb-1">Director Image</Label>
                <FileInput
                  id="directorImage"
                  name="directorImage"
                  accept="image/*"
                  onChange={handleDirectorImageChange}
                />
                <Button
                  type="button"
                  size="sm"
                  outline
                  onClick={handleUploadDirectorImage}
                  disabled={directorUploadProgress}
                >
                  { directorUploadProgress ? <div className='w-16 h-16'> 
                 
               <CircularProgressbar value={directorUploadProgress} text={`${directorUploadProgress || 0 }%`}/>
                 
                               </div>:
                               'Upload image'
                             }
                 
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      )}

      {success && (
        <Alert color="success" className="mt-4" onDismiss={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {uploadError && (
        <Alert color="failure" className="mt-4" onDismiss={() => setUploadError(null)}>
          {uploadError}
        </Alert>
      )}
    </div>
  );
}
