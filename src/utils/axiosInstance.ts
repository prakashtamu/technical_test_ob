import Env from "@/utils/env";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: Env.LLM_AGENT_URL,
  timeout: 1000,
});

export default axiosInstance;
