"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ApplicationPreview from "@/components/ApplicationPreview";

export default function ApplyPage() {
  const params = useParams();
  const jobId = params?.jobId;


  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    position: "",
    experience: "",
    skills: "",
    coverLetter: "",
  });


  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Add your API call or submission logic here
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content");
    if (!element) {
      alert("Preview not found!");
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;

    await html2pdf()
      .set({
        margin: 0.3,
        filename: "application.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  };
  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);
  const [photoName, setPhotoName] = useState("");
  const [passportName, setPassportName] = useState("");
  const [certificateNames, setCertificateNames] = useState<string[]>([]);

  const totalSteps = 4;
  const handleNext = () => setStep((s) => s + 1);
  const handlePrevious = () => setStep((s) => s - 1);

  return (
    <div className="pt-20">

      {/* HERO */}
      <section className="bg-linear-to-br from-[#1C346F] to-[#1C346F]/90 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">
          Apply for Job #{jobId}
        </h1>
      </section>

      {/* CONTENT */}
      <section className="py-10 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* FORM */}
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white p-6 rounded shadow">

                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-[#19316C]">Personal Info</h2>

                    <Input name="firstName" className="text-[#7E86B5]" placeholder="First Name"
                      value={formData.firstName} onChange={handleChange} />

                    <Input name="lastName" className="text-[#7E86B5] mt-3" placeholder="Last Name"
                      value={formData.lastName} onChange={handleChange} />

                    <Input name="email" className="text-[#7E86B5] mt-3" placeholder="Email"
                      value={formData.email} onChange={handleChange} />

                    <Input name="phone" className="text-[#7E86B5] mt-3" placeholder="Phone"
                      value={formData.phone} onChange={handleChange} />

                    <Input name="country" className="text-[#7E86B5] mt-3" placeholder="Country"
                      value={formData.country} onChange={handleChange} />

                    <Input name="city" className="text-[#7E86B5] mt-3" placeholder="City"
                      value={formData.city} onChange={handleChange} />
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-[#19316C]">Professional Info</h2>

                    <Input name="position" className="text-[#7E86B5] mt-3" placeholder="Position"
                      value={formData.position} onChange={handleChange} />

                    <Input name="experience" className="text-[#7E86B5] mt-3" placeholder="Experience (years)"
                      value={formData.experience} onChange={handleChange} />

                    <Textarea name="skills" className="text-[#7E86B5] mt-3" placeholder="Skills"
                      value={formData.skills} onChange={handleChange} />

                    <Textarea name="coverLetter" className="text-[#7E86B5] mt-3" placeholder="Cover Letter"
                      value={formData.coverLetter} onChange={handleChange} />
                  </>
                )}


                {/* Step 4: Preview */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold  text-center" style={{ color: "#19316C" }}>

                      Application Preview
                    </h2>

                    <div
                      id="pdf-content"
                      ref={previewRef}
                      className="bg-white border p-8 max-w-3xl mx-auto relative"
                      style={{ backgroundColor: "#ffffff" }} // important fix
                    >
                      {/* HEADER */}
                      <div className="text-center mb-6">
                        <h1 className="text-lg font-bold " style={{ color: "#19316C" }}>
                          Gulf Empire Company Pvt. Ltd.
                        </h1>
                        <p className="text-xs" style={{ color: "#7E86B5" }}>Kathmandu, Nepal</p>
                        <h2 className="font-semibold underline mt-2" style={{ color: "#19316C" }}>
                          APPLICATION FOR EMPLOYMENT
                        </h2>
                      </div>

                      {/* PHOTO */}
                      {photoPreview && (
                        <img
                          src={photoPreview}
                          alt="photo"
                          className="absolute top-8 right-8 w-28 h-32 border object-cover"
                        />
                      )}

                      {/* FORM BODY */}
                      <div className="text-sm space-y-2">
                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Full Name:</span>
                          <span className="border-b  w-full" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Email:</span>
                          <span className="border-b  w-full" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.email}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Phone:</span>
                          <span className="border-b  w-full" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.phone}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Address:</span>
                          <span className="border-b  w-full" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.city}, {formData.country}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Position:</span>
                          <span className="border-b  w-full capitalize" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.position}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="w-1/3 font-semibold" style={{ color: "#19316C" }}>Experience:</span>
                          <span className="border-b  w-full" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.experience} years
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold" style={{ color: "#19316C" }}>Skills:</p>
                          <div className="border p-2 min-h-[60px]" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.skills}
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold" style={{ color: "#19316C" }}>Cover Letter:</p>
                          <div className="border p-2 min-h-[80px]" style={{ borderColor: "#7E86B5", color: "#7E86B5" }}>
                            {formData.coverLetter || "N/A"}
                          </div>
                        </div>
                      </div>

                      {/* SIGNATURE */}
                      <div className="mt-8 flex justify-between text-sm">
                        <div>
                          <p className="border-t w-40 text-center" style={{ color: "#7E86B5" }}>Applicant Signature</p>
                        </div>
                        <div>
                          <p className="border-t w-40 text-center" style={{ color: "#7E86B5" }}>Date</p>
                        </div>
                      </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-4">
                      <Button onClick={handleDownloadPDF} variant="outline">
                        Download PDF
                      </Button>

                      <Button
                        onClick={handleSubmit}
                        className="bg-[#CAAD37] text-white"
                      >
                        Final Submit
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents & Submit */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#19316C] mb-2">
                        Upload Documents
                      </h2>
                      <p className="text-[#7E86B5]">
                        Please upload required documents
                      </p>
                    </div>

                    {/* PHOTO UPLOAD */}
                    <div>
                      <Label htmlFor="photo" className="text-[#7E86B5]">Passport Size Photo *</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="photo"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary"
                        >
                          {photoName ? (
                            <>
                              <FileText className="w-10 h-10 text-[#19316C] mb-2" />
                              <p className="text-sm font-semibold">{photoName}</p>
                              <p className="text-xs text-[#7E86B5]">Click to change</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-[#7E86B5] mb-2" />
                              <p className="text-sm text-[#7E86B5]">Upload Photo</p>
                            </>
                          )}
                          <input
                            id="photo"
                            type="file"
                            className="hidden text-[#7E86B5]"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setPhotoName(file.name);

                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setPhotoPreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            required
                          />
                        </label>
                      </div>
                    </div>

                    {/* PASSPORT */}
                    <div>
                      <Label htmlFor="passport" className="text-[#7E86B5]">Passport *</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="passport"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary"
                        >
                          {passportName ? (
                            <>
                              <FileText className="w-10 h-10 text-[#19316C] mb-2" />
                              <p className="text-sm font-semibold">{passportName}</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-[#7E86B5] mb-2" />
                              <p className="text-sm text-[#7E86B5]">Upload Passport</p>
                            </>
                          )}
                          <input
                            id="passport"
                            type="file"
                            className="hidden text-[#7E86B5]"
                            onChange={(e) =>
                              setPassportName(e.target.files?.[0]?.name || "")
                            }
                            required
                          />
                        </label>
                      </div>
                    </div>

                    {/* CERTIFICATES */}
                    <div>
                      <Label htmlFor="certificates" className="text-[#7E86B5]">
                        Certificates *
                      </Label>
                      <div className="mt-2">
                        <label
                          htmlFor="certificates"
                          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary"
                        >
                          {certificateNames.length > 0 ? (
                            <>
                              <FileText className="w-10 h-10 text-[#19316C] mb-2" />
                              <p className="text-sm font-semibold">
                                {certificateNames.length} files selected
                              </p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-10 h-10 text-[#7E86B5] mb-2" />
                              <p className="text-sm text-[#7E86B5]">Upload Certificates</p>
                            </>
                          )}
                          <input
                            id="certificates"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) =>
                              setCertificateNames(
                                Array.from(e.target.files || []).map((f) => f.name)
                              )
                            }
                            required
                          />
                        </label>
                      </div>
                    </div>

                    {/* OPTIONAL CV */}
                    <div>
                      <Label htmlFor="cv" className="text-[#7E86B5]">CV (Optional)</Label>
                      <input
                        id="cv"
                        type="file"
                        className="mt-2 text-[#7E86B5]"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name || "")
                        }
                      />
                    </div>

                    {/* SUMMARY */}
                    <div className="bg-[#F3F4F6] p-6 rounded-lg">
                      <h3 className="font-semibold mb-4 text-[#19316C]">Application Summary</h3>
                      <p className="text-sm text-[#7E86B5]">
                        {formData.firstName} {formData.lastName} applying for{" "}
                        {formData.position}
                      </p>
                    </div>
                  </div>
                )}

                {/* NAVIGATION */}
                {/* <div className="flex justify-between mt-6">
                  {step > 1 && (
                    <Button onClick={prev} className="bg-gray-300 text-gray-700 hover:bg-gray-400">
                      Previous
                    </Button>
                  )}

                  {step < 3 && (
                    <Button onClick={next} className="bg-blue-500 text-white hover:bg-blue-600">
                      Next
                    </Button>
                  )}
                </div> */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={step === 1}
                    className=""
                  >
                    Previous
                  </Button>

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#19316C] hover:bg-[#19316C]/90"
                    >
                      {step === 3 ? "Preview" : "Next"}
                    </Button>
                  ) : null}
                </div>

              </div>
            </motion.div>

            {/* LIVE PREVIEW */}
            <div className="bg-gray-100 p-4 rounded shadow overflow-auto max-h-[800px]">
              <ApplicationPreview data={formData} />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}