import { useState } from "react";
import { Upload, AlertCircle, Paperclip } from "lucide-react";

const TicketForm = () => {
  const [ticketData, setTicketData] = useState({
    category: "",
    subject: "",
    description: "",
    priority: "medium",
    attachments: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    {
      value: "trading",
      label: "Trading Issues",
      description: "Problems with trades, orders, or market operations",
    },
    {
      value: "account",
      label: "Account Problems",
      description: "Login, verification, or account settings issues",
    },
    {
      value: "technical",
      label: "Technical Support",
      description: "Platform bugs, performance issues, or errors",
    },
    {
      value: "payment",
      label: "Payment/Withdrawal",
      description: "Deposit, withdrawal, or payment-related problems",
    },
    {
      value: "security",
      label: "Security Concerns",
      description:
        "Account security, suspicious activity, or authentication issues",
    },
    {
      value: "other",
      label: "Other",
      description: "Any other issues not covered above",
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });

    setTicketData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(ticketData);

    if (Object.keys(newErrors).length === 0) {
      // Handle submission
      console.log("Ticket submitted:", ticketData);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.category) errors.category = "Please select a category";
    if (!data.subject) errors.subject = "Subject is required";
    if (!data.description || data.description.length < 20) {
      errors.description =
        "Please provide a detailed description (minimum 20 characters)";
    }
    return errors;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-base-200 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-2">Before Creating a Ticket</h3>
        <ul className="list-disc list-inside space-y-2 text-base-content/70">
          <li>Check our Knowledge Base for instant solutions</li>
          <li>Ensure all information is accurate and detailed</li>
          <li>Include relevant screenshots or documents</li>
          <li>Specify steps to reproduce the issue</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Category</span>
          </label>
          <select
            className={`select select-bordered w-full ${
              errors.category ? "select-error" : ""
            }`}
            value={ticketData.category}
            onChange={(e) =>
              setTicketData({ ...ticketData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {ticketData.category && (
            <label className="label">
              <span className="label-text-alt text-base-content/70">
                {
                  categories.find((cat) => cat.value === ticketData.category)
                    ?.description
                }
              </span>
            </label>
          )}
          {errors.category && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.category}
              </span>
            </label>
          )}
        </div>

        {/* Subject */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Subject</span>
          </label>
          <input
            type="text"
            className={`input input-bordered ${
              errors.subject ? "input-error" : ""
            }`}
            value={ticketData.subject}
            onChange={(e) =>
              setTicketData({ ...ticketData, subject: e.target.value })
            }
            placeholder="Brief description of your issue"
          />
          {errors.subject && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.subject}
              </span>
            </label>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            className={`textarea textarea-bordered h-32 ${
              errors.description ? "textarea-error" : ""
            }`}
            value={ticketData.description}
            onChange={(e) =>
              setTicketData({ ...ticketData, description: e.target.value })
            }
            placeholder="Please provide detailed information about your issue..."
          ></textarea>
          <label className="label">
            <span className="label-text-alt">
              {ticketData.description.length} characters (minimum 20)
            </span>
          </label>
          {errors.description && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.description}
              </span>
            </label>
          )}
        </div>

        {/* Priority */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Priority</span>
          </label>
          <div className="flex gap-4">
            {["low", "medium", "high"].map((priority) => (
              <label
                key={priority}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  className="radio"
                  checked={ticketData.priority === priority}
                  onChange={() => setTicketData({ ...ticketData, priority })}
                />
                <span className="capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>

        {/* File Upload Area */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Attachments</span>
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? "border-primary bg-primary/5" : "border-base-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Paperclip className="w-8 h-8 mx-auto mb-2 text-base-content/50" />
            <p className="text-base-content/70 mb-2">
              Drag and drop files here, or
              <label className="link link-primary mx-1 cursor-pointer">
                browse
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(e) => handleFiles(Array.from(e.target.files))}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              </label>
            </p>
            <p className="text-xs text-base-content/50">
              Maximum file size: 5MB. Supported formats: JPG, PNG, PDF
            </p>
          </div>

          {/* Attached Files List */}
          {ticketData.attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {ticketData.attachments.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Paperclip className="w-4 h-4" />
                  <span>{file.name}</span>
                  <span className="text-base-content/50">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs"
                    onClick={() => {
                      setTicketData((prev) => ({
                        ...prev,
                        attachments: prev.attachments.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-8">
          <button type="submit" className="btn btn-primary">
            <Upload className="w-5 h-5 mr-2" />
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm