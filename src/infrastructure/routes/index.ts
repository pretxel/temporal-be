import { FastifyInstance } from "fastify";
import HealthcheckRoute from "./HealthcheckRoute";
import VersionRoute from "./VersionRoute";
import AuthRoute from "./v1/AuthRoute";

interface Route {
    route: (fastify: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const routes: Route[] = [
    { route: HealthcheckRoute, prefix: "healthcheck" },
    { route: VersionRoute, prefix: "version" },
    { route: AuthRoute, prefix: "auth" }
];