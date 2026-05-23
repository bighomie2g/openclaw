import type { OpenClawConfig } from "../config/types.openclaw.js";
import { resolveGatewayTokenSecretRefValue } from "../gateway/auth-config-utils.js";
import type { ResolvedGatewayAuth } from "../gateway/auth.js";

export async function resolveDoctorGatewayTokenSecretRef(params: {
  cfg: OpenClawConfig;
  auth: ResolvedGatewayAuth;
  env?: NodeJS.ProcessEnv;
}): Promise<string | undefined> {
  try {
    return await resolveGatewayTokenSecretRefValue({
      cfg: params.cfg,
      env: params.env ?? process.env,
      mode: params.cfg.gateway?.auth?.mode,
      hasPasswordCandidate: Boolean(params.auth.password),
      hasTokenCandidate: Boolean(params.auth.token),
    });
  } catch {
    return undefined;
  }
}
