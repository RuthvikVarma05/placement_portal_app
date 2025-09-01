import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash2, Upload } from "lucide-react";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    summary: "",
    experience: [{ company: "", role: "", duration: "" }],
    education: [{ school: "", degree: "", year: "" }],
    skills: [""],
    projects: [{ title: "", description: "" }],
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e, index, field, section) => {
    const updated = [...form[section]];
    updated[index][field] = e.target.value;
    setForm({ ...form, [section]: updated });
  };

  const handleSkillChange = (e, index) => {
    const updated = [...form.skills];
    updated[index] = e.target.value;
    setForm({ ...form, skills: updated });
  };

  const addField = (section, newItem) => {
    setForm({ ...form, [section]: [...form[section], newItem] });
  };

  const removeField = (section, index) => {
    const updated = [...form[section]];
    updated.splice(index, 1);
    setForm({ ...form, [section]: updated });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setResume(file);
    } else {
      alert("Only PDF or DOCX files are allowed!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    console.log("Uploaded Resume:", resume);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <Card className="max-w-4xl mx-auto shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Resume Builder
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Resume */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Upload Existing Resume
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-indigo-500 transition cursor-pointer">
                <Upload className="h-10 w-10 mb-2 text-indigo-500" />
                <p>{resume ? resume.name : "Drag & drop or choose file"}</p>
                <Input
                  type="file"
                  className="hidden"
                  id="resumeUpload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="resumeUpload"
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* OR Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
              </div>
            </div>

            {/* Manual Resume Form Heading */}
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
              Fill Resume Details Manually
            </h2>

            {/* Name */}
            <div>
              <label className="block text-lg font-medium">Full Name</label>
              <Input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-lg font-medium">Phone</label>
              <div className="flex space-x-2">
                <Select
                  value={form.countryCode}
                  onValueChange={(val) => setForm({ ...form, countryCode: val })}
                >
                  <SelectTrigger className="w-28">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91 (India)</SelectItem>
                    <SelectItem value="+1">+1 (USA)</SelectItem>
                    <SelectItem value="+44">+44 (UK)</SelectItem>
                    <SelectItem value="+61">+61 (Australia)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="1234567890"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-lg font-medium">Professional Summary</label>
              <Textarea
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="Brief summary about yourself"
                rows={4}
              />
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              {form.experience.map((exp, index) => (
                <div key={index} className="space-y-2 mb-4 border p-4 rounded-lg">
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange(e, index, "company", "experience")
                    }
                  />
                  <Input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) =>
                      handleChange(e, index, "role", "experience")
                    }
                  />
                  <Input
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) =>
                      handleChange(e, index, "duration", "experience")
                    }
                  />
                  {form.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField("experience", index)}
                      className="mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  addField("experience", { company: "", role: "", duration: "" })
                }
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Experience
              </Button>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              {form.education.map((edu, index) => (
                <div key={index} className="space-y-2 mb-4 border p-4 rounded-lg">
                  <Input
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) =>
                      handleChange(e, index, "school", "education")
                    }
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleChange(e, index, "degree", "education")
                    }
                  />
                  <Input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) =>
                      handleChange(e, index, "year", "education")
                    }
                  />
                  {form.education.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField("education", index)}
                      className="mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  addField("education", { school: "", degree: "", year: "" })
                }
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Education
              </Button>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              {form.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(e, index)}
                  />
                  {form.skills.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField("skills", index)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addField("skills", "")}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Skill
              </Button>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {form.projects.map((proj, index) => (
                <div key={index} className="space-y-2 mb-4 border p-4 rounded-lg">
                  <Input
                    placeholder="Project Title"
                    value={proj.title}
                    onChange={(e) =>
                      handleChange(e, index, "title", "projects")
                    }
                  />
                  <Textarea
                    placeholder="Description"
                    value={proj.description}
                    onChange={(e) =>
                      handleChange(e, index, "description", "projects")
                    }
                    rows={3}
                  />
                  {form.projects.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeField("projects", index)}
                      className="mt-2 flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  addField("projects", { title: "", description: "" })
                }
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add Project
              </Button>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full py-3 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Submit Resume
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
