import { getCodeSandboxHost } from "@codesandbox/utils"

const API_PORT = 3001

const sandboxHost = getCodeSandboxHost(API_PORT)

export const API_URL = sandboxHost
  ? `https://${sandboxHost}`
  : `http://localhost:${API_PORT}`