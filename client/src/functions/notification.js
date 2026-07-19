import { toast } from "react-toastify";

export default function notification({success, message}) {
const type = success? 'success': 'error'
  return  toast[type](message)
}