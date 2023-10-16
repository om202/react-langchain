import toast from "react-hot-toast";

const copyText = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

export { copyText };
